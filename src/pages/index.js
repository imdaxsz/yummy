import Archive from '@pages/Archive';
import Home from '@pages/Home';
import Write from '@pages/Write';

const routes = [
  { path: '/', view: Home },
  { path: '/write', view: Write },
  { path: '/archive', view: Archive },
];

export default routes;