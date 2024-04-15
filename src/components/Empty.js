import Component from '@components';

export default class Empty extends Component {
  template() {
    const { message } = this.props;
    return `
      <div class='flex-center flex-col gap-6'>
        <i class='block ph ph-fork-knife text-[2.5rem] text-primary-30 opacity-30'></i>
        <p class='text-zinc-300'>${message}</p>
      </div>
    `;
  }

}
