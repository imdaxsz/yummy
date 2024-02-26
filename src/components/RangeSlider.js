/* eslint-disable no-param-reassign */
import Component from '@components';

export default class RangeSlider extends Component {
  template() {
    return `
      <p id='range-value' class='mb-4 flex'>
        <span id='min-value' class='inline-flex items-center'>
          방문 전
        </span>
        &nbsp;~&nbsp;
        <span id='max-value' class='inline-flex items-center'>
          <i class="ph-fill ph-star mr-2"></i>5
        </span>
      </p>
      <div class='py-12'>
        <div class='slider'>
          <div class='progress'></div>
        </div>
        <div class='range-input'>
          <input type='range' class='range-min' min='0' max='5' value='0' />
          <input type='range' class='range-max' min='0' max='5' value='5' />
        </div>
      </div>

    `;
  }

  setEvent() {
    const rangeInput = this.$target.querySelectorAll('.range-input input');
    const progress = this.$target.querySelector('.slider .progress');
    const [minEl, maxEl] = this.$target.querySelectorAll('span');
    if (!rangeInput || !progress) return;

    this.addEvent('input', 'input', (e) => {
      let minVal = Number(rangeInput[0].value);
      let maxVal = Number(rangeInput[1].value);
      if (maxVal < minVal && e.target.className === 'range-min') {
        [rangeInput[0].value, minVal] = [maxVal, maxVal];
        return;
      } 
      if (maxVal < minVal && e.target.className === 'range-max') {
        [rangeInput[1].value, maxVal] = [minVal, minVal];
        return;
      } 

      progress.style.left = `${(minVal / rangeInput[0].max) * 100}%`;
      progress.style.right = `${100 - (maxVal / rangeInput[1].max) * 100}%`;
      const [idx1, idx2] = minVal + maxVal === 10 ? [2, 1] : [1, 2];
      rangeInput[0].style.zIndex = idx1;
      rangeInput[1].style.zIndex = idx2;

      this.setValueText(minEl, minVal);
      this.setValueText(maxEl, maxVal);
    });
  }

  setValueText(element, value) {
    if (!element) return;
    if (value === 0) {
      element.innerHTML = '방문 전';
      return;
    }
    element.innerHTML = `<i class="ph-fill ph-star mr-2"></i>${value}`;
  }
}
