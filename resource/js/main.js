(function() {
  var checkInput = document.getElementById('isCheck');
  var formInput = document.getElementById('formInput');
  var formBtn = document.getElementById('formBtn');

  checkInput.onchange = function() {
    checkStatus();
  }

  function checkStatus() {
    if (!checkInput.checked) {
      clearInterval(window.task);
      formInput.setAttribute('disabled', 'disabled');
      formBtn.setAttribute('disabled', 'disabled');
    } else {
      formInput.removeAttribute('disabled');
      formBtn.removeAttribute('disabled');
    }
  }
  checkStatus();
})()
