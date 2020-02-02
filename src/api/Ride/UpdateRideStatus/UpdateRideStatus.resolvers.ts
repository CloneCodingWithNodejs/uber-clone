import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from '../../../types/graph';
import Ride from '../../../entities/Ride';
import Chat from '../../../entities/Chat';

// 운전자가 요청을 수락하거나 취소하거나 종료 할 수 있음
// 운전자가 사용하는 기능임
const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        const { rideId, status } = args;
        if (user.isDriving) {
          try {
            let ride: Ride | undefined;
            // 현재 운전자가 수락함을 선택하면 현재 탈것의 운전자는
            // 현재 로그인해있는 사용자로 바꿈
            if (status === 'ACCEPTED') {
              ride = await Ride.findOne(
                {
                  id: rideId,
                  status: 'REQUESTING'
                },
                { relations: ['passenger'] }
              );
              if (ride) {
                ride.driver = user;
                user.isTaken = true;
                user.save();
                pubSub.publish('rideUpdate', { RideStatusSubscription: ride });

                // 처음으로 매칭되었으니 채팅방을 생성함
                const chat = await Chat.create({
                  driver: user,
                  passenger: ride.passenger
                }).save();
                ride.chat = chat;
                ride.save();
              }
              // 이미 매칭은 되어있고 완료나 취소같은 업데이트를 할때
            } else {
              ride = await Ride.findOne({
                id: rideId,
                driver: user
              });
            }

            if (ride) {
              ride.status = status;
              ride.save();
              pubSub.publish('rideUpdate', { RideStatusSubscription: ride });
              return {
                ok: true,
                error: null
              };
            }
            return {
              ok: false,
              error: '해당하는 탈것 ID가 없습니다'
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        }

        return {
          ok: false,
          error: '현재 회원님은 운전중이 아닙니다'
        };
      }
    )
  }
};

export default resolvers;
