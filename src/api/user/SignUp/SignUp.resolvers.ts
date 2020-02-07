import { Resolvers } from '../../../types/resolvers';
import { SignUpMutationArgs, SignUpResponse } from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import cleanNull from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    SignUp: async (_, args: SignUpMutationArgs): Promise<SignUpResponse> => {
      try {
        const findUser = await User.find({
          where: [{ email: args.email }, { phoneNumber: args.phoneNumber }]
        });

        if (findUser.length >= 1) {
          return {
            ok: false,
            error: '이미 가입된 회원입니다',
            token: null
          };
        }
        const notNull = cleanNull(args);
        const newUser = await User.create({ ...notNull }).save();
        const token = createJWT(newUser.id);
        return {
          ok: true,
          error: null,
          token
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
