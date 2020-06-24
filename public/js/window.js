class Component {
    constructor($element, css={}) {
        this.cssRuleset = css;
        this.$element = $($element);
        this.x = 0;
        this.y = 0;
        this.css('position', 'absolute');
        return this;
    }

    css(attr, value) {
        this.cssRuleset[attr] = value;
        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    
    render() {
        throw new "Cannot implicitly call render() on abstract class Component."
    }
}

class WLabel extends Component {
    constructor(text="", css) {
        super(`<h1 class="wlabel">`, css);
        this.text = text;
        return this;
    }
    render() {
        this.$element.text(this.text);
        for(let cssRule in this.cssRuleset) { 
            this.$element.css(cssRule, this.cssRuleset[cssRule]);
        }
        this.$element.css('left', `${this.x}px`);
        this.$element.css('top',  `${this.y}px`);
        return this.$element;
    }
}

class Window {

    /** Creates a new window. */
    constructor() {
        this.$template = null;
        this.components = [];
        this.title = "Window";
        this.width = 640;
        this.height = 480;
        return this;
    }

    /** Sets the window title. */
    setTitle(title) {
        this.title = title;
        return this;
    }

    /** Sets the window size. */
    setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    /** Starts the window. */
    start() {
        // Compile the template.
        this.$template = $(`
        <div class="window" style="width:${this.width}px;">
            <div class="titlebar">
                <p class="button minimize"></p>
                <h1>${this.title}</h1>
                <p class="button expand"></p>
                <p class="button close"></p>
            </div>
            <div class="content" style=" height:${this.height}px; position:relative;">

            </div>
        </div>
        `);
        
        this.$template.draggable({'handle' : '.titlebar h1', 'stack' : '.window'});
        this.$template.resizable({handles: 'nw, ne, sw, se'});
        this.$template.on('mousedown', function() {
            $('.window').removeClass('focused');
            $(this).addClass('focused');
        });
        
        // Configure the close button.
        let self = this;
        this.$template.find('.minimize').click(function() {
            self.$template.toggleClass('hidden');
            self.$template.removeClass('full-screen');
        });

        this.$template.find('.close').click(function() {
            // self.$template.toggleClass('full-screen')
        });

        this.$template.find('.close').click(function() {
            self.$template.removeClass('hidden');
            self.$template.toggleClass('full-screen')
        });

        this.$template.find('.input').on('keyup', function(e) {
            if(e.keyCode == 13) {
                this.value = "";
            }
        });

        $(document.body).append(this.$template);
        this.invalidate();

        // might delete this later?
        return this.$template;
    }

    addComponent(component) {
        this.components.push(component);
    }

    invalidate() {
        let $content = this.$template.find('.content');
        $content.empty()
        for(let component of this.components) {
            $content.append(component.render());
        }
    }

}