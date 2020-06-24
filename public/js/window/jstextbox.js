class JSTextBox extends Component {
  constructor(id) {
    super(id, 'JSTextBox', $(`<input type="text" class="jstextbox"/>`));
  }

  getTextBoxValue() {
    return this.$element.val();
  }

  onChange(func) {
    this.$element.on('keydown', func);
    this.$element.on('keyup', func);
  }
}