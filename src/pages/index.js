import Archive from '@pages/Archive';
import Home from '@pages/Home';
import Write from '@pages/Write';
import Post from '@/pages/Post';
import ListInfo from '@/pages/ListInfo';
import Leave from '@/pages/Leave';

const routes = [
  { path: /^\/$/, view: Home },
  { path: /^\/write$/, view: Write },
  { path: /^\/post\/[\w]+$/, view: Post },
  { path: /^\/list\/[\w]+$/, view: ListInfo },
  { path: /^\/archive\?category=(my|likes)$/, view: Archive },
  { path: /^\/leave$/, view: Leave },
];

export default routes;
