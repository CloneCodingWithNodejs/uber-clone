import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { GetChatQueryArgs, GetChatResponse } from '../../../types/graph';
import User from '../../../entities/User';
import Chat from '../../../entities/Chat';

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne(
            {
              id: args.chatId
            },
            { relations: ['messages'] }
          );

          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              return {
                ok: true,
                error: null,
                chat
              };
            }
            return {
              ok: false,
              error: '인증되지않은 요청입니다',
              chat: null
            };
          }
          return {
            ok: false,
            error: '일치하는 채팅을 찾을 수 없습니다',
            chat: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null
          };
        }
      }
    )
  }
};

export default resolvers;
