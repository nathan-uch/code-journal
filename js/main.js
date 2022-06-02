/* global data */

var $form = document.forms[0];
var $photoUrl = document.querySelector('#photo-url');
var $formImage = document.querySelector('.form-img');
var $entryTitle = document.querySelector('#title');
var $entryNotes = document.querySelector('#notes');
var $unorderedList = document.querySelector('.entry-list');
var $newEntryBtn = document.querySelector('.new-entry-a');
var $navbarLinks = document.querySelector('.navbar-link');
var $formContainer = document.querySelector('[data-view="entry-form"]');
var $entriesContainer = document.querySelector('[data-view="entries"]');
var $formHeader = document.querySelector('.form-header');
var $deleteEntryBtn = document.querySelector('.delete-entry');
var $modal = document.querySelector('.modal-container');
var $cancelModal = document.querySelector('.cancel-modal');
var $confirmModal = document.querySelector('.confirm-modal');
var $searchBox = document.querySelector('#search-entries');

window.addEventListener('DOMContentLoaded', loadPreviousEntries);
$form.addEventListener('submit', saveEntryInfo);
$photoUrl.addEventListener('input', updatePhoto);
$unorderedList.addEventListener('click', findEditEntry);

$newEntryBtn.addEventListener('click', function (event) {
  $formHeader.textContent = 'New Entry';
  data.editing = null;
  $formImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  data.view = 'entry-form';
  updateDataView(data.view);
});

$navbarLinks.addEventListener('click', function (event) {
  if (event.target.textContent === 'Entries') {
    $deleteEntryBtn.className = 'delete-entry hidden';
    data.view = 'entries';
    updateDataView(data.view);
  }
});

$deleteEntryBtn.addEventListener('click', function () {
  $modal.className = 'modal-container';
});

$cancelModal.addEventListener('click', function () {
  $modal.className = 'modal-container hidden';
});

$confirmModal.addEventListener('click', function () {
  $modal.className = 'modal-container hidden';
  var $currentLi = document.querySelectorAll('.entry-item');
  for (var u = 0; u < data.entries.length; u++) {
    for (var e = 0; e < $currentLi.length; e++) {
      if (data.entries[u].entryId === data.editing.entryId && data.entries[u].entryId === +$currentLi[e].getAttribute('data-entry-id')) {
        $currentLi[e].remove();
        data.entries.splice(u, 1);
        data.view = 'entries';
        updateDataView(data.view);
      }
    }
  }
});

$searchBox.addEventListener('input', function (event) {
  var $currentTitles = document.querySelectorAll('.li-title');
  for (var y = 0; y < $currentTitles.length; y++) {
    if (event.target.value === '') {
      $currentTitles[y].closest('li').className = 'entry-item';
    }
    if ($currentTitles[y].textContent.search(event.target.value) === -1) {
      $currentTitles[y].closest('li').className = 'entry-item hidden';
    }
  }
});

function updatePhoto() {
  if ($photoUrl.value !== '') {
    $formImage.setAttribute('src', $photoUrl.value);
  }
}

function saveEntryInfo(event) {
  if (data.editing === null) {
    var currentEntry = {
      title: $entryTitle.value,
      photoUrl: $photoUrl.value,
      notes: $entryNotes.value,
      entryId: data.nextEntryId
    };
    data.entries.push(currentEntry);
    data.nextEntryId++;
    loadEntry(currentEntry);
  } else {
    data.editing.title = $entryTitle.value;
    data.editing.photoUrl = $photoUrl.value;
    data.editing.notes = $entryNotes.value;
    var $currentLi = document.querySelectorAll('.entry-item');
    for (var y = 0; y < $currentLi.length; y++) {
      if (data.editing.entryId === +$currentLi[y].getAttribute('data-entry-id')) {
        $currentLi[y].replaceWith(renderEntry(data.editing));
      }
    }
  }
  $form.reset();
  data.view = 'entries';
  updateDataView(data.view);
}

function renderEntry(entry) {
  //  <li class="entry-item" data-entry-id="entryId">
  //    <div class="row">
  //      <div class="column-half">
  //        <img>
  //      </div>
  //      <div class="column-half">
  //        <h2 class="li-title"></h2>
  //        <a><i></i></a>
  //        <p></p>
  //      </div>
  //    </div>
  //  </li>

  var $listItem = document.createElement('li');
  $listItem.className = 'entry-item';
  $listItem.setAttribute('data-entry-id', entry.entryId);
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
  $entryHeader.className = 'li-title';
  var $editAnchor = document.createElement('a');
  $editAnchor.setAttribute('href', '#');
  $editAnchor.className = 'icon-anchor';
  var $editIcon = document.createElement('i');
  $editIcon.className = 'fa-solid fa-pen-to-square';
  var $entryText = document.createElement('p');
  $editAnchor.appendChild($editIcon);
  $textCol.appendChild($entryHeader);
  $textCol.appendChild($editAnchor);
  $textCol.appendChild($entryText);

  $image.setAttribute('src', entry.photoUrl);
  $entryHeader.textContent = entry.title;
  $entryText.textContent = entry.notes;

  return $listItem;
}

function loadPreviousEntries() {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = (data.entries[i]);
    $unorderedList.prepend(newEntry);
  }
  updateDataView(data.view);
}

function loadEntry(entry) {
  var newEntry = renderEntry(entry);
  $unorderedList.prepend(newEntry);
  updateDataView(data.view);
}

function updateDataView(view) {
  if (view === 'entry-form') {
    $formContainer.className = 'active';
    $entriesContainer.className = 'hidden';
  } else if (view === 'entries') {
    $formContainer.className = 'hidden';
    $entriesContainer.className = 'active';
  }
}

function findEditEntry(event) {
  if (event.target.tagName === 'I') {
    var liId = +event.target.closest('li').getAttribute('data-entry-id');
    for (var k = 0; k < data.entries.length; k++) {
      if (liId === data.entries[k].entryId) {
        data.editing = data.entries[k];
        loadEditEntryPage(data.entries[k]);
      }
    }
  }
}

function loadEditEntryPage(entry) {
  $formHeader.textContent = 'Edit Entry';
  $deleteEntryBtn.className = 'delete-entry';
  $photoUrl.value = entry.photoUrl;
  $entryTitle.value = entry.title;
  $entryNotes.value = entry.notes;
  updatePhoto();
  data.view = 'entry-form';
  updateDataView(data.view);
}
