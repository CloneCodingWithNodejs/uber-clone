/* eslint-disable operator-linebreak */
import { withFilter } from 'graphql-yoga';
import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    DriverSubscription: {
      subscribe: withFilter(
        (_, __, context) => context.pubSub.asyncIterator('driverUpdate'),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            DriverSubscription: { lastLat: nearLastLat, lastLng: nearLastLng }
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;

          if (
            nearLastLat >= userLastLat - 0.05 &&
            nearLastLat <= userLastLat + 0.05 &&
            nearLastLng >= userLastLng - 0.05 &&
            nearLastLng <= userLastLng + 0.05
          ) {
            return true;
          }
          return false;
        }
      )
    }
  }
};

export default resolvers;
