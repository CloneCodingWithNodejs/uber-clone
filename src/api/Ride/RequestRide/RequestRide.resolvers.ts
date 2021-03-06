import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import Ride from '../../../entities/Ride';

// 탑승자가 탈것을 요청할때 사용하는기능임
// 탑승자 기능임

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        if (!user.isRiding) {
          try {
            const ride = await Ride.create({ ...args, passenger: user }).save();
            pubSub.publish('rideRequest', { NearbyRideSubscription: ride });
            user.isRiding = true;
            user.save();
            return {
              ok: true,
              error: null,
              ride
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              ride: null
            };
          }
        } else {
          return {
            ok: false,
            error: '이미 차량을 요청중입니다',
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
