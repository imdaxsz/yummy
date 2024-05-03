import algoliaClient from '@libs/algolia';

const search = async (categories, minScore, maxScore, keyword) => {
  const result = { list: [] };

  // 필터 없이 키워드만 있는 경우 리스트 제목에 키워드를 포함하는 리스트 검색
  if (keyword && categories.length === 0 && minScore === 0 && maxScore === 5) {
    const listIndex = algoliaClient.initIndex('list');
    const res = await listIndex.search(keyword);
    result.list = res.hits;
  }

  // 포스트 검색
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
  result.posts = res.hits;
  
  return result;
};

export default search;
