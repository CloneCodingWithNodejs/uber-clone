import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_, __, context) => {
      const { user } = context.req;
      return {
        ok: true,
        error: null,
        user
      };
    })
  }
};

export default resolvers;
