import Archive from '@pages/Archive';
import Home from '@pages/Home';
import Write from '@pages/Write';

export const navigate = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = async () => {
  const $target = document.querySelector('#content');

  const routes = [
    { path: '/', view: Home },
    { path: '/write', view: Write },
    { path: '/archive', view: Archive },
  ];

  const potentialMatches = routes.map((route) => ({
    route: route,
    isMatch: location.pathname === route.path,
  }));

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.isMatch,
  );

  if (!match) {
    window.alert('존재하지 않는 페이지입니다!');
    history.pushState(null, null, "/");
    match = {
      route: routes[0],
      isMatch: true,
    };
    console.log(match);
  }
  new match.route.view($target);

};

window.addEventListener('popstate', router);
