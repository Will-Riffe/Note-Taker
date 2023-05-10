// Declaring our element variables
let noteHeader;
let noteTxt;
let saveBtn;
let freshNoteBtn;
let savedNotes;

// Queries for DOM elements if user is on notes.html's webpage
if (window.location.pathname === '/notes') {
  noteHeader = document.querySelector('.note-title');
  noteTxt = document.querySelector('.note-textarea');
  saveBtn = document.querySelector('.save-note');
  freshNoteBtn = document.querySelector('.new-note');
  savedNotes = document.querySelectorAll('.list-container .list-group');
}

// changes element display to 'inline' rather than 'none'
const show = (elem) => {
  elem.style.display = 'inline';
};

// changes element display to 'none' rather than 'inline'
const hide = (elem) => {
  elem.style.display = 'none';
};

// Initializes variable to store active note/edited note
let selectedNote = {};

// Retrieves note from server
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Saves Note to Server
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

// Deletes note from Server
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Renders active note to text area; hides the save button
const renderActiveNote = () => {
  hide(saveBtn);

  // If a note is active, the title and text will populate text fields.
  if (selectedNote.id) {
    noteHeader.setAttribute('readonly', true);
    noteTxt.setAttribute('readonly', true);
    noteHeader.value = selectedNote.title;
    noteTxt.value = selectedNote.text;
  } else { // Clears the fields when nothing is active
    noteHeader.removeAttribute('readonly');
    noteTxt.removeAttribute('readonly');
    noteHeader.value = '';
    noteTxt.value = '';
  }
};

// The function for saving a note...
const handleNoteSave = () => {
  const newNote = {
    title: noteHeader.value,
    text: noteTxt.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes(); // Refreshes note list
    renderActiveNote(); // Clears active note
  });
};

// Function for deleting notes
const handleNoteDelete = (e) => {
  e.stopPropagation(); // stops click from bubbling up to parent

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  // clears text fields if active note is being deleted
  if (selectedNote.id === noteId) {
    selectedNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes(); // Refreshes the note list...
    renderActiveNote(); //Clears the active note...
  });
};

// Function to handle viewing a note
const handleNoteView = (e) => {
  e.preventDefault(); //prevents link from following href attribute

  //Sets active note to the clicked note, renders it
  selectedNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Function for making new note
const handleNewNoteView = (e) => {
  selectedNote = {}; // clears active note
  renderActiveNote(); //clears note fields
};

// Function to render the note list
const handleRenderSaveBtn = () => {

  // shows message if there aren't any notes.
  if (!noteHeader.value.trim() || !noteTxt.value.trim()) {
    hide(saveBtn);
  } else {
    show(saveBtn); // renders each not in list if there are any.
  }
};

// Render the list of note titles in the sidebar
const renderSavedNotes = async (notes) => {

  //parses notes as JSON
  let jsonNotes = await notes.json();

  // Clears the sidebar if the user is on the notes page
  if (window.location.pathname === '/notes') {
    savedNotes.forEach((el) => (el.innerHTML = ''));
  }

  // Array to hold the list of notes
  let savedNotesItems = [];

  // Returns HTML list item regardless of delete button elements presence
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };


  /*If no notes are present, this should create a list item saying
    "No saved Notes" */
  if (jsonNotes.length === 0) {
    savedNotesItems.push(createLi('No saved Notes', false));
  }

  // Iterates through the array of notes to create a list item for each
  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    savedNotesItems.push(li);
  });

  // Appends list items to side bar when user is on the notes page.
  if (window.location.pathname === '/notes') {
    savedNotesItems.forEach((note) => savedNotes[0].append(note));
  }
};

// Retrieves notes from database, renders them in sidebar
const getAndRenderNotes = () => getNotes().then(renderSavedNotes);

/* Adds event listeners to "save" and "new" icons when user is on 
  notes the page */
if (window.location.pathname === '/notes') {
  saveBtn.addEventListener('click', handleNoteSave);
  freshNoteBtn.addEventListener('click', handleNewNoteView);
  noteHeader.addEventListener('keyup', handleRenderSaveBtn);
  noteTxt.addEventListener('keyup', handleRenderSaveBtn);
}

// Calls the function to get/render the notes
getAndRenderNotes();
