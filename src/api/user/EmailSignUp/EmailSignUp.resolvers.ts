import { Resolvers } from '../../../types/resolvers';
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import Verification from '../../../entities/Verification';
import sendVerificationEmail from '../../../utils/sendEmail';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email, phoneNumber } = args;
      try {
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
          return {
            ok: false,
            error: '이미 회원가입되어있습니다. 로그인하여 주세요',
            token: 'null'
          };
        }
        const phoneVerfication = await Verification.findOne({
          payload: phoneNumber,
          verified: true
        });
        if (phoneVerfication) {
          const newUser = await User.create({
            ...args,
            verifiedPhoneNumber: true
          }).save();
          if (newUser.email) {
            const emailVerification = await Verification.create({
              payload: newUser.email,
              target: 'EMAIL'
            }).save();
            // 인증메일을 보낸다

            sendVerificationEmail(
              newUser.email,
              newUser.fullName,
              emailVerification.key
            );
          }
          const token = createJWT(newUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
        return {
          ok: false,
          error: '아직 핸드폰 인증을 하지 않았습니다',
          token: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
