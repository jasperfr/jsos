var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Get a folder from the server
function getFolder(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, $.get("http://localhost:1337/directory?path=" + path)
                    .then(function (data) {
                    var files = [];
                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                        var obj = data_1[_i];
                        files.push(new XFile(obj.name, obj.path, obj.type, obj.icon));
                    }
                    return files;
                })];
        });
    });
}
// Get a file from the server
function getFile(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, $.get("http://localhost:1337/file?path=" + path)
                    .then(function (data) {
                    return atob(data);
                })];
        });
    });
}

var XFile = /** @class */ (function () {
    function XFile(name, path, type, icon) {
        this.name = name;
        this.path = path;
        this.type = type;
        this.icon = icon;
    }
    return XFile;
}());

$(function () {
    var frame = new XFrame({
        'title': 'Explorer',
        'icon': 'explorer',
        'size': [320, 240]
    });
    var pathLabel = new XLabel("My Computer");
    frame.add(pathLabel);
    var panel = new XPanel();
    frame.add(panel);
    pathLabel.css({
        'border': '1px inset #828282',
        'background-color': 'white',
        'margin': '2px',
        'padding': '2px',
        'position': 'absolute',
        'left': '0',
        'right': '0',
        'top': '0',
        'height': '20px',
        'box-sizing': 'border-box',
        'user-select': 'none'
    });
    panel.css({
        'border': '2px inset #C0C0C0',
        'background-color': 'white',
        'display': 'flex',
        'flex-wrap': 'wrap',
        'align-content': 'start',
        'overflow-y': 'scroll',
        'box-sizing': 'border-box',
        'position': 'absolute',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'top': '24px'
    });
    function run(item) {
        getFile(item.path).then(function (data) {
            eval(data);
        });
    }
    function runWithProgram(item) {
        console.log(item.path);
        console.log(item.type);
    }
    function navigate(directory) {
        pathLabel.text = directory.path;
        panel.clear();
        getFolder(directory.path).then(function (data) {
            if (directory.path != 'My Computer') {
                var topdirectory_1 = new XFile('..', directory.path.split('/').slice(0, -1).join('/'), 'folder');
                var xicon = new XIcon(topdirectory_1);
                xicon.on('dblclick', (function () { return navigate(topdirectory_1); }));
                panel.add(xicon);
            }
            var _loop_1 = function (subdirectory) {
                var xicon = new XIcon(subdirectory);
                xicon.on('dblclick', function () {
                    switch (subdirectory.type) {
                        case 'folder':
                            navigate(subdirectory);
                            break;
                        case 'shortcut':
                            navigate(subdirectory);
                            break;
                        case 'exe':
                            run(subdirectory);
                            break;
                        default:
                            runWithProgram(subdirectory);
                            break;
                    }
                });
                panel.add(xicon);
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var subdirectory = data_1[_i];
                _loop_1(subdirectory);
            }
            panel.refresh();
        });
    }
    ;
    getFolder('').then(function (d) { return navigate(d[0]); });
    frame.start();
});

var XComponent = /** @class */ (function () {
    function XComponent(element) {
        this.components = [];
        this.$element = element;
    }
    XComponent.prototype.css = function (data) {
        this.$element.css(data);
    };
    XComponent.prototype.on = function (event, func) {
        this.$element.on(event, func);
    };
    XComponent.prototype.add = function (component) {
        this.components.push(component);
    };
    XComponent.prototype.clear = function () {
        this.components = [];
    };
    XComponent.prototype.refresh = function () {
        this.$element.empty();
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            this.$element.append(component.start());
        }
    };
    XComponent.prototype.start = function () {
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            this.$element.append(component.start());
        }
        return this.$element;
    };
    return XComponent;
}());

