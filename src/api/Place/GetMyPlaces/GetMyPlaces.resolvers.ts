import { getRepository } from 'typeorm';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { GetMyPlacesResponse } from '../../../types/graph';
import Place from '../../../entities/Place';

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async (_, __, context): Promise<GetMyPlacesResponse> => {
        const {
          user: { id }
        } = context.req;
        try {
          // const user = await User.findOne({ id }, { relations: ['places'] });
          const places = await getRepository(Place)
            .createQueryBuilder('place')
            .where('place.userId = :id', { id })
            .orderBy('place.id', 'DESC')
            .getMany();
          if (places) {
            return {
              ok: true,
              error: null,
              places
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
