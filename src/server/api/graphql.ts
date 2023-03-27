import { schema } from '#graphql/schema';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateH3Handler } from '@as-integrations/h3';
import { initLoaders } from '../graphql/dataloaders';
import { IGraphQLContext } from '../graphql/IGraphQLContext';
import { resolvers } from '../graphql/resolvers';

const apollo = new ApolloServer({ typeDefs: schema, resolvers, introspection: true });

export default startServerAndCreateH3Handler(apollo, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: async (event) => {
    // Context can be better but for the purpose of this app,
    // there's really not much to do here but I'll leave it like
    // this for future reference.
    const context: IGraphQLContext = {
      loaders: initLoaders(),
    };

    return context;
  },
});
