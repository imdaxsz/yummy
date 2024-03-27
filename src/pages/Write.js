/* eslint-disable no-use-before-define */
import Rating from '@components/Rating';
import Header from '@components/Header';
import ImageSlider from '@components/ImageSlider';
import Evaluation from '@components/Write/Evaluation';
import Categories from '@components/Write/Categories';
import FileInput from '@components/Write/FileInput';
import Map from '@components/Write/Map';
import scrollLock from '@utils/scrollLock';
import animate from '@utils/verticalAnimation';
import { addPost, updatePost } from '@utils/post';
import getImageUrl from '@utils/getImageUrl';
import store from '@stores';
import navigate from '@utils/navigate';
import Snackbar from '@components/Snackbar';
import AbstractView from './AbstractView';

export default class Write extends AbstractView {
  scrollY; // 지도 modal 렌더링 여부에 따라 스크롤 위치 변경하기 위한 속성
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
      locationInfo: { id: '', address: '', placeName: '' },
      isMapModalVisible: false,
      isLoading: false,
    };
  }

  template() {
    const {
      name,
      ratingValue,
      recommendMenu,
      memo,
      attachments,
      locationInfo: { id, address, placeName },
      isMapModalVisible,
    } = this.state;

    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <form id='editor' class='px-24 pt-8 py-100 tracking-tight'>
        <input
          id='name'
          type='text'
          class='w-full h-34 text-24 mb-32'
          value='${name}' 
          placeholder='맛집 이름을 입력하세요.' 
        />
        <p class ='text-14 font-medium mb-12 '>카테고리</p>
        <div id='categories' class='flex-center gap-7 mb-40 flex-wrap text-zinc-500'></div>
        ${
          attachments.length === 0
            ? `<div id='fileInput-container'></div>`
            : `<div id='attachments'></div>`
        }
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
        ${
          id
            ? `
              <div class='flex items-center justify-between'>
                <div class='flex-1 min-w-0 flex items-center gap-4'>
                  <i class='ph-fill ph-map-pin text-28 block text-primary'></i>
                  <div class='flex-1 min-w-0 pr-8'>
                    <p class='font-medium truncate'>${placeName}</p>
                    <p class='text-14 text-zinc-400 truncate'>${address}</p>
                  </div>
                </div>
                <button id='removeLocation' aria-label='위치 정보 삭제' class='shrink-0'>
                  <i class='ph ph-x text-20 block'></i>
                </button>
              </div>
            `
            : `<button
                id='addLocation'
                aria-label='위치 정보 추가'
                class='flex-center gap-4 text-zinc-600 p-4'
              >
                <i class='ph ph-map-pin text-24 block'></i>
                위치 정보 추가
              </button>`
        }

      </form>
      ${isMapModalVisible ? `<div id="map-modal" ></div>` : ``}
    `;
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
    const {
      categories,
      evaluation,
      ratingValue,
      attachments,
      isMapModalVisible,
      isLoading,
    } = this.state;

    new Header($header, {
      left: 'prev',
      center: '',
      right: FormButton(isLoading),
    });

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

    const $mapModal = document.querySelector('#map-modal');
    if (isMapModalVisible)
      new Map($mapModal, {
        toggleMapModal: this.toggleMapModal.bind(this),
        setLocation: this.setLocation.bind(this),
      });
  }

  setEvent() {
    this.addEvent(
      'change',
      '#name, #recommendMenu, #memo',
      this.onChangeText.bind(this),
    );
    this.addEvent('click', '#addLocation', this.toggleMapModal.bind(this));
    this.addEvent('click', '#removeLocation', () =>
      this.setLocation('', '', ''),
    );
    this.addEvent('submit', '#editor', this.onSubmit.bind(this));
  }

  setLocation(id, address, placeName) {
    this.setState({ ...this.state, locationInfo: { id, address, placeName } });
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

  isFormValid() {
    const { name, categories, locationInfo } = this.state;
    const checkName = name.trim().length === 0;
    const checkCategories = categories.length === 0;
    const checkLocation = locationInfo.id === '';
    const result =
      name.trim().length !== 0 &&
      categories.length !== 0 &&
      locationInfo.id !== '';

    if (!result) {
      const arr = [
        checkName && '맛집 이름',
        checkCategories && '카테고리',
        checkLocation && '위치',
      ].filter(Boolean);

      const charCode = arr[arr.length - 1].charCodeAt(
        arr[arr.length - 1].length - 1,
      );
      const consonantCode = (charCode - 44032) % 28;
      const message = `${arr.join(', ')}${consonantCode ? '을' : '를'} 입력해 주세요.`;
      new Snackbar({ message });
    }

    return result;
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ ...this.state, isLoading: true });
    const { user } = store.state;
    if (!user) {
      alert('로그인 후 이용 가능해요!');
      navigate('/'); // TODO: 로그인 페이지로 변경
      return;
    }

    if (!this.isFormValid()) {
      this.setState({ ...this.state, isLoading: false });
      return;
    }

    const { isMapModalVisible, attachments, ...post } = this.state;
    const doc = await addPost({
      attachments: [],
      ...post,
      username: user.email,
      createdAt: Date.now(),
      likes: [],
    });

    if (doc && attachments.length > 0) {
      const imageUrls = await Promise.all(
        attachments.map(
          async (attachment) =>
            // eslint-disable-next-line no-return-await
            await getImageUrl(user.uid, doc.id, attachment),
        ),
      );
      updatePost(doc, { attachments: [...imageUrls] });
    }
    this.setState({ ...this.state, isLoading: false });
    navigate(`/post/${doc.id}`);
  }

  toggleMapModal() {
    const { isMapModalVisible: prev } = this.state;
    const display = prev ? 'none' : 'block';
    if (!prev) {
      this.scrollY = window.scrollY;
      this.setState({ ...this.state, isMapModalVisible: !prev });
    }
    const el = animate('#map-modal', 200, prev, () => {
      this.setState({ ...this.state, isMapModalVisible: !prev });
    });
    el.play();
    setTimeout(() => scrollLock(display, this.scrollY), prev ? 0 : 150);
  }
}

function FormButton(disabled) {
  return `
    <button
      form='editor'
      type='submit'
      ${disabled && 'disabled'}
      class='btn-primary px-12 py-2 bg-primary rounded-full text-white font-medium'
    >
      완료
    </button>
  `;
}
