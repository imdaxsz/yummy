import { auth } from '@libs/firebase';
import { getView, routes } from '@pages';
import store from '@stores';
import navigate from '@utils/navigate';
import { onAuthStateChanged } from 'firebase/auth';

const router = async ($container) => {
  const render = () => {
    let page = routes.find((route) =>
      route.path.test(window.location.pathname + window.location.search),
    );

    if (!page) {
      window.alert('존재하지 않는 페이지입니다!');
      window.history.pushState(null, null, '/');
      page = routes[0];
    }

    const { user } = store.state;
    if (page.private && !user) {
      sessionStorage.setItem(
        'redirect',
        window.location.pathname + window.location.search,
      );
      // 로그인 페이지로 redirect
      navigate('/signin', true);
      return;
    }

    if (['Home', 'Write'].includes(page.name)) {
      // eslint-disable-next-line new-cap
      new page.view($container);
      return;
    }

    getView(page.name).then((Page) => {
      new Page($container);
    });
  };

  const mount = () => {
    onAuthStateChanged(auth, (user) => {
      // user: User | NULL
      store.setState({ user, isLoggedIn: !!user });
      render();
    });
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

      mount();
    });
    window.addEventListener('popstate', mount);
  };

  init();
  mount();
};

export default router;
