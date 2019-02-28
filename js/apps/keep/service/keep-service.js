import utilService from '../../../services/util-service.js';

export default {
    getNotes,
    createNote,
    addNote,
    deleteNote,
    updateNoteContent,
    updateNoteHeader,
    deleteTodo,
    toggleIsDone,
    addTodo
}

var dummyNotes = [{ id: utilService.makeId(), type: 'txt', color: '#493750', header: 'Sample Txt Note', content: 'Sample Txt' },
                  { id: utilService.makeId(), type: 'todos', color: '#047669', header: 'Sample Todos Note', content: [{ id: utilService.makeId(), todoTxt: 'Sample Todo', isDone: false }, { id: utilService.makeId(), todoTxt: 'Sample Todo2', isDone: true }] },
                  { id: utilService.makeId(), type: 'img', color: '#476904', header: 'Sample Image Note', content: 'https://via.placeholder.com/150' },
                  { id: utilService.makeId(), type: 'vid', color: '#576492', header: 'Sample Video Note', content: 'https://www.youtube.com/embed/Dc5mMl58nUo' }]

_createNotes();

function createNote(type, color, header, content) {
    if(!header) header = 'New Note'
    switch (type) {
        case 'txt':
            return { id: utilService.makeId(), color, type: 'txt', header, content };
        case 'todos':
            return { id: utilService.makeId(), color, type: 'todos', header, content: _createTodos(content) };
        case 'img':
            return { id: utilService.makeId(), color, type: 'img', header, content };
        case 'vid':
            return { id: utilService.makeId(), color, type: 'vid', header, content };
    }
}

function getNotes() {
    return _loadNotes()
}

function addNote(note) {
    return _loadNotes()
        .then(notes => {
            notes.push(note);
            _saveNotes(notes)
        })
}

function deleteNote(idx) {
    return _loadNotes()
        .then(notes => _saveNotes(notes.splice(idx, 1)))
}

function addTodo(todoTxt, noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes[noteIdx].content.push({ id: utilService.makeId(), todoTxt, isDone: false })
            _saveNotes(notes);
            return notes;
        })
}

function deleteTodo(todoId, noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            let todoIdx = notes[noteIdx].content.findIndex(todo => todo.id === todoId);
            notes[noteIdx].content.splice(todoIdx, 1);
            _saveNotes(notes);
            return notes;
        })
}

function toggleIsDone(todoId, noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            let todoIdx = notes[noteIdx].content.findIndex(todo => todo.id === todoId);
            notes[noteIdx].content[todoIdx].isDone = !notes[noteIdx].content[todoIdx].isDone;
            _saveNotes(notes);
            return notes;
        })
}

function updateNoteContent(noteId, content) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes[noteIdx].content = content
            _saveNotes(notes)
            return notes;
        })
}

function updateNoteHeader(noteId, header) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes[noteIdx].header = header;
            _saveNotes(notes)
            return notes;
        })
}

function _createNotes() {
    utilService.saveToStorageSync('notes', utilService.loadFromStorageSync('notes') || dummyNotes)
}

function _saveNotes(notes) {
    return utilService.saveToStorage('notes', notes)
        .then(() => console.log('saved notes'))
}

function _loadNotes() {
    return utilService.loadFromStorage('notes')
}

function _createTodos(todoList) {
    if (!todoList) return [];
    return todoList.map(todo => ({ todoId: utilService.makeId(), todoTxt: todo, isDone: false }))
}