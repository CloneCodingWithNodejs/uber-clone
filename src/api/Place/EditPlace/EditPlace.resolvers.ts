import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import Place from '../../../entities/Place';
import { EditPlaceMutationArgs, EditPlaceResponse } from '../../../types/graph';
import cleanNull from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        context
      ): Promise<EditPlaceResponse> => {
        const user: User = context.req.user;
        const { placeId } = args;
        try {
          const place = await Place.findOne({ id: placeId });
          // 해당장소의 유저아이디와 현재 로그인한 사용자의 유저 아이디가 같으므로
          // 수정 가능
          if (place) {
            if (place.userId === user.id) {
              const notNull = cleanNull(args);
              delete notNull.placeId;
              await Place.update({ id: placeId }, { ...notNull });
              return {
                ok: true,
                error: null
              };
            }
            return {
              ok: false,
              error: '사용자 ID가 일치하지않습니다 '
            };
          }
          return {
            ok: false,
            error: '해당하는 장소가 없습니다'
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
