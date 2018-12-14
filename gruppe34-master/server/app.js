const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");

/**
 * Express API
 * Tilkobling til database og graphiql
 * @author: Thusan
 */

mongoose.set("useFindAndModify", false);

const app = express();

// Tillater cross-origin requests
app.use(cors());

// Koble til database på server
const url = "mongodb://admin:passorD123@it2810-34.idi.ntnu.no/movies";
const opts = { useNewUrlParser: true };

mongoose.connect(
  url,
  opts
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000");
});
