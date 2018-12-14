const graphql = require("graphql");
const _ = require("lodash");
const Title = require("../models/Titles");
const graphql_mongodb = require("graphql-to-mongodb");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} = graphql;

const { getGraphQLQueryArgs, getMongoDbQueryResolver } = graphql_mongodb;

/**
 * schema for GraphQL serveren.
 * @author: Thusan
 */


// definerer GraphQL objektet
const MovieType = new GraphQLObjectType({
  name: "Title",
  fields: () => ({
    _id: { type: GraphQLString },
    Title: { type: GraphQLString },
    Year: { type: GraphQLInt },
    Rated: { type: GraphQLString },
    Released: { type: GraphQLString },
    Runtime: { type: GraphQLString },
    Genre: { type: GraphQLString },
    Director: { type: GraphQLString },
    Actors: { type: GraphQLString },
    Language: { type: GraphQLString },
    Country: { type: GraphQLString },
    Awards: { type: GraphQLString },
    ntnuRating: { type: GraphQLString },
    ntnuVotes: { type: GraphQLString }
  })
});

// definerer oppsettet til query og resolver det til MongoDB query parametere.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    title: {
      type: new GraphQLList(MovieType),
      args: getGraphQLQueryArgs(MovieType),
      resolve: getMongoDbQueryResolver(
        MovieType,
        async (filter, projection, options, source, args, context) => {
          return await Title.find(filter, projection, options);
        }
      )
    }
  }
});

// definerer den ene typen mutation vi gjør. finner ut av ny "ntnu average" og pusher dette opp til databasen med nytt antall stemmer.
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    updateRanking: {
      type: MovieType,
      args: {
        Title: { type: new GraphQLNonNull(GraphQLString) },
        userRating: { type: new GraphQLNonNull(GraphQLString) },
        ntnuVotes: { type: new GraphQLNonNull(GraphQLString) },
        ntnuRating: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        console.log(args);
        return new Promise((resolve, reject) => {
          const numberOfPoints =
            parseFloat(args.ntnuRating) * parseFloat(args.ntnuVotes);
          const addUserVotetoVotes = parseInt(args.ntnuVotes) + 1;
          const newAvg =
            (numberOfPoints + parseFloat(args.userRating)) / addUserVotetoVotes;
          Title.findOneAndUpdate(
            { Title: args.Title },
            {
              $set: {
                ntnuRating: newAvg.toString(),
                ntnuVotes: addUserVotetoVotes.toString()
              }
            },
            { new: true }
          ).exec((err, res) => {
            console.log("test", res);
            if (err) reject(err);
            else resolve(res);
          });
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
