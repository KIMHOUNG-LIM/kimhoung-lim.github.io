/**
* PHP Email Form Validation - v3.9
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    let thisForm = e;
    
    // Fetch input elements
    let nameInput = thisForm.querySelector('#name-field');
    let emailInput = thisForm.querySelector('#email-field');
    let subjectInput = thisForm.querySelector('#subject-field');
    let messageInput = thisForm.querySelector('#message-field');

    // Validation helper
    function validateField(input, isValidCondition) {
      if (!input) return false;
      
      const val = input.value.trim();
      const isValid = isValidCondition(val);
      const isTouched = input.dataset.touched === 'true';

      if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else if (isTouched || (val.length > 0 && input.type !== 'email')) {
        // Show error state if user left the field (touched) or has typed invalid text
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      } else if (input.type === 'email' && val.length > 0) {
        // For email, show error during typing only if it includes key chars like '@' or '.' but is still invalid
        if (val.includes('@') && val.split('@')[1] && val.split('@')[1].includes('.')) {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-valid', 'is-invalid');
        }
      } else {
        input.classList.remove('is-valid', 'is-invalid');
      }
      return isValid;
    }

    // Validation conditions
    const nameCondition = val => val.length >= 2;
    const emailCondition = val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const subjectCondition = val => val.length >= 3;
    const messageCondition = val => val.length >= 10;

    // Attach live listeners for keystrokes (input) and focus-out (blur)
    [
      { el: nameInput, cond: nameCondition },
      { el: emailInput, cond: emailCondition },
      { el: subjectInput, cond: subjectCondition },
      { el: messageInput, cond: messageCondition }
    ].forEach(item => {
      if (item.el) {
        item.el.addEventListener('input', function() {
          validateField(this, item.cond);
        });
        item.el.addEventListener('blur', function() {
          this.dataset.touched = 'true';
          validateField(this, item.cond);
        });
      }
    });

    e.addEventListener('submit', function(event) {
      event.preventDefault();

      // Reset feedback messages
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');
      
      // Mark all as touched to trigger full validation visual feedback
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (input) {
          input.dataset.touched = 'true';
        }
      });

      // Run all validations
      let isNameValid = validateField(nameInput, nameCondition);
      let isEmailValid = validateField(emailInput, emailCondition);
      let isSubjectValid = validateField(subjectInput, subjectCondition);
      let isMessageValid = validateField(messageInput, messageCondition);

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        displayError(thisForm, 'Oh no! Please check the fields and try again. 🌸');
        return;
      }

      // Display cute loading state
      const loadingDiv = thisForm.querySelector('.loading');
      loadingDiv.innerHTML = 'Sending your message... 💌 🕊️';
      loadingDiv.classList.add('d-block');

      // Disable button
      const submitBtn = thisForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
      }

      // Simulate a network delay (1.8s) for a premium mockup experience
      setTimeout(() => {
        loadingDiv.classList.remove('d-block');
        
        // Display cute success message
        const successDiv = thisForm.querySelector('.sent-message');
        successDiv.innerHTML = 'Yay! Your message has been sent successfully! 🚀✨';
        successDiv.classList.add('d-block');

        // Enable button, remove validation classes and reset form
        if (submitBtn) {
          submitBtn.disabled = false;
        }
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
          if (input) {
            input.classList.remove('is-valid', 'is-invalid');
            delete input.dataset.touched;
          }
        });
        thisForm.reset();
      }, 1800);
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
