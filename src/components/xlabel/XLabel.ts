class XLabel extends XComponent {
    private _text: string = "New XLabel"
    get text() { return this._text }
    set text(text: string) {
        this._text = text
        this.$element.html(this._text)
    }

    constructor(text: string = "New XLabel") {
        super($(`<span class="jslabel"></span>`))
        this.text = text
    }
}