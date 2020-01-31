import { Resolvers } from '../../../types/resolvers';
import {
  FacebookConnectMutationArgs,
  FaceBookConnectResponse,
} from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs,
    ): Promise<FaceBookConnectResponse> => {
      const { fbId } = args;
      try {
        // 이미 페이스북 아이디가 있는지 확인
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          const token = createJWT(existingUser.id);
          return {
            ok: true,
            error: null,
            token,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }

      try {
        // 없다면 새로운 유저를 생성
        const newUser = await User.create({
          ...args, // args에 있는 변수들을 전부 사용함
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
        }).save();
        const token = createJWT(newUser.id);
        return {
          ok: true,
          error: null,
          token,
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
