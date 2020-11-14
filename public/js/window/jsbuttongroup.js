class JSButtonGroup extends Component {
    constructor() {
        super('-', 'JSButtonGroup', $('<div class="js-button-group">'))
    }

    addButton(label = '', icon = '', onClick = undefined) {
        let $button = $('<button>');

        if(label !== '') {
            $button.append($('<p>').text(label));
        }

        if(icon !== '') {
            $button.append($('<img>').attr('src', `img/icons/${icon}.png`));
        }

        if(onClick !== undefined) {
            $button.click(onClick);
        }

        this.$element.append($button);
    }
}