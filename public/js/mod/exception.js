const MessageBox = (function() {
    const icons = {
        ERROR: 'error',
        WARNING: 'warning',
    }    

    const options = {
        OK: 'ok',
        OKCancel: 'OKCancel',
        YesNo: 'yesno'
    };

    const show = function(dialogTitle, dialogMessage, dialogIcon, dialogOption) {
        let $messageBox = new JSFrame('jsos', Date.now().toString(), {
            disableMinimize: true,
            disableExpand: true
        });
        $messageBox.title = dialogTitle;
        $messageBox.setResizable(false);
        $messageBox.width = 400;
        $messageBox.height = 120;

        let $messageText = new JSLabel();
        let $messageImg = new JSImage();
        let $messageButtonGroup = new JSPanel();
        let _audio;

        $messageText.text = dialogMessage;

        switch(dialogIcon) {
            case 'warning':
                $messageImg.image = 'gui/warning.png';
                _audio = new Audio('audio/ding.wav');
                break;
            case 'error':
                $messageImg.image = 'gui/error.png';
                _audio = new Audio('audio/chord.wav');
                break;
            default:
                $messageImg.image = 'gui/warning.png';
                _audio = new Audio('audio/ding.wav');
                break;
        }

        switch(dialogOption) {
            case 'ok':
                let b0 = new JSButton();
                b0.text = "OK";
                $messageButtonGroup.add(b0);
                break;
            default:
                break;
        }

        $messageBox.css({
            'min-width': '128px',
            'width': 'initial'
        })

        $messageImg.css({
            position: 'absolute',
            left: '16px',
            top: '16px',
        });

        $messageText.css({
            position: 'absolute',
            left: '80px',
            top: '16px'
        })

        $messageButtonGroup.css({
            position: 'absolute',
            left: '0',
            right: '0',
            bottom: '32px',
            display: 'flex',
            'justify-content': 'center'
        });

        $messageBox.add($messageImg);
        $messageBox.add($messageText);
        $messageBox.add($messageButtonGroup);

        _audio.play();
        $messageBox.initialize(true);
    }

    return {
        icons: icons,
        options: options,
        show: show
    };
})();

const Exception = (function() {

    var $element, createElement, raise;

    raise = function(message = "") {
        let errorBox = new JSFrame('jsos', Date.now().toString(), {
            disableMinimize: true,
            disableExpand: true
        });
        errorBox.setResizable(false);
        errorBox.width = 400;
        errorBox.height = 200;

        let errorMessage = new JSLabel();
        let errorCode = new JSLabel();
        
        let okButton = new JSButton();
        let errorImg = new JSImage();
        var sndError = new Audio('audio/error.wav');

        errorImg.image = "gui/error.png";
        errorBox.title = "Error"
        errorMessage.text = "This program has performed an illegal operation and will be shut down.<br><br>If the problem persists, contact the program vendor.";
        errorCode.text = message;
        okButton.text = "Close"
        okButton.click = function() {
            errorBox.close();
        }

        errorCode.css({
            'position': 'absolute',
            'left': '8px',
            'right': '8px',
            'top': '96px',
            'bottom': '8px',
            'overflow-y': 'scroll',
            'font-family': 'Consolas',
            'border': '2px inset #828282'
        });

        errorMessage.css({
            'position': 'absolute',
            'left': '48px',
            'top': '8px',
            'width': '270px',
            'user-select': 'none'
        });

        errorImg.css({
            'position': 'absolute',
            'left': '8px',
            'top': '8px',
            'user-select': 'none'
        });

        okButton.css({
            'position': 'absolute',
            'right': '8px',
            'top': '8px',
            'width': '64px',
            'height': '20px'
        });

        errorBox.add(errorCode);
        errorBox.add(errorMessage);
        errorBox.add(okButton);
        errorBox.add(errorImg);

        sndError.play();
        errorBox.initialize(true);
    }

    return {
        raise: raise
    }

})();