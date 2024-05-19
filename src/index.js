import App from './App';
import '@styles/tailwind.css';
import '@styles/global.css';
import '@phosphor-icons/web/fill';
import '@phosphor-icons/web/regular';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => console.log('DONE: ', registration))
      .catch((e) => console.log('SW registration failed:', e));
  });
}

const $app = document.querySelector('#app');
new App($app);
