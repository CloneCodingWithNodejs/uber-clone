import { Resolvers } from '../../../types/resolvers';
import {
  CompletePhoneVerificationResponse,
  CompletePhoneVerificationMutationArgs,
} from '../../../types/graph';
import Verification from '../../../entities/Verification';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs,
    ): Promise<CompletePhoneVerificationResponse> => {
      const { key, phoneNumber } = args;

      // 전화번호와 키로 유효한 인증인지 확인함
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });

        // 유효하지않다면 종료
        // 유효하다면 다음 try catch로 넘어감
        if (!verification) {
          return {
            ok: false,
            error: '인증번호가 유효하지 않습니다.',
            token: null,
          };
        }

        // 유효하다면 해당 인증은 true로 변경
        verification.verified = true;
        verification.save();
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }

      try {
        // 핸드폰번호로 유저를 찾음
        // 이미 존재하는 유저라면 핸드폰인증을 true로 바꾸고 종료
        const user = await User.findOne({ phoneNumber });
        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token,
          };
        }

        // 유저가 존재하지않는다면
        // 회원가입 정보 작성 페이지로 넘어감
        return {
          ok: true,
          error: null,
          token: null,
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
