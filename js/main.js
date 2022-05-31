/* global data */

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
  var currentEntry = {
    title: $entryTitle.value,
    photoUrl: $photoUrl.value,
    notes: $entryNotes.value,
    entryId: data.nextEntryId
  };

  data.entries.push(currentEntry);
  data.nextEntryId++;

  $formImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  data.view = 'entries';
  updateView(data.view);
  loadEntries();
}

function renderEntry(entry) {
  //  <li>
  //    <div class="row">
  //      <div class="column-half">
  //        <img>
  //      </div>
  //      <div class="column-half">
  //        <h2></h2>
  //        <p></p>
  //      </div>
  //    </div>
  //  </li>

  var $listItem = document.createElement('li');
  var $row = document.createElement('div');
  $row.className = 'row';
  $listItem.appendChild($row);
  var $imgCol = document.createElement('div');
  $imgCol.className = 'column-half';
  $row.appendChild($imgCol);
  var $image = document.createElement('img');
  $imgCol.appendChild($image);
  var $textCol = document.createElement('div');
  $textCol.className = 'column-half';
  $row.appendChild($textCol);
  var $entryHeader = document.createElement('h2');
  var $entryText = document.createElement('p');
  $textCol.appendChild($entryHeader);
  $textCol.appendChild($entryText);

  $image.setAttribute('src', entry.photoUrl);
  $entryHeader.textContent = entry.title;
  $entryText.textContent = entry.notes;

  return $listItem;
}

var $unorderedList = document.querySelector('.entryList');
window.addEventListener('DOMContentLoaded', loadEntries);

function loadEntries() {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
    $unorderedList.appendChild(newEntry);
  }
}

var $newEntryBtn = document.querySelector('.new-entry-a');
var $navbarLinks = document.querySelector('.navbar-link');
var $formContainer = document.querySelector('[data-view="entry-form"]');
var $entriesContainer = document.querySelector('[data-view="entries"]');

function updateView(view) {
  if (view === 'entry-form') {
    $formContainer.className = 'active';
    $entriesContainer.className = 'hidden';
  } else if (view === 'entries') {
    $formContainer.className = 'hidden';
    $entriesContainer.className = 'active';
  }
}

$newEntryBtn.addEventListener('click', function (event) {
  data.view = 'entry-form';
  updateView(data.view);
});

$navbarLinks.addEventListener('click', function (event) {
  if (event.target.textContent === 'Entries') {
    data.view = 'entries';
    updateView(data.view);
  }
});
