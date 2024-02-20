import AbstractView from './AbstractView';

export default class Write extends AbstractView {
  constructor($target, props) {
    super($target, props, '글쓰기 | yummy');
  }

  template() {
    return `
      <div>
        글쓰기 페이지
      </div>
      `;
  }
}
