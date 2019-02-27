import utilService from '../../../services/util-service.js';

export default {
    getNotes,
    createNote,
    addNote,
    deleteNote,
    updateNote,
    deleteTodo,
    toggleIsDone,
    addTodo
}

var dummyNotes = [{ id: utilService.makeId(), type: 'txt', header: 'Sample Txt Note', content: 'Sample Txt' },
{ id: utilService.makeId(), type: 'todos', header: 'Sample Todos Note', content: [{ id: utilService.makeId(), todoTxt: 'Sample Todo', isDone: false }, { id: utilService.makeId(), todoTxt: 'Sample Todo2', isDone: true }] },
{ id: utilService.makeId(), type: 'img', header: 'Sample Image Note', content: 'https://via.placeholder.com/150' },
{ id: utilService.makeId(), type: 'vid', header: 'Sample Video Note', content: 'https://www.youtube.com/embed/Dc5mMl58nUo' }]

_createNotes();

function createNote(type, header, content) {
    switch (type) {
        case 'txt':
            return { id: utilService.makeId(), type: 'txt', header, content };
        case 'todos':
            return { id: utilService.makeId(), type: 'todos', header, content: _createTodos(content) };
        case 'img':
            return { id: utilService.makeId(), type: 'img', header, content };
        case 'vid':
            return { id: utilService.makeId(), type: 'vid', header, content };
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
            return updateNote(noteIdx, notes[noteIdx].header, notes[noteIdx].content);
        })
}

function deleteTodo(todoId, noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            let todoIdx = notes[noteIdx].content.findIndex(todo => todo.id === todoId);
            let newTodos = notes[noteIdx].content;
            newTodos.splice(todoIdx, 1);
            return updateNote(noteIdx, notes[noteIdx].header, newTodos);
        })
}

function toggleIsDone(todoId, noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            let todoIdx = notes[noteIdx].content.findIndex(todo => todo.id === todoId);
            notes[noteIdx].content[todoIdx].isDone = !notes[noteIdx].content[todoIdx].isDone
            return updateNote(noteIdx, notes[noteIdx].header, notes[noteIdx].content);
        })
}

function updateNote(idx, header, content) {
    return _loadNotes()
        .then(notes => {
            notes[idx].header = header
            notes[idx].content = content
            _saveNotes(notes)
            return notes;
        })
}

function _createNotes() {
    utilService.saveToStorageSync('notes', utilService.loadFromStorageSync('notes') || dummyNotes)
}

function _saveNotes(notes) {
    return utilService.saveToStorage('notes', notes)
}

function _loadNotes() {
    return utilService.loadFromStorage('notes')
}

function _createTodos(todoList) {
    return todoList.split(',').map(todo => ({ todoId: utilService.makeId(), todoTxt: todo, isDone: false }))
}