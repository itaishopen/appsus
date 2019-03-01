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
    <section class="keep-app wrapper">
    <add-note @add="addNote"></add-note>
    <h2 class="list-header">Pinned Notes</h2>
        <ul class="note-list">
            <masonry
            :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
            :gutter="{default: '15px'}"
            >
                <component
                    v-for="note in pinnedNotes"
                    :is="'note-' + note.type"
                    :note="note"
                    :key="note.id"
                    @new-todo="newTodo"
                    @note-txt-changed="noteTxtChanged"
                    @delete-note="deleteNote"
                    @color-changed="updateColor">
                </component>
            </masonry>
        </ul>
        <hr>
        <h2 class="list-header">Other Notes</h2>
        <ul class="note-list">
            <masonry
            :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
            :gutter="{default: '15px'}"
            >
                <component
                    v-for="note in unpinnedNotes"
                    :is="'note-' + note.type"
                    :note="note"
                    :key="note.id"
                    @new-todo="newTodo"
                    @note-txt-changed="noteTxtChanged"
                    @delete-note="deleteNote"
                    @color-changed="updateColor">
                </component>
            </masonry>
        </ul>
    </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    computed: {
        pinnedNotes() {            
            if (!this.notes) return null
            return this.notes.filter(note => note.isPinned);
        },
        unpinnedNotes() {
            if (!this.notes) return null
            return this.notes.filter(note => !note.isPinned);
        }
    },
    methods: {
        addNote(noteObj) {
            let newNote = keepService.createNote(noteObj.type, noteObj.color, noteObj.title, noteObj.content)
            keepService.addNote(newNote)
                .then(notes => this.notes = notes);
        },
        newTodo(todoTxt, noteId) {            
            keepService.addTodo(todoTxt, noteId).then(notes => this.notes = notes);
        },
        noteTxtChanged(newContent, noteId) {
            keepService.updateNoteContent(noteId, newContent)
                .then(notes => this.notes = notes);
        },
        deleteNote(noteId) {
            keepService.deleteNote(noteId).then(notes => this.notes = notes);
        },
        updateColor(color, noteId) {
            keepService.updateColor(noteId, color).then(notes => this.notes = notes);
        }
    },
    created() {
        keepService.getNotes()
            .then(notes => {                
                this.notes = notes}
                );
        eventBus.$on('deleteTodo', (todoId, noteId) => keepService.deleteTodo(todoId, noteId).then(notes => this.notes = notes))
        eventBus.$on('toggleIsDone', (todoId, noteId) => keepService.toggleIsDone(todoId, noteId).then(notes => this.notes = notes))
        eventBus.$on('header-changed', (newHeader, noteId) => keepService.updateNoteHeader(noteId, newHeader).then(notes => this.notes = notes))
        eventBus.$on('toggle-pin', noteId => keepService.togglePin(noteId).then(notes => this.notes = notes))
        document.querySelector('title').innerHTML = 'Miss keep';
        document.getElementById('favicon').href = 'img/miss-keep.png';
    }
}