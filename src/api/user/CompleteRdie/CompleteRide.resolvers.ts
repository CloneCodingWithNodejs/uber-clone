import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import {
  CompleteRideResponse,
  CompleteRideMutationArgs
} from '../../../types/graph';
import User from '../../../entities/User';
import Ride from '../../../entities/Ride';

const resolvers: Resolvers = {
  Mutation: {
    CompleteRide: privateResolver(
      async (
        _,
        args: CompleteRideMutationArgs
      ): Promise<CompleteRideResponse> => {
        try {
          const { driverId, passengerId, rideId } = args;
          const passenger = await User.findOne({ id: passengerId });
          const driver = await User.findOne({ id: driverId });
          const ride = await Ride.findOne({ id: rideId });

          if (passenger && driver && ride) {
            if (passenger.ridesAsPassenger === undefined)
              passenger.ridesAsPassenger = [];
            if (driver.ridesAsDriver === undefined) driver.ridesAsDriver = [];
            passenger.ridesAsPassenger.push(ride);
            driver.ridesAsDriver.push(ride);

            passenger.save();
            driver.save();

            return {
              ok: true,
              error: null
            };
          }
          return {
            ok: false,
            error: 'driver or passenger is not found'
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
