class JSTextArea extends Component {
  constructor(id) {
    super(id, 'JSTextArea', $(`<textarea class="jstextbox"/>`));
  }

  getText() {
    return this.$element.val();
  }

  onChange(func) {
    this.$element.on('keydown', func);
    this.$element.on('keyup', func);
  }
}