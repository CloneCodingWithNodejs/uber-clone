import {
  EmailSignInMutationArgs,
  EmailSignInResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
// 이메일로 로그인
const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs,
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: 'No User Found with that email',
            token: null,
          };
        }
        // 비밀번호가 일치하는지 확인함
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token,
          };
        }
        return {
          ok: false,
          error: '패스워드가 틀렸습니다',
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
