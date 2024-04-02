import Header from '@components/Header';
import Rating from '@components/Rating';
import Chip from '@components/Chip';
import { EVALUATION, EVALUATION_LABEL } from '@constants';
import ImageSlider from '@components/ImageSlider';
import PostHeader from '@components/Post/PostHeader';
import PostAction from '@components/Post/PostAction';
import LocationInfo from '@components/Post/LocationInfo';
import store from '@stores';
import navigate from '@utils/navigate';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@libs/firebase';
import AbstractView from './AbstractView';

export default class Post extends AbstractView {
  constructor($target, props) {
    super($target, props, '맛집 | yummy');
  }

  setup() {
    this.state = {
      isMoreModalVisible: false,
      post: {
        id: '',
        name: '',
        categories: [],
        evaluation: {},
        ratingValue: 0,
        attachments: [],
        recommendMenu: '',
        memo: '',
        locationInfo: { id: '', address: '', placeName: '' },
        createdAt: '',
        username: '',
        likes: [],
      },
      isLiked: false,
    };
  }

  template() {
    const {
      post: { recommendMenu, memo },
    } = this.state;
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-18 pt-8 py-100 tracking-tight'>
        <div id='post-header' class='flex justify-between'></div>
        <div id='content' class='pt-40'>
          <div id='attachments'></div>
          <div id='rating' class='p-8 my-16'></div>
          <div id='evaluation' class='mb-48 text-14 flex flex-wrap gap-7'></div>
          ${
            recommendMenu
              ? `
                  <p class='text-secondary text-14 font-medium'>추천 메뉴</p>
                  <span>${recommendMenu}</span>
                `
              : ``
          }
          ${memo ? `<p class='mt-40'>${memo}</p>` : ``}
          <div id='location'></div>
          <div id='action' class='flex-center gap-12 text-24 text-zinc-500 pt-70 pb-40'></div>
        </div>
      </div>
    `;
  }

  async didMount() {
    const $header = this.$target.querySelector('#header');
    new Header($header, { left: 'prev', center: '', right: 'menu' });

    const { post, isLiked } = this.state;
    const {
      id,
      name,
      categories,
      username,
      createdAt,
      attachments,
      locationInfo,
      likes,
    } = post;

    if (!post.createdAt) {
      await this.fetchData();
      return;
    }

    const isMine = store.state.user
      ? username === store.state.user.email
      : false;

    const $postHeader = this.$target.querySelector('#post-header');
    new PostHeader($postHeader, {
      id,
      name,
      categories,
      username,
      createdAt,
      isMine,
      hasImage: attachments.length > 0,
    });

    const $action = this.$target.querySelector('#action');
    new PostAction($action, { id, likes, isLiked, isMine });

    const $location = this.$target.querySelector('#location');
    new LocationInfo($location, { locationInfo });

    const $rating = this.$target.querySelector('#rating');
    new Rating($rating, {
      value: post.ratingValue,
      readonly: true,
    });

    const $attachments = this.$target.querySelector('#attachments');
    if (attachments.length > 0)
      new ImageSlider($attachments, {
        imageUrl: attachments,
        readonly: true,
      });

    const $evaluation = this.$target.querySelector('#evaluation');
    Object.entries(EVALUATION_LABEL).forEach(([key, value]) => {
      const el = document.createElement('div');
      $evaluation.appendChild(el);
      new Chip(el, {
        label: value,
        text: EVALUATION[key][2].text,
        type: 'explain',
      });
    });
  }

  async fetchData() {
    const id = window.location.pathname.split('/')[2];
    const docRef = doc(db, 'posts', id);

    onSnapshot(docRef, (res) => {
      if (!res.exists()) {
        const to = sessionStorage.getItem('redirect');
        if (!to) alert('존재하지 않는 페이지예요!');
        else sessionStorage.removeItem('redirect');
        navigate(to || '/');
        return;
      }
      this.setState({ ...this.state, post: { id: res.id, ...res.data() } });
      if (store.state.user) {
        const {
          post: { likes },
        } = this.state;
        this.setState({
          ...this.state,
          isLiked: likes.includes(store.state.user.uid),
        });
      }
      document.title = `${this.state.post.name} | yummy`;
    });
  }
}
