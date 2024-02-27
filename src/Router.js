import routes from '@pages';

const router = async ($container) => {
  const render = () => {
    let page = routes.find((route) => window.location.pathname === route.path);

    if (!page) {
      window.alert('존재하지 않는 페이지입니다!');
      window.history.pushState(null, null, '/');
      page = routes[0];
    }
    // eslint-disable-next-line new-cap
    new page.view($container);
  };

  const init = () => {
    window.addEventListener('historychange', ({ detail }) => {
      const { to, isReplace } = detail;

      if (isReplace || to === window.location.pathname)
        window.history.replaceState(null, '', to);
      else {
        const prev = window.history.state?.data;
        const data = prev ? [prev[0], to] : [to];
      
        window.history.pushState({ data }, '', to);
      } 

      render();
    });
    window.addEventListener('popstate', render);
  };

  init();
  render();
};

export default router;