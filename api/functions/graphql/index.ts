import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-azure-functions";
import { join } from "path";
import resolvers from "./resolvers";
import db from '../lib/mongodb';

const schema = loadSchemaSync(
  join(__dirname, '..', '..', 'graphql', 'schema.graphql'),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const server = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
  context: async ({ request }) => {
    let token: string = request.headers.authorization || '';
    await db.init();
    
    if (token === '') {
      return {};
    }
    if (token.startsWith('Bearer ')) {
        token = token.substring(7);
    }
    
    const user = await db.findUserByToken(token);
    return { user };
  }
});

export default server.createHandler({
  cors: {
    origin: ['*'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['access-control-allow-credentials', 'access-control-allow-origin', 'content-type']
  },
});