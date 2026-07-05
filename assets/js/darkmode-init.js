try {
  const localMode = localStorage.getItem('theme');
  const mode = localMode === 'dark' || localMode === 'light' ? localMode : 'auto';
  const globalDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = mode === 'dark' || (mode === 'auto' && globalDark);

  document.documentElement.setAttribute('data-theme-mode', mode);
  document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
  document.documentElement.toggleAttribute('data-dark-mode', dark);
} catch (error) {}
