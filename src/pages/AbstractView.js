import Component from '@components';

export default class AbstractView extends Component {
  constructor($target, props, title = 'yummy') {
    super($target, props);
    document.title = title;
  }
}
