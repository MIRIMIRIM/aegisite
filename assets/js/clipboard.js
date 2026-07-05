;Array.prototype.forEach.call(document.getElementsByTagName('pre'), function(pre) {
  var mermaid = pre.getElementsByClassName('language-mermaid')[0];

  if (mermaid == null) {
    pre.insertAdjacentHTML('afterbegin', '<button class="btn btn-copy"></button>');
  }
});

document.addEventListener('click', function(event) {
  var button = event.target.closest('.btn-copy');

  if (button === null) {
    return;
  }

  var code = button.nextElementSibling;

  if (code === null) {
    return;
  }

  copyText(code.textContent);
});

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(function() {
      copyTextFallback(text);
    });
    return;
  }

  copyTextFallback(text);
}

function copyTextFallback(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
  } catch (error) {}

  document.body.removeChild(textarea);
}
;
