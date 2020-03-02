import dotenv from 'dotenv';
import { Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import app from './app';
import defaultConnectionOptions from './ormConfig';
import decodeJWT from './utils/decodeJWT';

dotenv.config();

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = '/playground';
const GRAPHQL_ENDPOINT: string = '/graphql';
const SUBSCRIPTION_ENDPOINT: string = '/subscription';

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParams) => {
      const token = connectionParams['X-JWT'];
      if (token) {
        const user = await decodeJWT(token);
        return {
          currentUser: user
        };
      }
      return null;
    }
  }
};

const handleAppStart = (): void => {
  console.log(`Listening on port ${PORT}`);
};

createConnection(defaultConnectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
});
