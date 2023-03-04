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


// check password
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.querySelector('.needs-validation');

function passwordDifferent() {
  password.classList.remove('is-valid');
  confirmPassword.classList.remove('is-valid');
  password.classList.add('is-invalid');
  confirmPassword.classList.add('is-invalid');
  form.classList.remove('was-validated');
};

function passwordCheck() {
  password.classList.remove('is-invalid');
  confirmPassword.classList.remove('is-invalid');
  password.classList.add('is-valid');
  confirmPassword.classList.add('is-valid');
};

password.addEventListener('input', function () {
  if (password.value !== confirmPassword.value) {
    passwordDifferent();
  } else {
    passwordCheck();
  }
});

confirmPassword.addEventListener('input', function () {
  if (password.value !== confirmPassword.value) {
    passwordDifferent();
  } else {
    passwordCheck();
  }
});

form.addEventListener('submit', function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  };

  if (password.value !== confirmPassword.value) {
    passwordDifferent();
    event.preventDefault();
    event.stopPropagation();
  } else {
    passwordCheck();
    form.classList.add('was-validated');
  };
}, false);

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