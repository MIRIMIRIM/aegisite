try {
  var globalAlertClosed = localStorage.getItem('global-alert-dismissed') === 'closed';

  if (!globalAlertClosed) {
    globalAlertClosed = Object.keys(localStorage).some(function(key) {
      return /^global-alert-/.test(key) && localStorage.getItem(key) === 'closed';
    });
  }

  if (globalAlertClosed) {
    document.documentElement.setAttribute('data-global-alert', 'closed');
  }
} catch (error) {}
