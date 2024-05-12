import Header from '@components/Header';
import Tabs from '@components/Tabs';
import navigate from '@utils/navigate';
import store from '@stores';
import { getListItems } from '@apis/list';
import MyListHeader from '@components/Archive/MyListHeader';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@libs/firebase';
import { deleteAllPosts } from '@apis/post';
import LikesPreview from '@components/Archive/LikePreview';
import MyList from '@components/Archive/MyList';
import { getLikeItems } from '@apis/likes';
import Loader from '@components/Loader';
import AbstractView from './AbstractView';

export default class Archive extends AbstractView {
  constructor($target, props) {
    super($target, props, '보관함 | Yummy');
  }

  setup() {
    this.state = {
      tabs: [
        { id: 'my', label: '나의 맛집' },
        { id: 'likes', label: '좋아요' },
      ],
      isMyList: window.location.search.split('=')[1] === 'my',
      myList: null,
      likeList: null,
      likePosts: [],
      info: { title: '', email: '', likes: [], createdAt: '' },
    };
  }

  template() {
    const { isMyList } = this.state;
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-16 ct-pb'>
        <div id='tabs'></div>
        ${
          isMyList
            ? `<div id='list-header' class='pb-16'></div>
              <div id='my-list'></div>`
            : `<div id='like-list' class='mb-24'></div>
              <div id='like-posts'></div>`
        }
      </div>
    `;
  }

  async didMount() {
    const {
      tabs,
      isMyList,
      myList,
      likeList,
      likePosts,
      info: { title, likes, createdAt },
    } = this.state;

    const $header = this.$target.querySelector('#header');
    new Header($header, { left: 'prev', center: '보관함', right: 'menu' });

    const $tabs = this.$target.querySelector('#tabs');
    new Tabs($tabs, {
      items: tabs,
      onClick: (currentId) => this.onTabClick(currentId),
    });

    if (isMyList) {
      const $listHeader = this.$target.querySelector('#list-header');
      if (!createdAt) {
        await this.fetchMyListInfo();
        return;
      }
      new MyListHeader($listHeader, {
        title,
        likes,
        count: myList ? myList.length : 0,
        onClickDelete: () => deleteAllPosts(myList),
      });

      if (!myList) {
        await this.fetchMyListItems();
        return;
      }

      const $myList = this.$target.querySelector('#my-list');
      new MyList($myList, { items: myList });
      return;
    }

    // 북마크 리스트
    if (!likeList) {
      await this.fetchLikeItems();
      return;
    }

    const $likeList = this.$target.querySelector('#like-list');
    const $likePosts = this.$target.querySelector('#like-posts');
    new LikesPreview($likeList, { type: 'list', items: likeList });
    new LikesPreview($likePosts, { type: 'posts', items: likePosts });
  }

  async fetchMyListItems() {
    const loader = new Loader({});
    const res = await getListItems(store.state.user.uid);
    const myList = res.docs.map((item) => ({ id: item.id, ...item.data() }));
    this.setState({ ...this.state, myList });
    loader.unmount();
  }

  async fetchMyListInfo() {
    const docRef = doc(db, 'list', store.state.user.uid);
    onSnapshot(docRef, (item) => {
      this.setState({ ...this.state, info: { id: item.id, ...item.data() } });
    });
  }

  async fetchLikeItems() {
    const loader = new Loader({});
    await getLikeItems('list', (likeList) =>
      this.setState({ ...this.state, likeList }),
    );
    await getLikeItems('posts', (likePosts) =>
      this.setState({ ...this.state, likePosts }),
    );
    loader.unmount();
  }

  onTabClick(id) {
    navigate(`/archive?category=${id}`);
  }
}
