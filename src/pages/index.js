import Archive from '@pages/Archive';
import Home from '@pages/Home';
import Write from '@pages/Write';
import Post from './Post';

const routes = [
  { path: /^\/$/, view: Home },
  { path: /^\/write$/, view: Write },
  { path: /^\/post\/[\w]+$/, view: Post },
  { path: /^\/archive\?category=(my|likes)$/, view: Archive },
];

export default routes;
