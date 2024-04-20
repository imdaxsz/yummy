import Archive from '@pages/Archive';
import Home from '@pages/Home';
import Write from '@pages/Write';
import Post from '@/pages/Post';
import ListInfo from '@/pages/ListInfo';
import Leave from '@/pages/Leave';
import SignIn from './SignIn';
import LikeList from './LikeList';
import SearchResult from './SearchResult';

const routes = [
  { path: /^\/$/, view: Home },
  { path: /^\/signin$/, view: SignIn },
  { path: /^\/write(\?mode=edit&id=[^&\s]+)?$/, view: Write, private: true },
  { path: /^\/post\/[\w]+$/, view: Post },
  { path: /^\/list\/[\w]+$/, view: ListInfo },
  { path: /^\/search\?[a-zA-Z0-9_=&%]+$/, view: SearchResult },
  { path: /^\/archive\?category=(my|likes)$/, view: Archive, private: true },
  {
    path: /^\/archive\?category=likes&filter=(list|posts)$/,
    view: LikeList,
    private: true,
  },
  { path: /^\/leave$/, view: Leave, private: true },
];

export default routes;
