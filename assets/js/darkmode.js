!function () {
  const modeButton = document.getElementById('mode');
  const modeLabel = document.querySelector('[data-theme-label]');
  const modeOptions = Array.prototype.slice.call(document.querySelectorAll('[data-theme-value]'));
  const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const modes = ['auto', 'dark', 'light'];
  const labels = {
    auto: 'Auto',
    dark: 'Dark',
    light: 'Light'
  };

  function readMode() {
    try {
      const stored = localStorage.getItem('theme');
      return modes.includes(stored) ? stored : 'auto';
    } catch (error) {
      return 'auto';
    }
  }

  function storeMode(mode) {
    try {
      if (mode === 'auto') {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', mode);
      }
    } catch (error) {}
  }

  function shouldUseDark(mode) {
    return mode === 'dark' || (mode === 'auto' && mediaQuery !== null && mediaQuery.matches);
  }

  function applyMode(mode) {
    const dark = shouldUseDark(mode);

    document.documentElement.setAttribute('data-theme-mode', mode);
    document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
    document.documentElement.toggleAttribute('data-dark-mode', dark);

    if (modeButton !== null) {
      const label = 'Theme: ' + labels[mode];
      modeButton.dataset.mode = mode;
      modeButton.setAttribute('aria-label', label);
      modeButton.setAttribute('title', label);
    }

    if (modeLabel !== null) {
      modeLabel.textContent = labels[mode];
    }

    modeOptions.forEach((option) => {
      const active = option.dataset.themeValue === mode;

      option.classList.toggle('current', active);
      if (active) {
        option.setAttribute('aria-current', 'true');
      } else {
        option.removeAttribute('aria-current');
      }
    });
  }

  if (mediaQuery !== null) {
    mediaQuery.addEventListener('change', () => {
      if (readMode() === 'auto') {
        applyMode('auto');
      }
    });
  }

  modeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const nextMode = option.dataset.themeValue;

      if (!modes.includes(nextMode)) {
        return;
      }
      storeMode(nextMode);
      applyMode(nextMode);
    });
  });

  applyMode(readMode());
}();
