class JSPanel extends Component {
  constructor(id) {
    super(id, 'JSPanel', $(`<div class="jspanel"></div>`));
    this.components = [];
    return this;
  }

  add(component) {
    this.components.push(component);
  }

  empty() {
    this.components = [];
  }

  refresh() {
    this.$element.empty();
    for(let component of this.components) {
      this.$element.append(component.start());
    }
  }

  start() {
    for(let component of this.components) {
      this.$element.append(component.start());
    }
    return this.$element;
  }
}