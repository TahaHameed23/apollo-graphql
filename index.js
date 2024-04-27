import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//types
import { typeDefs } from "./schema.js";

//db
import db from "./_db.js";
const resolvers = {
    Query: {
        reviews: () => db.reviews,
        games: () => db.games,
        authors: () => db.authors,
        review: (parent, args, context, info) => {
            return db.reviews.find((review) => review.id === args.id);
        },
        game: (parent, args, context, info) => {
            return db.games.find((game) => game.id === args.id);
        },
        author: (parent, args, context, info) => {
            return db.authors.find((author) => author.id === args.id);
        },
    },
    Game: {
        reviews: (parent, args, context, info) => {
            return db.reviews.filter((review) => review.game_id === parent.id);
        },
    },
    Review: {
        game: (parent, args, context, info) => {
            return db.games.find((game) => game.id === parent.game_id);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4010 },
});

console.log("Server at localhost:4010");
