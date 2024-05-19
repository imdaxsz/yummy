import Home from '@pages/Home';
import Write from '@pages/Write';

export const getView = (name) => import(`./${name}`).then((mod) => mod.default);

export const routes = [
  { path: /^\/$/, name: 'Home', view: Home },
  { path: /^\/signin$/, name: 'SignIn' },
  {
    path: /^\/write(\?mode=edit&id=[^&\s]+)?$/,
    name: 'Write',
    view: Write,
    private: true,
  },
  { path: /^\/post\/[\w]+$/, name: 'Post' },
  { path: /^\/list\/[\w]+$/, name: 'ListInfo' },
  {
    path: /^\/search\?[a-zA-Z0-9_=&%]+$/,
    name: 'SearchResult',
  },
  {
    path: /^\/archive\?category=(my|likes)$/,
    name: 'Archive',
    private: true,
  },
  {
    path: /^\/archive\?category=likes&filter=(list|posts)$/,
    name: 'LikeList',
    private: true,
  },
  {
    path: /^\/leave$/,
    name: 'Leave',
    private: true,
  },
];
