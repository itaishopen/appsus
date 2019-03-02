import utilService from '../../../services/util-service.js';
// import router from '../../../routes.js'

export default {
    getNotes,
    createNote,
    addNote,
    deleteNote,
    updateNoteContent,
    updateNoteHeader,
    deleteTodo,
    toggleIsDone,
    addTodo,
    togglePin,
    updateColor,
    sendEmail,
    // router
}

var dummyNotes = [{ id: utilService.makeId(), type: 'txt', isPinned: false, color: '#493750', header: 'Sample Txt Note', content: 'Sample Txt' },
                  { id: utilService.makeId(), type: 'todos', isPinned: true, color: '#047669', header: 'Sample Todos Note', content: [{ id: utilService.makeId(), todoTxt: 'Sample Todo', isDone: false }, { id: utilService.makeId(), todoTxt: 'Sample Todo2', isDone: true }] },
                  { id: utilService.makeId(), type: 'img', isPinned: false, color: '#476904', header: 'Sample Image Note', content: 'https://via.placeholder.com/150' },
                  { id: utilService.makeId(), type: 'vid', isPinned: false, color: '#576492', header: 'Sample Video Note', content: 'https://www.youtube.com/embed/Dc5mMl58nUo' },
                  { id: utilService.makeId(), type: 'txt', isPinned: false, color: '#493750', header: 'Sample Txt Note', content: 'Sample Txt' },
                  { id: utilService.makeId(), type: 'todos', isPinned: true, color: '#047669', header: 'Sample Todos Note', content: [{ id: utilService.makeId(), todoTxt: 'Sample Todo', isDone: false }, { id: utilService.makeId(), todoTxt: 'Sample Todo2', isDone: true }] },
                  { id: utilService.makeId(), type: 'img', isPinned: false, color: '#476904', header: 'Sample Image Note', content: 'https://via.placeholder.com/150' },
                  { id: utilService.makeId(), type: 'vid', isPinned: false, color: '#576492', header: 'Sample Video Note', content: 'https://www.youtube.com/embed/Dc5mMl58nUo' },
                  { id: utilService.makeId(), type: 'txt', isPinned: false, color: '#493750', header: 'Sample Txt Note', content: 'Sample Txt' },
                  { id: utilService.makeId(), type: 'todos', isPinned: true, color: '#047669', header: 'Sample Todos Note', content: [{ id: utilService.makeId(), todoTxt: 'Sample Todo', isDone: false }, { id: utilService.makeId(), todoTxt: 'Sample Todo2', isDone: true }] },
                  { id: utilService.makeId(), type: 'img', isPinned: false, color: '#476904', header: 'Sample Image Note', content: 'https://via.placeholder.com/150' },
                  { id: utilService.makeId(), type: 'vid', isPinned: false, color: '#576492', header: 'Sample Video Note', content: 'https://www.youtube.com/embed/Dc5mMl58nUo' }]

_createNotes();

function createNote(type, color, header, content) {
    if(!header) header = 'New Note'
    switch (type) {
        case 'txt':
            return { id: utilService.makeId(), type: 'txt', isPinned: false, color, header, content };
        case 'todos':
            return { id: utilService.makeId(), type: 'todos', isPinned: false, color, header, content: _createTodos(content) };
        case 'img':
            return { id: utilService.makeId(), type: 'img', isPinned: false, color, header, content };
        case 'vid':
            return { id: utilService.makeId(), type: 'vid', isPinned: false, color, header, content };
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
            return notes;
        })
}

function deleteNote(noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes.splice(noteIdx, 1);
            _saveNotes(notes);
            return notes;
        })
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
            _saveNotes(notes);
            return notes;
        })
}

function updateColor(noteId, color) {
    return _loadNotes()
    .then(notes => {
        let noteIdx = notes.findIndex(note => note.id === noteId);
        notes[noteIdx].color = color;
        _saveNotes(notes);
        return notes;
    })
}

function sendEmail(noteId) {
    return _loadNotes()
    .then(notes => {
        let noteIdx = notes.findIndex(note => note.id === noteId);
        let email = {
            recipient: '',
            sender: 'awesome@devil.com',
            subject: notes[noteIdx].header,
            body: notes[noteIdx].content,
        }
        console.log(email);
        
    })
}

function togglePin(noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes[noteIdx].isPinned = !notes[noteIdx].isPinned;
            // console.log(notes);
            
            _saveNotes(notes);
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
    todoList = todoList.filter(todo => todo);
    console.log(todoList);
    return todoList.map(todo => ({ id: utilService.makeId(), todoTxt: todo, isDone: false }))
}