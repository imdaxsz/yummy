import algoliaClient from '@libs/algolia';

const search = async (categories, minScore, maxScore, keyword) => {
  const index = algoliaClient.initIndex('posts');
  const searchQuery = {};

  if (categories.length > 0)
    searchQuery.filters = categories
      .map((tag) => `categories:${tag}`)
      .join(' OR ');
  
  if (!(minScore === 0 && maxScore === 5))
    searchQuery.numericFilters = [
      `ratingValue >= ${minScore}`,
      `ratingValue <=${maxScore}`,
    ];

  const res = await index.search(keyword, searchQuery);
  return res.hits;
};

export default search;
