import keepService from '../service/keep-service.js'
import noteTxt from '../cmps/note-txt-cmp.js'
import noteTodos from '../cmps/note-todos-cmp.js'
import noteImg from '../cmps/note-img-cmp.js'
import noteVid from '../cmps/note-vid-cmp.js'
import addNote from '../cmps/add-note-cmp.js'
import {eventBus} from '../../../services/eventbus-service.js'


export default {
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVid,
        addNote
    },
    template: `
    <section class="keep-app">
        <ul class="note-list">
            <component v-for="note in notes" :is="'note-' + note.type" :note="note" :key="note.id" @newTodo="newTodo"></component>
        </ul>
        <add-note @add="addNote"></add-note>
    </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    methods: {
        updateNotes() {
            keepService.getNotes()
            .then(notes => this.notes = notes);
        },
        addNote(noteObj) {
            let newNote = keepService.createNote(noteObj.type, noteObj.title, noteObj.content)
            keepService.addNote(newNote)
                .then(res => keepService.getNotes())
                .then(notes => {
                    this.notes = notes                    
                });
        },
        newTodo(todoTxt, noteId) {            
            keepService.addTodo(todoTxt, noteId).then(notes => this.notes = notes);
        }
    },
    created() {
        this.updateNotes();
        eventBus.$on('deleteTodo', (todoId, noteId) => keepService.deleteTodo(todoId, noteId).then(notes => this.notes = notes))
        eventBus.$on('toggleIsDone', (todoId, noteId) => keepService.toggleIsDone(todoId, noteId).then(notes => this.notes = notes))
    }
}