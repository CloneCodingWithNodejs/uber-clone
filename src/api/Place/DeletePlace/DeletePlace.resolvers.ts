import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import Place from '../../../entities/Place';

const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privateResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        context
      ): Promise<DeletePlaceResponse> => {
        const user: User = context.req.user;
        const { placeId } = args;
        try {
          const place = await Place.findOne({ id: placeId });
          if (place) {
            if (place.userId === user.id) {
              place.remove();
              return {
                ok: true,
                error: null
              };
            }
            return {
              ok: false,
              error: '사용자 ID가 일치하지 않습니다'
            };
          }
          return {
            ok: false,
            error: '장소가 존재하지 않습니다'
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
