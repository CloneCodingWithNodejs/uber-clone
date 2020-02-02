import { getRepository, Between } from 'typeorm';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import Ride from '../../../entities/Ride';
import { GetNearbyRideResponse } from '../../../types/graph';

const resolvers: Resolvers = {
  Query: {
    GetNearbyRide: privateResolver(
      async (_, __, { req }): Promise<GetNearbyRideResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        try {
          const ride = await getRepository(Ride).findOne({
            status: 'REQUESTING',
            pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
            pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
          });
          if (ride) {
            return {
              ok: true,
              error: null,
              ride
            };
          }
          return {
            ok: true,
            error: '주변의 탑승요청이 존재하지않습니다',
            ride: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
