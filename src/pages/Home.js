import AbstractView from './AbstractView';

export default class Home extends AbstractView {
  constructor($target, props) {
    super($target, props, '홈 | yummy');
  }

  template() {
    return `
      <div>
        홈 페이지
      </div>
      `;
  }
}
