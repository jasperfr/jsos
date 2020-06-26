class JSTextArea extends Component {
  constructor(id) {
    super(id, 'JSTextArea', $(`<textarea class="jstextarea"/>`));
    this.textValue = "";
  }

  get text() {
    this.textValue = this.$element.val();
    return this.textValue;
  }

  set text(text) {
    this.textValue = text;
    this.$element.val(this.textValue);
  }

  getText() {
    return this.$element.val();
  }

  onChange(func) {
    this.$element.on('keydown', func);
    this.$element.on('keyup', func);
  }
}