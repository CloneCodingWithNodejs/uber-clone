import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { ToggleDrivingModeResponse } from '../../../types/graph';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, context): Promise<ToggleDrivingModeResponse> => {
        const user: User = context.req.user;
        // ON/OFF 해줌
        user.isDriving = !user.isDriving;
        user.save();

        return {
          ok: true,
          error: null
        };
      }
    )
  }
};

export default resolvers;
