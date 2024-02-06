function App() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello World!';

  return element;
}

document.body.appendChild(App());
