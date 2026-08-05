/* Auto language preference. Config: window.__SITE_I18N__ = { basepath, languages, defaultLang } */
(function () {
  try {
    var cfg = window.__SITE_I18N__ || {};
    var STORAGE = 'aegisite-lang';
    var basepath = cfg.basepath || '';
    var supported = cfg.languages || ['en', 'zh-cn'];
    var defaultLang = cfg.defaultLang || 'en';

    function stripBase(pathname) {
      if (basepath && pathname.indexOf(basepath) === 0) {
        pathname = pathname.slice(basepath.length) || '/';
      }
      return pathname || '/';
    }

    function withBase(path) {
      if (!path) path = '/';
      if (path.charAt(0) !== '/') path = '/' + path;
      return (basepath || '') + path;
    }

    function normalizePath(p) {
      if (!p) return '/';
      if (p.length > 1 && p.charAt(p.length - 1) === '/') p = p.slice(0, -1);
      return p || '/';
    }

    function langFromPath(pathname) {
      var p = stripBase(pathname);
      for (var i = 0; i < supported.length; i++) {
        var lang = supported[i];
        if (lang === defaultLang) continue;
        if (p === '/' + lang || p.indexOf('/' + lang + '/') === 0) return lang;
      }
      return defaultLang;
    }

    function pathWithoutLang(pathname) {
      var p = stripBase(pathname);
      for (var i = 0; i < supported.length; i++) {
        var lang = supported[i];
        if (lang === defaultLang) continue;
        if (p === '/' + lang) return '/';
        if (p.indexOf('/' + lang + '/') === 0) {
          p = p.slice(('/' + lang).length) || '/';
          if (p.charAt(0) !== '/') p = '/' + p;
          return p;
        }
      }
      return p;
    }

    // Map path across languages (changelog keeps slug).
    function mapToLang(pathname, targetLang) {
      var bare = pathWithoutLang(pathname);
      if (bare === '/index.html') bare = '/';

      if (targetLang === defaultLang) {
        return bare;
      }

      if (bare === '/') return '/' + targetLang + '/';

      if (
        bare === '/changelog' || bare.indexOf('/changelog/') === 0 ||
        bare === '/downloads' || bare.indexOf('/downloads/') === 0 ||
        bare === '/privacy-policy' || bare.indexOf('/privacy-policy/') === 0 ||
        bare === '/blog' || bare.indexOf('/blog/') === 0 ||
        bare === '/docs' || bare.indexOf('/docs/') === 0
      ) {
        return '/' + targetLang + (bare.charAt(0) === '/' ? bare : '/' + bare);
      }

      return '/' + targetLang + '/';
    }

    function changelogListPath(lang) {
      return lang === defaultLang ? '/changelog/' : '/' + lang + '/changelog/';
    }

    function detectBrowserLang() {
      var list = [];
      if (navigator.languages && navigator.languages.length) {
        list = navigator.languages;
      } else if (navigator.language) {
        list = [navigator.language];
      }
      for (var i = 0; i < list.length; i++) {
        var tag = String(list[i] || '').toLowerCase().replace(/_/g, '-');
        if (!tag) continue;
        if (tag === 'zh-cn' || tag === 'zh-hans' || tag === 'zh-sg' || tag.indexOf('zh-cn') === 0 || tag.indexOf('zh-hans') === 0) {
          if (supported.indexOf('zh-cn') !== -1) return 'zh-cn';
        }
        if (tag === 'zh' || tag.indexOf('zh-') === 0) {
          if (supported.indexOf('zh-cn') !== -1) return 'zh-cn';
        }
        if (tag === 'en' || tag.indexOf('en-') === 0) {
          if (supported.indexOf('en') !== -1) return 'en';
        }
        if (supported.indexOf(tag) !== -1) return tag;
      }
      return defaultLang;
    }

    var path = location.pathname || '/';
    var current = langFromPath(path);
    var stored = null;
    try { stored = localStorage.getItem(STORAGE); } catch (e) {}

    if (stored && supported.indexOf(stored) === -1) stored = null;

    if (!stored) {
      stored = detectBrowserLang();
      try { localStorage.setItem(STORAGE, stored); } catch (e) {}
    }

    if (stored && stored !== current) {
      var targetPath = mapToLang(path, stored);
      var target = withBase(targetPath);
      var pathN = normalizePath(path);
      var targetN = normalizePath(target);
      if (targetN !== pathN) {
        var bare = pathWithoutLang(path);
        var isChangelog = bare === '/changelog' || bare.indexOf('/changelog/') === 0;
        fetch(target, { method: 'HEAD', credentials: 'same-origin' })
          .then(function (res) {
            if (res && res.ok) {
              location.replace(target);
              return;
            }
            if (isChangelog) {
              var list = withBase(changelogListPath(stored));
              if (normalizePath(list) !== pathN) location.replace(list);
            }
          })
          .catch(function () {
            if (isChangelog || bare === '/' || bare === '/downloads' || bare.indexOf('/downloads/') === 0) {
              location.replace(target);
            }
          });
        return;
      }
    }

    try { localStorage.setItem(STORAGE, current); } catch (e) {}
  } catch (error) {}
})();
