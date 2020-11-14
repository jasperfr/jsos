class JSCanvas extends Component {
    constructor(width = 640, height = 480) {
        super(Date.now().toString(), 'JSCanvas', $(`<canvas width=${width} height=${height} class="jscanvas">`));
        this.context = this.$element[0].getContext('2d');
    }
}