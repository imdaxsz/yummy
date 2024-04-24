/* eslint-disable no-return-await */
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
import { addPost, getPost, updatePost } from '@apis/post';
import { deleteImageFile, getImageUrl } from '@apis/image';
import store from '@stores';
import navigate from '@utils/navigate';
import Snackbar from '@components/Snackbar';
import { handleListThumbnail } from '@apis/list';
import isEndWithConsonant from '@utils/isEndWithConsonant';
import Loader from '@components/Loader';
import PlaceLocation from '@components/Write/PlaceLocation';
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
      locationInfo: { id },
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
              <div id='placeLocation' class='flex items-center justify-between'></div>
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

  async didMount() {
    const $header = this.$target.querySelector('#header');
    const $categories = this.$target.querySelector('#categories');
    const $attachments = this.$target.querySelector('#attachments');
    const $rating = this.$target.querySelector('#rating');
    const $evaluation = this.$target.querySelector('#evaluation');
    const $fileInputContainer = this.$target.querySelector(
      '#fileInput-container',
    );
    const $placeLocation = this.$target.querySelector('#placeLocation');
    
    const {
      categories,
      evaluation,
      ratingValue,
      attachments,
      isMapModalVisible,
      locationInfo,
      isLoading,
    } = this.state;

    // 수정일 경우 게시글 내용 fetch
    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.get('mode');
    const id = searchParams.get('id');
    if (mode === 'edit' && id && !this.state.createdAt) {
      await this.fetchData(id);
      return;
    }

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
        croppable: true,
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
    
    if (locationInfo.id) {
      new PlaceLocation($placeLocation, locationInfo);
    }

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

  updateAttachments(next) {
    if (!Array.isArray(next)) {
      const { attachments } = this.state;
      const temp = [...attachments];
      temp[next.i] = next.src;
      this.setState({ ...this.state, attachments: temp });
      return;
    }
    this.setState({ ...this.state, attachments: next });
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
    const { name, categories, locationInfo, memo } = this.state;
    const checkName = name.trim().length === 0;
    const checkCategories = categories.length === 0;
    const checkLocation = locationInfo.id === '';
    const isNotBlank = !checkName && !checkCategories && !checkLocation;

    if (name.trim().length > 30) {
      new Snackbar({ message: '맛집 이름은 최대 30자까지 입력 가능해요.' });
      return false;
    }

    if (memo.trim().length > 1000) {
      new Snackbar({ message: '메모는 최대 1000자까지 입력 가능해요.' });
      return false;
    }

    if (!isNotBlank) {
      const arr = [
        checkName && '맛집 이름',
        checkCategories && '카테고리',
        checkLocation && '위치',
      ].filter(Boolean);

      const message = `${arr.join(', ')}${isEndWithConsonant(arr[arr.length - 1]) ? '을' : '를'} 입력해 주세요.`;
      new Snackbar({ message });
    }

    return isNotBlank;
  }

  async onSubmit(e) {
    e.preventDefault();
    const loader = new Loader({ color: 'primary', backdrop: true });
    this.setState({ ...this.state, isLoading: true });
    const { user } = store.state;
    if (!user) {
      alert('로그인 후 이용 가능해요!');
      window.location.href = '/signin';
      return;
    }

    if (!this.isFormValid()) {
      this.setState({ ...this.state, isLoading: false });
      loader.unmount();
      return;
    }

    const {
      isMapModalVisible,
      attachments,
      isLoading,
      edit,
      currentAttachments,
      id,
      ...post
    } = this.state;

    let postId = '';

    if (edit) {
      await updatePost(id, { attachments, ...post });
      postId = id;
    } else {
      const doc = await addPost({
        attachments: [],
        ...post,
        uid: user.uid,
        email: user.email,
        createdAt: Date.now(),
        likes: [],
      });

      postId = doc.id;
    }

    if (postId) {
      await this.handleAttachments(
        attachments,
        currentAttachments ?? [],
        postId,
        user.uid,
      );
    }

    loader.unmount();
    window.location.href = `/post/${postId}`;
    this.setState({ ...this.state, isLoading: false });
  }

  async handleAttachments(current, prev, postId, uid) {
    if (JSON.stringify(current) === JSON.stringify(prev)) return;
    if (prev.length > 0) {
      const deletedAttachments = prev.filter((i) => !current.includes(i));
      deletedAttachments.forEach(async (img) => deleteImageFile(uid, img));
    }
    if (current.length === 0) return;

    const imageUrls = await Promise.all(
      current.map(async (attachment) =>
        prev.includes(attachment)
          ? attachment
          : await getImageUrl(uid, postId, attachment),
      ),
    );
    await updatePost(postId, { attachments: [...imageUrls] });
    await handleListThumbnail(uid, imageUrls[0]);
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

  async fetchData(id) {
    if (!id) {
      alert('존재하지 않는 페이지입니다!');
      navigate('/');
      return;
    }
    const loader = new Loader({ color: 'primary', backdrop: true });
    await getPost(id, false, (res) => {
      this.setState({
        ...this.state,
        ...res.data(),
        currentAttachments: res.data().attachments,
        edit: true,
        id: res.id,
      });
    });
    loader.unmount();
  }
}

function FormButton(disabled) {
  return `
    <button
      aria-label='완료'
      form='editor'
      type='submit'
      ${disabled && 'disabled'}
      class='btn-primary px-12 py-2 bg-primary rounded-full text-white font-medium'
    >
      완료
    </button>
  `;
}
