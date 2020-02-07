import { Resolvers } from '../../../types/resolvers';
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from '../../../types/graph';
import { sendVerificationSMS } from '../../../utils/sendSMS';
import Verification from '../../../entities/Verification';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;
      try {
        const findUser = await User.findOne({
          phoneNumber
        });
        if (findUser) {
          return {
            ok: true,
            error: 'ALREADY_EXIST'
          };
        }

        // 이미 존재하는 인증이있으면 찾아서 삭제함
        const existingVerification = await Verification.findOne({
          payload: phoneNumber
        });
        if (existingVerification) {
          existingVerification.remove();
        }
        // 새로운 인증 생성함
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: 'PHONE'
        }).save();
        console.log(newVerification);
        // 사용자에게 메세지 전송
        await sendVerificationSMS(newVerification.payload, newVerification.key);
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
