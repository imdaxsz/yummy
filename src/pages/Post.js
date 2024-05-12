import Header from '@components/Header';
import Rating from '@components/Rating';
import Chip from '@components/Chip';
import { EVALUATION, EVALUATION_LABEL } from '@constants';
import ImageSlider from '@components/ImageSlider';
import PostHeader from '@components/Post/PostHeader';
import PostAction from '@components/Post/PostAction';
import LocationInfo from '@components/Post/LocationInfo';
import store from '@stores';
import Loader from '@components/Loader';
import { getPost } from '@apis/post';
import AbstractView from './AbstractView';

export default class Post extends AbstractView {
  constructor($target, props) {
    super($target, props, '맛집 | Yummy');
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
        email: '',
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
        <div id='post-header' class='flex justify-between gap-8'></div>
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
      email,
      createdAt,
      attachments,
      locationInfo,
      evaluation,
      likes,
    } = post;

    if (!post.createdAt) {
      await this.fetchData();
      return;
    }

    const isMine = store.state.user ? email === store.state.user.email : false;

    const $postHeader = this.$target.querySelector('#post-header');
    new PostHeader($postHeader, {
      id,
      name,
      categories,
      email,
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
    Object.keys(EVALUATION_LABEL).forEach((key) => {
      if (Object.keys(evaluation).includes(key)) {
        const el = document.createElement('div');
        $evaluation.appendChild(el);
        new Chip(el, {
          label: EVALUATION_LABEL[key],
          text: EVALUATION[key][evaluation[key] - 1].text,
          type: 'explain',
        });
      }
    });
  }

  async fetchData() {
    const id = window.location.pathname.split('/')[2];
    const loader = new Loader({});
    await getPost(id, true, this.setPost.bind(this));
    loader.unmount();
  }

  setPost(doc) {
    this.setState({ ...this.state, post: { id: doc.id, ...doc.data() } });
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
  }
}
