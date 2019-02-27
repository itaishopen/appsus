

export default {
    getNotes,
    createNote,
    addNote,
    deleteNote
}

var notes = [{ type: 'txt', header: 'Sample Txt Note', txt: 'Sample Txt' },
{ type: 'todos', header: 'Sample Todos Note', todos: [{ todoTxt: 'Sample Todo', isDone: false }, { todoTxt: 'Sample Todo2', isDone: true }] },
{ type: 'img', header: 'Sample Image Note', imgSrc: 'https://via.placeholder.com/150' },
{ type: 'vid', header: 'Sample Video Note', vidSrc: 'https://www.youtube.com/embed/Dc5mMl58nUo' }]

function getNotes() {
    return Promise.resolve(notes);
}

function createNote(type, header, content) {
    switch (type) {
        case 'txt':
            return { type: 'txt', header, txt: content };
        case 'todos':
            return { type: 'todos', header, todos: _createTodos(content) };
        case 'img':
            return { type: 'img', header, imgSrc: content };
        case 'vid':
            return { type: 'vid', header, vidSrc: content };
    }
}

function addNote(note) {
    notes.push(note);
    return Promise.resolve('note added')
}

function deleteNote(idx) {
    notes.splice(idx, 1);
    return Promise.resolve('note deleted')
}

function _createTodos(todoList) {
    return todoList.split(',').map(todo => ({ todoTxt: todo, isDone: true }))
}