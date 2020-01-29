import { Resolvers } from '../../../types/resolvers';
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse,
} from '../../../types/graph';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs,
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
          return {
            ok: false,
            error: '이미 회원가입되어있습니다. 로그인하여 주세요 ',
            token: 'null',
          };
        }
        const newUser = await User.create({ ...args }).save();
        return {
          ok: true,
          error: null,
          token: 'comming Soon',
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
