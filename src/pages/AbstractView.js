import Component from "@components";

export default class AbstractView extends Component {
  setTitle(title) {
    document.title = title;
  }
}