var XFrame = /** @class */ (function () {
    function XFrame(data) {
        if (!data)
            data = {};
        this._title = data.title || 'New XFrame';
        this.width = data.size != undefined ? data.size[0] : 640;
        this.height = data.size != undefined ? data.size[1] : 480;
        this.resizable = data.resizable || true;
        this.icon = data.icon || 'exe';
        this.menubar = data.menubar || true;
        this.statusbar = data.statusbar || false;
        this.taskbarButtons = data.taskbarButtons || ['minimize', 'resize', 'close'];
        this.$window = undefined;
        this.components = [];
        return this;
    }
    Object.defineProperty(XFrame.prototype, "title", {
        get: function () { return this._title; },
        set: function (title) {
            this._title = title;
            if (this.$window) {
                this.$window.find('.titlebar h1').text(this.title);
            }
        },
        enumerable: false,
        configurable: true
    });
    ;
    XFrame.prototype.hide = function () {
        this.$window.hide();
    };
    XFrame.prototype.maximize = function () {
        this.$window.removeClass('hidden');
        this.$window.toggleClass('full-screen');
    };
    XFrame.prototype.close = function () {
        this.$window.remove();
    };
    XFrame.prototype.add = function (component) {
        this.components.push(component);
    };
    XFrame.prototype.start = function () {
        var _this = this;
        var self = this;
        // ----------------------------------------------------------------------------------------------
        // Create the wndow wrapper
        this.$window = $("<div class=\"xframe\" style=\"width:" + this.width + "px;\">");
        // ----------------------------------------------------------------------------------------------
        // Create the title bar
        var $titlebar = $("<div class=\"titlebar\">");
        $titlebar.append($("<img src=\"img/types/16/" + this.icon + ".png\">"));
        $titlebar.append($("<h1>" + this.title + "</h1>"));
        if (this.taskbarButtons.indexOf('minimize') != -1) {
            var $minimize = $('<p class="button minimize"></p>');
            $minimize.on('click', function () { return self.hide(); });
            $titlebar.append($minimize);
        }
        if (this.taskbarButtons.indexOf('resize') != -1) {
            var $resize = $('<p class="button maximize"></p>');
            $resize.on('click', function () { return self.maximize(); });
            $titlebar.append($resize);
        }
        if (this.taskbarButtons.indexOf('close') != -1) {
            var $close = $('<p class="button close"></p>');
            $close.on('click', function () { return self.close(); });
            $titlebar.append($close);
        }
        this.$window.append($titlebar);
        // ----------------------------------------------------------------------------------------------
        // Create the content box
        var $content = $("<div class=\"content\" style=\" height:" + this.height + "px; position:relative;\">");
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            $content.append(component.start());
        }
        this.$window.append($content);
        // ----------------------------------------------------------------------------------------------
        // Create the status bar
        // ----------------------------------------------------------------------------------------------
        // Event listeners
        this.$window.draggable({
            containment: 'parent',
            handle: '.titlebar h1',
            'stack': '.xframe'
        });
        if (this.resizable) {
            this.$window.resizable({
                containment: 'parent',
                handles: 'nw, ne, sw, se'
            });
        }
        this.$window.on('mousedown', function () {
            $('.window').removeClass('focused');
            $(this).addClass('focused');
            $(this).css('z-index', 1000);
            this.focus();
        });
        this.$window.css({
            'left': $('.window').length * 16 + "px",
            'top': $('.window').length * 16 + "px",
        });
        $(function () { return $(document.body).append(_this.$window); });
    };
    return XFrame;
}());

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var XIcon = /** @class */ (function (_super) {
    __extends(XIcon, _super);
    function XIcon(file) {
        return _super.call(this, $("\n        <div class=\"xicon\">\n            <img src=\"img/types/32/" + (file.icon ? file.icon : file.type) + ".png\">\n            <img src=\"img/types/32/" + (file.type == 'shortcut' ? 'shortcut' : 'none') + ".png\" style=\"position:absolute;\">\n            <span>" + file.name + "</span>\n        </div>")) || this;
    }
    return XIcon;
}(XComponent));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var XLabel = /** @class */ (function (_super) {
    __extends(XLabel, _super);
    function XLabel(text) {
        if (text === void 0) { text = "New XLabel"; }
        var _this = _super.call(this, $("<span class=\"jslabel\"></span>")) || this;
        _this._text = "New XLabel";
        _this.text = text;
        return _this;
    }
    Object.defineProperty(XLabel.prototype, "text", {
        get: function () { return this._text; },
        set: function (text) {
            this._text = text;
            this.$element.html(this._text);
        },
        enumerable: false,
        configurable: true
    });
    return XLabel;
}(XComponent));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var XPanel = /** @class */ (function (_super) {
    __extends(XPanel, _super);
    function XPanel() {
        return _super.call(this, $("<div class=\"xpanel\"></div>")) || this;
    }
    return XPanel;
}(XComponent));
