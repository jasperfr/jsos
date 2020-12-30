class XTextArea extends XComponent {
    private _text: string = ""
    get text() { return this._text }
    set text(text: string) {
        this._text = text
        this.$element.val(this._text)
    }

    constructor(text: string = "") {
        super($(`<textarea class="x-textarea"></textarea>`))
        this.text = text
    }
}