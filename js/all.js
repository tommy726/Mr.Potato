// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();

// activateTab
function activateTab(tabId) {
  let tabPane = document.getElementById(tabId);
  const activeTabButton = document.querySelector('.list-group-item.active');

  activeTabButton.classList.remove('active');
  document.getElementById(activeTabButton.getAttribute('href').substring(1)).classList.remove('show', 'active');

  let newTabButton = document.querySelector('[aria-controls="' + tabId + '"]');
  newTabButton.classList.add('active');
  tabPane.classList.add('show', 'active');

  history.pushState({}, "", '#' + tabId);

  window.addEventListener("load", function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 0);
  });
};

//change img
const bigImage = document.querySelector('.bigImage');
const smallImages = document.querySelectorAll('.smallImage');

smallImages.forEach(smallImage => {
  smallImage.addEventListener('click', () => {
    const smallImageSrc = smallImage.getAttribute('src');
    const bigImageSrc = bigImage.getAttribute('src');
    bigImage.setAttribute('src', smallImageSrc);
    smallImage.setAttribute('src', bigImageSrc);
  });
});
