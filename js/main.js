var $photoUrl = document.querySelector('#photo-url');
var $formImage = document.querySelector('.form-img');

$photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  if (event.target.value !== '') {
    $formImage.setAttribute('src', event.target.value);
  }
}
