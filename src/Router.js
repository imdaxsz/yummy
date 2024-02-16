import Archive from '@pages/Archive';
import Home from '@pages/Home';
import Write from '@pages/Write';

export const router = async () => {
  const $target = document.querySelector('#content');

  const routes = [
    { path: '/', view: Home },
    { path: '/write', view: Write },
    { path: '/archive', view: Archive },
  ];

  const potentialMatches = routes.map((route) => ({
    route,
    isMatch: window.location.pathname === route.path,
  }));

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    window.alert('존재하지 않는 페이지입니다!');
    window.history.pushState(null, null, '/');
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  // eslint-disable-next-line new-cap
  new match.route.view($target);
};

export const navigate = (url) => {
  window.history.pushState(null, null, url);
  router();
};

window.addEventListener('popstate', router);
