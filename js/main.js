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

function createEntry(entry) {
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
  $row.className('row');
  $listItem.appendChild($row);
  var $imgCol = document.createElement('div');
  $imgCol.className('column-half');
  $row.appendChild($imgCol);
  var $image = document.createElement('img');
  $imgCol.appendChild($image);
  var $textCol = document.createElement('div');
  $textCol.className('column-half');
  $row.appendChild($textCol);
  var $entryHeader = document.createElement('h2');
  var $entryText = document.createElement('p');
  $textCol.appendChild($entryHeader);
  $textCol.appendChild($entryText);

  $image.setAttribute('src', entry.photoUrl);
  $entryHeader.textContent = entry.title;
  $entryText.textContent = entry.notes;

  var unorderedList = document.querySelector('.entryList');
  unorderedList.appendChild($listItem);
}

createEntry(data.entry[0]);
