import Rating from '@components/Rating';
import Header from '@components/Header';
import ImageSlider from '@components/ImageSlider';
import AbstractView from './AbstractView';
import Evaluation from '@components/Write/Evaluation';
import Categories from '@components/Write/Categories';
import FileInput from '@components/Write/FileInput';

export default class Write extends AbstractView {
  constructor($target, props) {
    super($target, props, '글쓰기 | yummy');
  }

  setup() {
    this.state = {
      name: '',
      categories: [],
      evaluation: {},
      ratingValue: 0,
      attachments: [],
      recommendMenu: '',
      memo: '',
      locationInfo: '',
    };
  }

  template() {
    const { name, ratingValue, recommendMenu, memo, attachments } = this.state;

    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-24 pt-8 py-50'>
      <form>
        <input
          id='name'
          type='text'
          class='h-34 text-24 mb-32'
          value='${name}' 
          placeholder='맛집 이름을 입력하세요.' 
        />
        <p class ='text-14 font-medium mb-12 '>카테고리</p>
        <div id='categories' class='flex-center gap-7 mb-40 flex-wrap text-zinc-500'></div>
        ${
          attachments.length === 0 ? `<div id='fileInput-container'></div>` : ``
        }
        <div id='attachments'></div>
        <div id='rating' class='p-8 my-16'></div>
        ${ratingValue !== 0 ? `<div id='evaluation' class='mb-48 text-14'></div>` : ``}
        <p class ='text-14 font-medium mb-6'>추천 메뉴</p>
        <input
          id='recommendMenu'
          type='text'
          class='w-full mb-50'
          value='${recommendMenu}' 
          placeholder='추천 메뉴가 있다면 입력하세요.' 
        />
        <hr class='mb-24'/>
        <textarea
          id='memo'
          class='w-full min-h-150 resize-none'
          placeholder='이 맛집에 대한 메모를 남겨보세요.'
        >${memo}</textarea>
        <button
          aria-label='위치 정보 추가'
          class='flex-center gap-4 text-zinc-500 font-medium p-4'
        >
          <i class='ph ph-map-pin text-24 block'></i>
          위치 정보 추가
        </button>
        </form>
      </div>
    `;
  }

  onChangeRating(value) {
    this.setState({ ...this.state, ratingValue: value });
    if (this.state.ratingValue === 0)
      this.setState({ ...this.state, evaluation: {} });
  }

  onChangeCategories(id) {
    const { categories: prev } = this.state;
    const categories = prev.includes(id)
      ? prev.filter((i) => i !== id)
      : [...prev, id];
    this.setState({ ...this.state, categories });
  }

  updateAttachments(attachments) {
    this.setState({ ...this.state, attachments });
  }

  onChangeEvaluation(id) {
    const [label, score] = id.split('-');
    const { evaluation: prev } = this.state;
    const evaluation = { ...prev, [label]: Number(score) };
    this.setState({ ...this.state, evaluation });
  }

  onChangeText(e) {
    const { id, value } = e.target;
    this.setState({ ...this.state, [id]: value });
  }

  setEvent() {
    this.addEvent(
      'change',
      'input[type="text"], #memo',
      this.onChangeText.bind(this),
    );
  }

  didMount() {
    const $header = this.$target.querySelector('#header');
    const $categories = this.$target.querySelector('#categories');
    const $attachments = this.$target.querySelector('#attachments');
    const $rating = this.$target.querySelector('#rating');
    const $evaluation = this.$target.querySelector('#evaluation');
    const $fileInputContainer = this.$target.querySelector(
      '#fileInput-container',
    );
    const { categories, evaluation, ratingValue, attachments } = this.state;

    new Header($header, { left: 'prev', center: '', right: '완료' });

    new Categories($categories, {
      categories,
      onClick: this.onChangeCategories.bind(this),
    });

    if ($fileInputContainer)
      new FileInput($fileInputContainer, {
        updateAttachments: this.updateAttachments.bind(this),
      });

    if (attachments.length > 0) {
      new ImageSlider($attachments, {
        imageUrl: [...attachments],
        updateAttachments: this.updateAttachments.bind(this),
      });
    }

    new Rating($rating, {
      value: ratingValue,
      readonly: false,
      onChangeRating: this.onChangeRating.bind(this),
    });

    if (ratingValue !== 0)
      new Evaluation($evaluation, {
        evaluation,
        onClick: this.onChangeEvaluation.bind(this),
      });
  }
}
