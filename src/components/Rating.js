import Component from '@components';

export default class Rating extends Component {
  template() {
    const { value } = this.props;
    return `
    <div id='rating-container' class='w-fit m-auto relative'>
      <div
        id='back-star'
        class='flex-center text-36 text-neutral-200 gap-4'
      >
        ${[1, 2, 3, 4, 5].map((i) =>
          `<i data-value=${i} class="ph-fill ph-star"></i>`).join('')}
      </div>
      <div
        id='color-star' 
        class='w-0 flex gap-4 text-36 absolute top-0 
        overflow-hidden active'
      >
        ${[1, 2, 3, 4, 5].map((i) =>
          `<i data-value=${i} class="ph-fill ph-star"></i>`).join('')}
      </div>
      <p class='text-12 text-neutral-300 text-center pt-4'>
        ${value === 0 ? '아직 방문 전이에요' : `${value}점`}
      </p>
    </div>
    `;
  }

  setEvent() {
    const { value: prev, readonly, onChangeRating } = this.props;
    if (!readonly)
      this.addEvent('click', 'i', (e) => {
        const { target } = e;
        const { value } = target.dataset;
        if (prev === value) {
          onChangeRating(0);
          return;
        }
        onChangeRating(value);
      });
  }

  didMount() {
    const colorStar = this.$target.querySelector('#color-star');
    const { readonly, value } = this.props;
    colorStar.style.width = `${value * 20}%`;
    const valueText = this.$target.querySelector('p');
    if (readonly) {
      valueText.style.cssText = 'display: none';
      return;
    }
    if (value > 0) {
      valueText.classList.replace('text-neutral-300', 'text-neutral-500');
    }
  }
}
