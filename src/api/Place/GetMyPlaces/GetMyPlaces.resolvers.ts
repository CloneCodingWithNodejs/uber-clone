import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { GetMyPlacesResponse } from '../../../types/graph';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async (_, __, context): Promise<GetMyPlacesResponse> => {
        const {
          user: { id }
        } = context;
        try {
          const user = await User.findOne({ id }, { relations: ['places'] });
          if (user) {
            return {
              ok: true,
              error: null,
              places: user.places
            };
          }
          return {
            ok: false,
            error: 'user가 없습니다',
            places: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null
          };
        }
      }
    )
  }
};

export default resolvers;
