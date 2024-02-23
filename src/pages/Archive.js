import AbstractView from './AbstractView';

export default class Archive extends AbstractView {
  constructor($target, props) {
    super($target, props, '보관함 | yummy');
  }

  template() {
    return `
      <div>
        보관함 페이지
      </div>
    `;
  }
}
