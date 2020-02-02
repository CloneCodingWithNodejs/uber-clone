/* eslint-disable operator-linebreak */
import { withFilter } from 'graphql-yoga';
import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('rideRequest'),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            NearbyRideSubscription: { pickUpLat, pickUpLng }
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;

          if (
            pickUpLat >= userLastLat - 0.05 &&
            pickUpLat <= userLastLat + 0.05 &&
            pickUpLng >= userLastLng - 0.05 &&
            pickUpLng <= userLastLng + 0.05
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
