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