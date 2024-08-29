// public/colorModeScript.js
(function() {
  var colorMode = localStorage.getItem('chakra-ui-color-mode');
  if (colorMode === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }
})();