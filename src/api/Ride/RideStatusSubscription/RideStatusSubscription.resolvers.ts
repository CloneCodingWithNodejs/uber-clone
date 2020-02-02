/* eslint-disable operator-linebreak */
import { withFilter } from 'graphql-yoga';
import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('rideUpdate'),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            RideStatusSubscription: { driverId, passengerId }
          } = payload;

          // 탈것 요청중 탑승자이거나 운전자일경우만
          // 해당 요청 정보가 업데이트 되었을때 알림을 받음
          if (user.id === passengerId || user.id === driverId) {
            return true;
          }
          return false;
        }
      )
    }
  }
};

export default resolvers;
