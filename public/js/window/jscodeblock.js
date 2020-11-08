class JSCodeBlock extends Component {
  constructor(id) {
    super(id, 'JSCodeBlock', $(`<div class="js-code-block">
      <div class="text-area" contenteditable="true"></div>
      <div class="text-output"></div>
    </div>`));
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

  start() {
    let self = this;
    this.$element.find('.text-area').on('keyup keydown', function(){
      self.refresh();
    });

    var target = this.$element.find(".text-output");
    this.$element.find(".text-area").scroll(function () {
        target.prop("scrollTop", this.scrollTop)
            .prop("scrollLeft", this.scrollLeft);
    });

    return this.$element;
  }

  refresh() {
    var classes = /JSFrame|JSPanel|TableLayout|JSMenuBar|JSMenu|JSButton|Component|JSTextArea|JSTextBox|JSTreeView|JSLabel|JSImage|console|window|\$/gi;
    var items = /[()[\]{}]/gi;
    var properties = /new|let|var|const|function/gi;
    var numerics = /[\d]+.?[\d]+/gi;
    var strings = /".*"|'.*'|`.*`/gi;
    
    let text = this.$element.find('.text-area').html();
    text = text
      .replace(strings, s => `<span class="string">${s}</span>`)
      .replace(items, s => `<span class="item">${s}</span>`)
      .replace(properties, s => `<span class="property">${s}</span>`)
      .replace(numerics, s => `<span class="numeric">${s}</span>`)
      .replace(classes, s => `<span class="class">${s}</span>`)
    this.$element.find('.text-output').html(text);
  }
}