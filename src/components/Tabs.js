import Component from '@components';

export default class Tabs extends Component {
  template() {
    const { items } = this.props;
    return `
      <ul class='flex border-b text-center text-14 font-medium cursor-pointer'>
        <li id=${items[0].id} class='w-full relative py-8 text-primary font-bold'>
          ${items[0].label}
          <div class='line absolute w-full h-2 bg-primary -bottom-1' />
        </li>
        <li id=${items[1].id} class='w-full relative py-8'>
          ${items[1].label}
          <div class='line absolute w-full h-2 -bottom-1' />
        </li>
      </ul>
    `;
  }

  setActiveStyle(currentId) {
    const els = this.$target.querySelectorAll('li');
    if (!els) return;
    els.forEach((el) => {
      if (currentId === el.id) {
        el.classList.add('text-primary');
        el.classList.add('font-bold');
        if (el.lastChild) el.lastChild.classList.add('bg-primary');
      } else {
        el.classList.remove('text-primary');
        el.classList.remove('font-bold');
        if (el.lastChild) el.lastChild.classList.remove('bg-primary');
      }
    });
  }

  setEvent() {
    const { onClick } = this.props;

    this.addEvent('click', 'li', (e) => {
      const { target } = e;
      if (!target) return;
      let currentId = target.id;
      if (target.nodeName === 'DIV') currentId = target.parentNode.id;
      this.setActiveStyle(currentId);
      if (onClick) onClick(currentId);
    });
  }

  didMount() {
    const category = window.location.search.split('=')[1];
    this.setActiveStyle(category);
  }
}
