import { GraphQLServer, PubSub } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import schema from './schema';
import decodeJWT from './utils/decodeJWT';

class App {
  public app: GraphQLServer;

  public pubSub: any;

  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: (req: ContextParameters) => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          pubSub: this.pubSub,
          context
        };
      }
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(this.jwtMiddleware);
  };

  private jwtMiddleware = async (req, res, next): Promise<void> => {
    const token = req.get('X-JWT');
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
