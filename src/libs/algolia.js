import algoliasearch from "algoliasearch";

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_KEY,
  process.env.ALGOLIA_SEARCH_KEY,
);

export default algoliaClient;
