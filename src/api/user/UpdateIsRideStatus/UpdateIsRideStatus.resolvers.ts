import privateResolver from '../../../utils/privateResolver';
import { Resolvers } from '../../../types/resolvers';
import { UpdateIsRideStatusResponse } from '../../../types/graph';
import User from '../../../entities/User';

// 우버운행이 끝났을때 유저의 isRide상태를 false로 바꿈

const resolvers: Resolvers = {
  Mutation: {
    UpdateIsRideStatus: privateResolver(
      async (_, args, context): Promise<UpdateIsRideStatusResponse> => {
        const { userId } = args;
        try {
          const passenger = await User.findOne({ id: userId });
          if (passenger) {
            passenger.isRiding = false;
            passenger.save();
            return {
              ok: true,
              error: null,
              userId: passenger.id
            };
          }
          return {
            ok: false,
            error: 'user is null',
            userId: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            userId: null
          };
        }
      }
    )
  }
};

export default resolvers;
