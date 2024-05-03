import Component from '@components';

export default class Tabs extends Component {
  template() {
    const { items } = this.props;
    
    return `
      <ul class='flex border-b text-center text-14 font-medium cursor-pointer'>
        <li id=${items[0].id} class='w-full relative text-primary font-bold'>
          <a 
            href='?category=${items[0].id}' 
            aria-label='${items[0].label}' 
            class='block py-8'
          >
            ${items[0].label}
            <div class='line absolute w-full h-2 bg-primary -bottom-1' />
          </a>
        </li>
        <li id=${items[1].id} class='w-full relative'>
          <a 
            href='?category=${items[1].id}' 
            aria-label='${items[1].label}' 
            class='block py-8'
          >
            ${items[1].label}
            <div class='line absolute w-full h-2 -bottom-1' />
          </a>
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

  didMount() {
    const category = window.location.search.split('=')[1];
    this.setActiveStyle(category);
  }

  setEvent() {
    const { onClick } = this.props;

    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      const { target } = e;
      if (!target) return;
      const { parentNode } = target;
      const currentId =
        parentNode.nodeName === 'LI' ? parentNode.id : parentNode.parentNode.id;
      if (onClick) onClick(currentId);
    });
  }
}
