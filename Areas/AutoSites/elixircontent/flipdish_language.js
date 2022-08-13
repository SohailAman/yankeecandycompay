function flipdishLanguageSet(language) {
    flipdish.setLanguage(language);
}

var flipdish = new function () {
    
    this.language;

    this.setLanguage = function setLanguage(lang) {

        if (getCookie("flipdish-language") === lang) {
            return;
        }

        setCookie("flipdish-language", lang);
        this.language = lang;
        if (window._flipdish) {
            window._flipdish.setLanguage(lang);
        }
        this.reloadPage();
    }

    this.getLanguage = function () {
        return this.language;
    }

    this.reloadPage = function () {

        location.params({
            l: this.language
        });
    }

    this.initialize = function (defaultLanguage) {
        var languageFromCookie = getCookie("flipdish-language");
        
        if (languageFromCookie) {
            this.language = languageFromCookie;
        }
        else {
            this.language = defaultLanguage;
            setCookie("flipdish-language", defaultLanguage);
        }

        if (this.language !== languageFromCookie) {
            this.reloadPage();
        }
    }

    location.params = function (params) {
        var obj = {}, i, parts, len, key, value;

        if (typeof params === 'string') {
            value = location.search.match(new RegExp('[?&]' + params + '=?([^&]*)[&#$]?'));
            return value ? value[1] : undefined;
        }

        var _params = location.search.substr(1).split('&');

        for (i = 0, len = _params.length; i < len; i++) {
            parts = _params[i].split('=');
            if (!parts[0]) { continue; }
            obj[parts[0]] = parts[1] || true;
        }

        if (typeof params !== 'object') { return obj; }

        for (key in params) {
            value = params[key];
            if (typeof value === 'undefined') {
                delete obj[key];
            } else {
                obj[key] = value;
            }
        }

        parts = [];
        for (key in obj) {
            parts.push(key + (obj[key] === true ? '' : '=' + obj[key]));
        }

        location.search = parts.join('&');
    };

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}