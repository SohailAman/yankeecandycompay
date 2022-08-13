(function() {
  var version = 'latest';
  if (window.location.search && window.location.search.indexOf('fd-wo-version') !== -1) {
    var s = window.location.search.replace(/^.+fd-wo-version=/, '');
    s = s.split('&');
    if (s[0]) {
      version = s[0];
    }
  }

  var data = {},
    request = new XMLHttpRequest(),
    baseURL = 'https://web-order.flipdish.co/client/productionwlbuild/' + version + '/';
  request.open('GET', baseURL + 'asset-manifest.json', true);
  request.onerror = throwError;
  request.onload = loadData;
  request.send();
  function throwError() {
    console.log(request);
    throw new Error('Could not load Flipdish frontend');
  }
  function loadData() {
    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.responseText);
      createStyleTag('main.css');
      createScriptTag('main.js');
    } else throwError();
  }
  function assetPath(file) {
    if (!file in data) throwError();
    var fileUrl = data[file];
    return fileUrl.startsWith('https://') ? fileUrl : baseURL + fileUrl;
  }
  function createStyleTag(src) {
    var s = document.createElement('link');
    s.rel = 'stylesheet';
    s.href = assetPath(src);
    document.head.appendChild(s);
  }
  function createScriptTag(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = assetPath(src);
    document.head.appendChild(s);
  }
})();
