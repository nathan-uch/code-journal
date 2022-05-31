/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  var JSONdata = JSON.stringify(data);
  localStorage.setItem('code-journal', JSONdata);
});
