// Validation
const form = document.querySelector("form");

const inputs = document.querySelectorAll("input, textarea");
const errorMessages = document.querySelectorAll(".error");
const required = [
  "firstname",
  "lastname",
  "phone",
  "email",
  "comment",
  "password",
  "password-confirm"
];
form.addEventListener("submit", validateForm);

function validateForm(e) {
  e.preventDefault();
  let data = {};
  let error = false;
  errorMessages.forEach(error => {
    error.classList.remove("show-err");
  });

  inputs.forEach(input => {
    let fieldName = input.getAttribute("name");
    if (fieldName !== null) {
      input.classList.remove("border-red");
      if (input.value.length == 0 && required.includes(fieldName)) {
        addError(input, "is required", fieldName);
        error = true;
      } else if (fieldName == "firstname" || fieldName == "lastname") {
        let checkForNumbers = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        let result = checkForNumbers.test(input.value);
        if (!result) {
          addError(input, "can't contain any numbers", fieldName);
          error = true;
        }
      } else if (fieldName == "phone") {
        let checkForNumbers = /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/;
        let result = checkForNumbers.test(input.value);
        if (!result) {
          addError(input, "is not valid", fieldName);
          error = true;
        } else if (input.value.length < 10 || input.value.length > 10) {
          addError(input, "number must be a 10 - digit number", fieldName);
          error = true;
        }
      } else if (fieldName == "email") {
        let checkValidEmail = /([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9]+)\w+/;
        let result = checkValidEmail.test(input.value);
        if (!result) {
          addError(input, "provided is not a valid e-mail address", fieldName);
          error = true;
        }
      }
      if (fieldName == "password") {
        let exp = /[A-Za-z0-9]+$/;
        let result = exp.test(input.value);
        if (!result) {
          addError(input, "can only contain numbers and letters", fieldName);
          error = true;
        }
        if (input.value.length < 3 && input.value.length > 9) {
          addError(input, "needs to be between 3-8 characters", fieldName);
          error = true;
        }
        if ((fieldName == "password") != "password-confirm") {
          let exp = /[A-Za-z0-9]+$/;
          let result = exp.test(input.value);
          if (!result) {
            addError(input, "can only contain numbers and letters", fieldName);
            error = true;
          }
          if (!(input.value.length > 3 && input.value.length < 9)) {
            addError(input, "needs to be between 3-8 characters", fieldName);
            error = true;
          }
        }
      }

      data[fieldName] = input.value;
    }
  });
  if (!error) {
    form.remove();
    window.location = "/success";
  }
}
function addError(input, msg, fieldName) {
  let tempError = input.nextElementSibling;
  tempError.textContent = fieldName.toLowerCase() + " " + msg;
  tempError.classList.add("show-err");
  input.classList.add("border-red");
  input.classList.add("animated", "rubberBand");
}
