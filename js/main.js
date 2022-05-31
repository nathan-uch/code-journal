var $form = document.forms[0];
var $photoUrl = document.querySelector('#photo-url');
var $formImage = document.querySelector('.form-img');

$photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  if (event.target.value !== '') {
    $formImage.setAttribute('src', event.target.value);
  }
}

var $entryTitle = document.querySelector('#title');
var $entryNotes = document.querySelector('#notes');

$form.addEventListener('submit', saveEntryInfo);

function saveEntryInfo(event) {
  var currentEntry = {};
  currentEntry.title = $entryTitle.value;
  currentEntry.photoUrl = $photoUrl.value;
  currentEntry.notes = $entryNotes.value;
  currentEntry.id = data.nextEntryId;

  data.nextEntryId++;
  data.entries.push(currentEntry);

  $formImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

}
