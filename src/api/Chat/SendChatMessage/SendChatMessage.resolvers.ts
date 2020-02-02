import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import Message from '../../../entities/Message';
import Chat from '../../../entities/Chat';

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: privateResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;
        const { text, chatId } = args;
        try {
          const chat = await Chat.findOne({ id: chatId });
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              const message = await Message.create({
                text,
                chat,
                user
              }).save();
              pubSub.publish('newChatMessage', {
                MessageSubscription: message
              });
              return {
                ok: true,
                error: null,
                message
              };
            }
            return {
              ok: false,
              error: '인증되지않은 요청입니다',
              message: null
            };
          }
          return {
            ok: false,
            error: '해당채팅을 찾을 수 없습니다',
            message: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.messasge,
            message: null
          };
        }
      }
    )
  }
};

export default resolvers;
