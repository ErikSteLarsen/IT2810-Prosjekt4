const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * definerer mongoDB objeketet med mongoose driver. eksporterer db.collections.top som "Title"
 * @author: Thusan
 */

const titlesSchema = new Schema({
  _id: String,
  Title: String,
  Year: Schema.Types.Number,
  Rated: String,
  Released: String,
  Runtime: String,
  Genre: String,
  Director: String,
  Actors: String,
  Language: String,
  Country: String,
  Awards: String,
  ntnuRating: String,
  ntnuVotes: String
});

module.exports = mongoose.model("Title", titlesSchema, "top");
