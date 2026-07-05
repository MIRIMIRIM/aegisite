var announcement = document.getElementById('announcement');

if (announcement !== null) {
  var globalAlertClosed = false;

  try {
    globalAlertClosed = localStorage.getItem('global-alert-dismissed') === 'closed';

    if (!globalAlertClosed) {
      globalAlertClosed = Object.keys(localStorage).some(function(key) {
        return /^global-alert-/.test(key) && localStorage.getItem(key) === 'closed';
      });
    }
  } catch (error) {}

  if (globalAlertClosed) {
    document.documentElement.setAttribute('data-global-alert', 'closed');
  }

  announcement.addEventListener('closed.bs.alert', () => {
    try {
      localStorage.setItem('global-alert-dismissed', 'closed');
    } catch (error) {}
    document.documentElement.setAttribute('data-global-alert', 'closed');
  });

}
