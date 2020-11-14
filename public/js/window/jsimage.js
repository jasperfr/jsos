class JSImage extends Component {
    constructor(id) {
      super(id, 'JSImage', $('<img class="jsimage">'));
      this.imageSrc = "";
      return this;
    }
  
    get image() {
      return this.imageSrc;
    }
  
    set image(src) {
      this.imageSrc = src;
      this.$element.attr('src', `img/${this.imageSrc}`);
    }
  }