import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PedalResolver } from './resolvers/PedalResolver';
import { ManufacturerResolver } from './resolvers/ManufacturerResolver';
import * as dotenv from 'dotenv';
import { manufacturerLoader } from "./loaders/manufacturerLoader";
import { manufacturerPedalsLoader } from "./loaders/manufacturerPedalsLoader";
import { pedalVersionsLoader } from "./loaders/pedalVersionsLoader";
import { VersionResolver } from './resolvers/VersionResolver';

(async () => {
  const app = express();
  dotenv.config();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );

  await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PedalResolver, ManufacturerResolver, VersionResolver],
      validate: true
    }),
    tracing: true,
    context: ({ req }: {req: Request}) => ({ 
      req,
      manufacturerLoader: manufacturerLoader(),
      manufacturerPedalsLoader: manufacturerPedalsLoader(),
      pedalVersionsLoader: pedalVersionsLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
