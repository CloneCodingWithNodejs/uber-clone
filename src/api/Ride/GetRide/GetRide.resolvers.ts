import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import { GetRideResponse, GetRideQueryArgs } from '../../../types/graph';
import Ride from '../../../entities/Ride';

const resolvers: Resolvers = {
  Query: {
    GetRide: privateResolver(
      async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
        const user: User = req.user;
        try {
          const ride = await Ride.findOne(
            { id: args.rideId },
            { relations: ['passenger', 'driver'] }
          );
          if (ride) {
            // 찾은 요청의 승객이나 운전자 아이디가 사용자와 같을때만 보여줘야함
            if (ride.passengerId === user.id || ride.driverId === user.id) {
              return {
                ok: true,
                error: null,
                ride
              };
            }
            return {
              ok: false,
              error: '인증되지 않은 요청입니다',
              ride: null
            };
          }
          return {
            ok: false,
            error: '탈것을 찾을 수 없습니다',
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
