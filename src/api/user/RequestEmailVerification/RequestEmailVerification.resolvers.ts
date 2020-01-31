import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import sendVerificationEmail from '../../../utils/sendEmail';
import { RequestEmailVerificationResponse } from '../../../types/graph';

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, context): Promise<RequestEmailVerificationResponse> => {
        // eslint-disable-next-line prefer-destructuring
        const user: User = context.user;
        if (user.email && !user.verifiedEmail) {
          const oldVerification = await Verification.findOne({
            payload: user.email
          });
          try {
            // 이전에 생성된 인증기록이있으면 전부 삭제함
            if (oldVerification) {
              oldVerification.remove();
            }
            const newVerfication = await Verification.create({
              payload: user.email,
              target: 'EMAIL'
            }).save();
            await sendVerificationEmail(
              user.email,
              user.fullName,
              newVerfication.key
            );

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
        return {
          ok: false,
          error: '이메일 주소가 없습니다'
        };
      }
    )
  }
};

export default resolvers;
