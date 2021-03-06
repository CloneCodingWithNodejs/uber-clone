import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import cleanNull from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        context
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = context.req.user;

        // 빈값이 업데이트 되면 안되니까 빈값은 걸러냄
        const notNull: any = cleanNull(args);
        try {
          if (notNull.password !== null) {
            user.password = notNull.password;
            // user.update하면 @beforeInsert @beforeupdate가 실행이안됨 typeorm 버그같음
            user.save();
            // 삭제해주지않으면 밑에서 해싱되지않은 비밀번호가 다시 업데이트됨
            delete notNull.password;
          }
          await User.update({ id: user.id }, { ...notNull });
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
    )
  }
};

export default resolvers;
