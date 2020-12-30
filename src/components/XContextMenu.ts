// TODO make a submenu

type ContextMenuItems = Record<string, Function>

const XContextMenu = (function() {

    var $element, create, mouseInside, initialize, close;

    initialize = function() {
        $(document.body).on('mouseup', () => {
            if(!mouseInside && $element) {
                $element.remove();
                $element = undefined;
            }
        });
    }

    create = function(e: MouseEvent, data: ContextMenuItems) {
        let self = this;
        if($element !== undefined) return false;
        if(!$element) $element = $('<div class="x-contextmenu">').contextmenu(e => e.preventDefault())
        $element.hide();

        let $list = $('<ul>');
        data.forEach(obj => {
            switch(typeof obj) {
                case "object":
                let $el = $(`<li class="x-contextmenuitem ${obj.disabled?'disabled':''}">${obj.label}</li>`);
                $el.on('click', function() {
                    obj.click();
                    self.close();
                });
                $list.append($el);
                break;
                case "string":
                $list.append($('<li class="spacer"></li>'))
                break;
            }
        });

        $element.css('left', `${e.clientX}px`);
        $element.css('top', `${e.clientY}px`);
        $element.append($list);

        $(document.body).append($element);
        $element.slideToggle('fast');
        $element.on({
            mouseenter: function () {
                console.log(mouseInside);
                mouseInside = true;
            },
            mouseleave: function() {
                console.log(mouseInside);
                mouseInside = false;
            }
        });
    }

    close = function() {
        $element.remove();
        $element = undefined;
    }

    return {
        create: create,
        close: close,
        initialize: initialize
    }
    
})();

$(() => {
    XContextMenu.initialize();
});