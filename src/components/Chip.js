import Component from '@components';

// TYPE = SELECT | FILTER | ACTION | EXPLAIN

export default class Chip extends Component {
  constructor(
    $target,
    {
      type = 'filter',
      active = false,
      label = '',
      onClick = undefined,
      ...rest
    },
  ) {
    super($target, { type, active, label, onClick, ...rest });
  }

  template() {
    const { text, id, type, label, active } = this.props;

    const getChipStyle = () => {
      const minWidth = type === 'explain' ? 'min-w-98' : 'min-w-79';
      const cursor = ['explain', 'action'].includes(type)
        ? 'cursor-default'
        : 'cursor-pointer';
      const weight = active ? 'font-medium' : '';
      const common = `${minWidth} ${cursor} ${weight} w-fit text-14 text-center py-4 px-10 rounded-full border tracking-normal `;
      let className = common;

      switch (type) {
        case 'filter':
          className += active
            ? 'border-secondary text-secondary'
            : 'border-neutral-300';
          break;
        case 'explain':
        case 'filtered':
          className += 'bg-zinc-100 border-zinc-100 flex-center';
          break;
        default:
          className += active
            ? 'bg-secondary border-secondary text-white'
            : 'border-neutral-300';
      }
      return className;
    };

    return `
      <div id=${id} class='${getChipStyle()}'>
        ${type === 'explain' ? `<span class='text-zinc-400 font-medium'>${label}&nbsp;</span>` : ``}
        <span>${text}</span>
        ${type === 'filtered' ? `<i class='ph ph-x cursor-pointer text-15 pl-2'></i>` : ``}
      </div>
    `;
  }

  setEvent() {
    const { type, onClick } = this.props;
    if (type !== 'explain' && onClick) {
      const el = type === 'filtered' ? 'i' : 'div';
      this.addEvent('click', el, (e) => {
        const { id } = e.currentTarget.childNodes[1];
        onClick(id);
      });
    }
  }
}
