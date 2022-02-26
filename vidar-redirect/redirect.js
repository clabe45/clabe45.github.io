window.addEventListener('load', function () {
  const page = window.location.toString().substring(
    'https://calebsacks.me/vidar/'.length
  );

  window.location.replace(`https://etrojs.dev/${page}`);
});
