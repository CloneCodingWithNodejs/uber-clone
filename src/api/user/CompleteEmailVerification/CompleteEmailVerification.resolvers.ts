import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        context
      ): Promise<CompleteEmailVerificationResponse> => {
        const user: User = context.user;
        const { key } = args;
        if (user.email) {
          try {
            const verification = await Verification.findOne({
              key,
              payload: user.email
            });
            // 키와 이메일주소로 인증정보를 찾았는데 존재한다면
            // 유저의 이메일 인증을 유무를 참으로 바꾸고
            // 해당 인증의 인증 유무도 참으로 바꿈
            if (verification) {
              user.verifiedEmail = true;
              user.save();
              verification.verified = true;
              return {
                ok: true,
                error: null
              };
            }
            return {
              ok: false,
              error: '인증번호가 일치하지않습니다'
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: '이메일이 존재하지않습니다 '
          };
        }
      }
    )
  }
};

export default resolvers;
