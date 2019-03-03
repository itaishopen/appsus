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
    saveNotes
}

var dummyNotes = [{ id: utilService.makeId(), type: 'txt', isPinned: false, color: '#493750', header: 'Sample Text Note', content: 'Sample Text' },
                  { id: utilService.makeId(), type: 'todos', isPinned: true, color: '#047669', header: 'Sample Todos Note', content: [{ id: utilService.makeId(), todoTxt: 'Sample Todo', isDone: false }, { id: utilService.makeId(), todoTxt: 'Sample Todo2', isDone: true }] },
                  { id: utilService.makeId(), type: 'txt', isPinned: false, color: '#a9f610', header: 'Sample Text Note', content: 'Sample Text' },
                  { id: utilService.makeId(), type: 'vid', isPinned: false, color: '#576492', header: 'Sample Video Note', content: 'https://www.youtube.com/embed/85zcR1AjtQE' },
                  { id: utilService.makeId(), type: 'todos', isPinned: true, color: '#9a00b1', header: 'Sample Todos Note', content: [{ id: utilService.makeId(), todoTxt: 'Sample Todo', isDone: false }, { id: utilService.makeId(), todoTxt: 'Sample Todo2', isDone: true }] },
                  { id: utilService.makeId(), type: 'img', isPinned: false, color: '#476904', header: 'Sample Image Note', content: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mandelbrot_set_image.png/220px-Mandelbrot_set_image.png' },
                  { id: utilService.makeId(), type: 'todos', isPinned: true, color: '#090909', header: 'Sample Todos Note', content: [{ id: utilService.makeId(), todoTxt: 'Sample Todo', isDone: false }, { id: utilService.makeId(), todoTxt: 'Sample Todo2', isDone: true }] },
                  { id: utilService.makeId(), type: 'txt', isPinned: false, color: '#599959', header: 'Sample Text Note', content: 'Sample Text' },
                  { id: utilService.makeId(), type: 'img', isPinned: false, color: '#f999f9', header: 'Sample Image Note', content: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Pale_Blue_Dot.png' },
                  { id: utilService.makeId(), type: 'vid', isPinned: false, color: '#98263a', header: 'Sample Video Note', content: 'https://www.youtube.com/embed/xuCn8ux2gbs' }]

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
            saveNotes(notes)
            return notes;
        })
}

function deleteNote(noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes.splice(noteIdx, 1);
            saveNotes(notes);
            return notes;
        })
}

function addTodo(todoTxt, noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes[noteIdx].content.push({ id: utilService.makeId(), todoTxt, isDone: false })
            saveNotes(notes);
            return notes;
        })
}

function deleteTodo(todoId, noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            let todoIdx = notes[noteIdx].content.findIndex(todo => todo.id === todoId);
            notes[noteIdx].content.splice(todoIdx, 1);
            saveNotes(notes);
            return notes;
        })
}

function toggleIsDone(todoId, noteId) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            let todoIdx = notes[noteIdx].content.findIndex(todo => todo.id === todoId);
            notes[noteIdx].content[todoIdx].isDone = !notes[noteIdx].content[todoIdx].isDone;
            saveNotes(notes);
            return notes;
        })
}

function updateNoteContent(noteId, content) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes[noteIdx].content = content
            saveNotes(notes)
            return notes;
        })
}

function updateNoteHeader(noteId, header) {
    return _loadNotes()
        .then(notes => {
            let noteIdx = notes.findIndex(note => note.id === noteId);
            notes[noteIdx].header = header;
            saveNotes(notes);
            return notes;
        })
}

function updateColor(noteId, color) {
    return _loadNotes()
    .then(notes => {
        let noteIdx = notes.findIndex(note => note.id === noteId);
        notes[noteIdx].color = color;
        saveNotes(notes);
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
            
            saveNotes(notes);
            return notes;
        })
}

function _createNotes() {
    utilService.saveToStorageSync('notes', utilService.loadFromStorageSync('notes') || dummyNotes)
}

function saveNotes(notes) {
    return utilService.saveToStorage('notes', notes)
        .then(() => console.log('saved notes'))
}

function _loadNotes() {
    return utilService.loadFromStorage('notes')
}

function _createTodos(todoList) {
    if (!todoList) return [];
    todoList = todoList.filter(todo => todo);
    // console.log(todoList);
    return todoList.map(todo => ({ id: utilService.makeId(), todoTxt: todo, isDone: false }))
}