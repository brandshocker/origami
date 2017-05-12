Origami = {
    version: '1.0.0',
    debug: true,
    dev_info: 'Minimo Labs',
    api_address: 'http://localhost/origami/api/',
    api_key: 'dCscSDGL390xlxvcv93rxcvDvc90cv7cv98x8cxvkvjkdsjv898syfdKJHdvkdkfk',
    validate: function (key) {
        if (key == this.api_key) {
            return true;
        } else {
            return false;
        }
    },
    update_version: function (i) {
        version = i;
    }
}

Content = {
    show: function (address) {
        s('main-container').transition = '0.3s';
        s('content').transition = '0.3s';
        s('main-container').left = '-30%';
        s('content').left = '0%';
        s('content').boxShadow = '0px 0px 20px 0px rgba(0,0,0,0.6)';
        Navigation.enable = false;
    },
    hide: function () {
        s('main-container').transition = '0.3s';
        s('content').transition = '0.3s';
        s('main-container').left = '0%';
        s('content').left = '100%';
        Navigation.enable = true;
    }
}

data = function (id) {
    return o(id).dataset;
}; // function data 


load = function (obj) {
    var url = obj['url'];
    var loaded = obj['loaded'];
    var data = obj['data'];
    var type = obj['type'];

    if (data == undefined) {
        data = "";
    } else {
        data = "?" + data;
    }

    if (type == undefined) {
        type = 'GET';
    }

    var xObj = new XMLHttpRequest();
    xObj.open(type, url + data, true);
    xObj.onreadystatechange = function () {
        if (xObj.readyState == 4 && xObj.status == 200) {
            loaded(xObj.responseText);
        } else {
            var error = obj['error'];
            if (typeof error === 'function') {
                error();
            }
        }
    };
    xObj.send(null);
}; // function load

log = function (i) {
    if (Origami.debug) console.log(i);
} // log

Navigation = {
    maxWidth: 100,
    target: 'navigation',
    tolerance: 30,
    animation: '0.3s',
    state: 'closed',
    started: false,
    enable: true,
    create: function (par) {
        this.maxWidth = par.maxWidth;
        this.target = par.target;
        this.animation = par.animation;
    },
    open: function () {
        if (this.enable) {
            s(Navigation.target).transition = Navigation.animation;
            s(Navigation.target).left = '0px';
            s(Navigation.target).boxShadow = '0px 0px 20px 0px rgba(0,0,0,0.6)';
            s('main-container').left = (Navigation.maxWidth) / 2 + 'px';
            s('main-blocker').visibility = 'visible';
            o('main-blocker').addEventListener('click', function () {
                Navigation.close();
            });
            s('main-blocker').transition = Navigation.animation;
            s('main-blocker').opacity = '0.6';
            this.state = 'open';
        }
    },
    close: function () {
        o('main-blocker').removeEventListener('click', false);
        s(Navigation.target).left = -Navigation.maxWidth + 'px';
        s(Navigation.target).boxShadow = '0px 0px 20px 0px rgba(0,0,0,0)';
        s('main-container').left = '0px';
        s('main-blocker').opacity = '0';
        s('main-blocker').visibility = 'hidden';
        this.state = 'closed';
        Navigation.started = false;
    },
    touchStart: function (e) {
        Navigation.xStart = e.touches[0].clientX;
        Navigation.diff = Navigation.xStart;
        s(Navigation.target).transition = '0s';
        s('main-container').transition = '0s';
        s('main-blocker').transition = '0s';
        log(Navigation.state)
    },
    touchMove: function (e) {
        Navigation.diff = e.touches[0].clientX;
        if (Navigation.state == 'closed') {
            if (Navigation.enable) {
                if (Navigation.xStart > Navigation.tolerance) return false;
                Navigation.started = true;
                s(Navigation.target).boxShadow = '0px 0px 20px 0px rgba(0,0,0,0.6)';
                Navigation.pos = (e.touches[0].clientX - Navigation.xStart) - Navigation.maxWidth;
                if (Navigation.pos > 0) Navigation.pos = 0;
                if (Navigation.pos < -Navigation.maxWidth) Navigation.pos = -Navigation.maxWidth;
                s(Navigation.target).left = Navigation.pos + "px";
                s('main-container').left = (Navigation.pos + Navigation.maxWidth) / 2 + 'px';
                s('main-blocker').visibility = 'visible';
                s('main-blocker').opacity = (1 - (-Navigation.pos / Navigation.maxWidth)) * 0.6;
            }
        } else {
            if (Navigation.xStart < Navigation.maxWidth) return false;
            Navigation.pos = (e.touches[0].clientX - Navigation.maxWidth);
            if (Navigation.pos > 0) Navigation.pos = 0;
            if (Navigation.pos < -Navigation.maxWidth) Navigation.pos = -Navigation.maxWidth;
            s(Navigation.target).left = Navigation.pos + "px";
            s('main-container').left = (Navigation.pos + Navigation.maxWidth) / 2 + 'px';
            s('main-blocker').opacity = (1 - (-Navigation.pos / Navigation.maxWidth)) * 0.6;
        }

    },
    touchEnd: function (e) {
        s(Navigation.target).transition = Navigation.animation;
        s('main-container').transition = Navigation.animation;
        s(Navigation.target).transition = Navigation.animation;
        s('main-blocker').transtion = Navigation.animation;

        if (parseInt(s(Navigation.target).left, 10) > -(Navigation.maxWidth * 0.6)) {
            Navigation.open();
        } else {

            Navigation.close();

        }
        Navigation.started = false;
    },
    run: function () {
        window.addEventListener('touchstart', Navigation.touchStart);
        window.addEventListener('touchmove', Navigation.touchMove);
        window.addEventListener('touchend', Navigation.touchEnd);
    }
}

o = function (id) {
    return document.getElementById(id);
}

s = function (id) {
    return o(id).style;
}
///////////////////////////////////////////// SANDBOX //////////////////

Swiper = function () {
    this.init = function () {
        log(data(['main-container']).page);
    }();
}; // function Swiper 

var page = new Swiper();
