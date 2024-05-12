import Component from '@components';

export default class AbstractView extends Component {
  constructor($target, props, title = 'Yummy') {
    super($target, props);
    document.title = title;
  }
}
