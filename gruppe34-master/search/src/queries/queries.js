import { gql } from "apollo-boost";

/**
 * forskjellige typer queries brukt i klient-siden. bruker Apollo client.
 * @author: Thusan
 */

// Henter ut alle titlene med satt pagination
const getAllTitlesQuery = gql`
query getAllTitlesQuery($Skip: Int, $Limit: Int) {
  title(pagination: { skip: $Skip, limit: $Limit }) {
    Title
    Year
    ntnuRating
  }
}
`;

// Henter ut spesifikk tittel
const getSpecifiedTitleQuery = gql`
  query getSpecifiedTitleQuery($Title: String) {
    title(filter:{Title:{EQ: $Title}}) {
      Title
      Year
      Rated
      Released
      Runtime
      Genre
      Director
      Actors
      Language
      Country
      Awards
      ntnuRating
      ntnuVotes
    }
  }
`;

// Henter ut alle titlene som inneholder ordet. f.eks. henter "redem" ut The Shawshank Redemption
const getTitleContainingWord = gql`
query getTitleContainingWord($Title: String, $Skip: Int, $Limit: Int) {
  title(filter:{Title:{REGEX:$Title, OPTIONS:"i"}}, pagination:{skip:$Skip, limit: $Limit}) {
    Title
    Year
    Rated
    Released
    Runtime
    Genre
    Director
    Actors
    Language
    Country
    Awards
  }
}
`;

// Henter ut alle titlene sortert på Tittelnavn. ASC eller DESC
const getSortedTitlesByTitleQuery = gql`
  query getSortedTitlesQuery($Sort: SortType, $Skip: Int, $Limit: Int) {
    title(sort:{ Title: $Sort }, pagination:{skip: $Skip, limit: $Limit}) {
      Title
      Year
      Rated
      Released
      Runtime
      Genre
      Director
      Actors
      Language
      Country
      Awards
    }
  }
`;

// Henter ut alle titlene baser på Årstall. ASC eller DESC.
const getSortedTitlesByYearQuery = gql`
  query getSortedTitlesByYearQuery($Sort: SortType, $Skip: Int, $Limit: Int) {
    title(sort:{ Year: $Sort }, pagination:{skip: $Skip, limit: $Limit}) {
      Title
      Year
      Rated
      Released
      Runtime
      Genre
      Director
      Actors
      Language
      Country
      Awards
    }
  }
`;

// Henter ut alle titlene i et gitt års-tall range. Her må FromYear være FromYear-1 og motsatt for ToYear
const getTitleInRangeQuery = gql`
query getTitleInRangeQuery($FromYear: Int, $ToYear:Int $Skip: Int, $Limit: Int) {
  title(filter:{ Year: {GT:$FromYear, LT:$ToYear} }, pagination:{skip: $Skip, limit: $Limit}) {
    Title
    Year
    Rated
    Released
    Runtime
    Genre
    Director
    Actors
    Language
    Country
    Awards
  }
}
`;

// Henter ut titler basert på søk i et gitt års-tall range. Her blir sort gjort på årstall
const getTitleWithAllOptionsByYear = gql`
query getTitleWithAllOptionsByYear($Title: String, $Sort: SortType, $FromYear: Int, $ToYear:Int,
   $Skip: Int, $Limit: Int) {
  title(sort: {Year: $Sort}, pagination:{skip:$Skip, limit:$Limit},
    filter: {Title: {REGEX:$Title, OPTIONS:"i"}, Year:{GT:$FromYear, LT:$ToYear}}) {
    Title
    Year
    Rated
    Released
    Runtime
    Genre
    Director
    Actors
    Language
    Country
    Awards
  }
}
`;

// Henter ut titler basert på søk i et gitt års-tall range. Her blir sort gjort på tittel
const getTitleWithAllOptionsByTitle = gql`
query getTitleWithAllOptionsByYear($Title: String, $Sort: SortType, $FromYear: Int, $ToYear:Int,
   $Skip: Int, $Limit: Int) {
  title(sort: {Title: $Sort}, pagination:{skip:$Skip, limit:$Limit},
    filter: {Title: {REGEX:$Title, OPTIONS:"i"}, Year:{GT:$FromYear, LT:$ToYear}}) {
    Title
    Year
    Rated
    Released
    Runtime
    Genre
    Director
    Actors
    Language
    Country
    Awards
  }
}
`;
// query for å hente ut informasjon om alle titlene usortert.
const getTitleWithAllOptionsNoSort = gql`
query getTitleWithAllOptionsNoSort($Title: String, $FromYear: Int, $ToYear:Int,
   $Skip: Int, $Limit: Int) {
  title(pagination:{skip:$Skip, limit:$Limit},
    filter: {Title: {REGEX:$Title, OPTIONS:"i"}, Year:{GT:$FromYear, LT:$ToYear}}) {
    Title
    Year
    Rated
    Released
    Runtime
    Genre
    Director
    Actors
    Language
    Country
    Awards
  }
}
`;

// query for å oppdatere user ratingen
const updateRanking = gql`
 mutation($Title: String!, $userRating: String!, $ntnuVotes: String!, $ntnuRating: String!){
     updateRanking(Title: $Title, userRating: $userRating, ntnuVotes: $ntnuVotes, ntnuRating: $ntnuRating){
         Title
         ntnuRating
         ntnuVotes
         Year
         Rated
         Released
         Runtime
         Genre
         Director
         Actors
         Language
         Country
         Awards
     }
 }
`;

export { getAllTitlesQuery, getSortedTitlesByTitleQuery,
  getSortedTitlesByYearQuery, getSpecifiedTitleQuery,
  getTitleContainingWord, getTitleInRangeQuery,
  getTitleWithAllOptionsByYear, getTitleWithAllOptionsByTitle,
  getTitleWithAllOptionsNoSort,
  updateRanking};
