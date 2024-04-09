/* eslint-disable no-param-reassign */
import Component from '@components';

export default class RangeSlider extends Component {
  $progress;
  $rangeInput;

  constructor($target, props) {
    super($target, props);
    this.$progress = this.$target.querySelector('.slider .progress');
    this.$rangeInput = this.$target.querySelectorAll('.range-input input');
  }

  template() {
    const { minVal, maxVal } = this.props;

    return `
      <p id='range-value' class='mb-4 flex text-14'>
        <span id='min-value' class='inline-flex items-center'>
          방문 전
        </span>
        &nbsp;~&nbsp;
        <span id='max-value' class='inline-flex items-center'>
          <i class='ph-fill ph-star mr-2'></i>5
        </span>
      </p>
      <div class='px-2 py-12'>
        <div class='slider'>
          <div class='progress'></div>
        </div>
        <div class='range-input'>
          <input type='range' class='range-min' min='0' max='5' value=${minVal} />
          <input type='range' class='range-max' min='0' max='5' value=${maxVal} />
        </div>
      </div>

    `;
  }

  setEvent() {
    const { $progress, $rangeInput } = this;
    if (!$rangeInput || !$progress) return;

    this.addEvent('input', 'input', (e) => {
      const { minVal, maxVal } = this.props;
      const {
        target: { className, value },
      } = e;

      if (className === 'range-min' && maxVal < value) {
        e.target.value = maxVal;
        return;
      }
      if (className === 'range-max' && minVal > value) {
        e.target.value = minVal;
        return;
      }

      if (className === 'range-min') {
        this.setStyle(value, maxVal);
        return;
      }
      this.setStyle(minVal, value);
    });

    this.addEvent('change', 'input', (e) => {
      const { onRangeChange } = this.props;
      const target =
        e.target.className === 'range-min' ? 'minScore' : 'maxScore';
      onRangeChange(target, Number(e.target.value));
    });
  }

  setStyle(minVal, maxVal) {
    const { $progress, $rangeInput } = this;
    $progress.style.left = `${(minVal / $rangeInput[0].max) * 100}%`;
    $progress.style.right = `${100 - (maxVal / $rangeInput[1].max) * 100}%`;
    const [idx1, idx2] = minVal + maxVal === 10 ? [2, 1] : [1, 2];
    $rangeInput[0].style.zIndex = idx1;
    $rangeInput[1].style.zIndex = idx2;
  }

  setValueText(element, value) {
    if (!element) return;
    if (value === 0) {
      element.innerHTML = '방문 전';
      return;
    }
    element.innerHTML = `<i class='ph-fill ph-star mr-2'></i>${value}`;
  }

  didMount() {
    this.$progress = this.$target.querySelector('.slider .progress');
    this.$rangeInput = this.$target.querySelectorAll('.range-input input');
    const [minEl, maxEl] = this.$target.querySelectorAll('span');
    const { minVal, maxVal } = this.props;
    this.setStyle(minVal, maxVal);
    this.setValueText(minEl, minVal);
    this.setValueText(maxEl, maxVal);
  }
}
