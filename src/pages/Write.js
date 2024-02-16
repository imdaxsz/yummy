import AbstractView from './AbstractView';

export default class Write extends AbstractView {
  constructor($target, $props) {
    super($target, $props);
    this.setTitle('글쓰기 | yummy');
  }

  template() {
    return `
      <div>
        글쓰기 페이지
      </div>
      `;
  }
}
