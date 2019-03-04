import keepService from '../service/keep-service.js'
import noteTxt from '../cmps/note-txt-cmp.js'
import noteTodos from '../cmps/note-todos-cmp.js'
import noteImg from '../cmps/note-img-cmp.js'
import noteVid from '../cmps/note-vid-cmp.js'
import addNote from '../cmps/add-note-cmp.js'
import searchNotes from '../cmps/search-notes-cmp.js'
import { eventBus } from '../../../services/eventbus-service.js'
import utilService from '../../../services/util-service.js';

export default {
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVid,
        addNote,
        searchNotes,
    },
    template: `
    <section class="keep-app wrapper">
    <search-notes :notes="notes"></search-notes>
    <add-note @add="addNote"></add-note>
    <h2 class="list-header">Pinned Notes</h2>
        <ul class="note-list">
            <masonry
            :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
            :gutter="{default: '15px'}"
            >
                <component
                    v-for="note in pinnedNotes"
                    :ref="note.id"
                    :is="'note-' + note.type"
                    :note="note"
                    :key="note.id"
                    :data-id="note.id"
                    @mousedown.native="startDrag(note, $event)"
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
                    :ref="note.id"
                    :is="'note-' + note.type"
                    :note="note"
                    :key="note.id"
                    :data-id="note.id"
                    @mousedown.native="startDrag(note, $event)"
                    @new-todo="newTodo"
                    @note-txt-changed="noteTxtChanged"
                    @delete-note="deleteNote"
                    @color-changed="updateColor">
                </component>
            </masonry>
        </ul>
        <div ref="frame" style="display: none"></div>
    </section>
    `,
    data() {
        return {
            notes: null,
            notePos: null,
            clickPos: null,
            dragIdx: null,
            nearestNoteId: null,
            isEditing: false
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
        },
        startDrag(clickedNote, ev) {
            if (this.isEditing) return;
            this.clickPos = {x: ev.clientX, y: ev.clientY};
            this.dragIdx = this.notes.findIndex(note => note.id === clickedNote.id)
            let pathArr = Array.from(ev.path);
            let elClickedNote = pathArr.find(el => el.classList.contains('keep-note'))
            this.notePos = { x: elClickedNote.offsetLeft, y: elClickedNote.offsetTop }
            elClickedNote.style.visibility = 'hidden';
            let elFrame = this.$refs.frame
            elFrame.style.width = elClickedNote.offsetWidth + 'px';
            elFrame.style.height = elClickedNote.offsetHeight + 'px';
            elFrame.style.position = 'absolute';
            elFrame.style.left = this.notePos.x + 'px';
            elFrame.style.top = this.notePos.y + 'px';
            elFrame.style.display = 'block';
            elFrame.style.border = '3px dashed blue';
            document.body.addEventListener('mousemove', this.drag)
            document.body.addEventListener('mouseup', this.stopDrag)
        },
        drag(ev) {
            ev.preventDefault();
            let elFrame = this.$refs.frame;
            elFrame.style.left = (this.notePos.x + ev.clientX - this.clickPos.x) + 'px'
            elFrame.style.top = (this.notePos.y + ev.clientY - this.clickPos.y) + 'px'
            let notesArray = []
            for (let prop in this.$refs) {
                let currRef = this.$refs[prop][0]
                if (currRef) notesArray.push(this.$refs[prop][0].$el)
            }
            notesArray.sort((el1, el2) => utilService.getDistance(elFrame, el1) - utilService.getDistance(elFrame, el2))
            notesArray = notesArray.map(note => note.dataset.id);
            let currNearestNoteId = notesArray[0]
            if (!this.nearestNoteId) this.nearestNoteId = currNearestNoteId;
            if (this.nearestNoteId !== currNearestNoteId) {
                this.nearestNoteId = currNearestNoteId;
                let nearestNoteIdx = this.notes.findIndex(note => note.id === this.nearestNoteId);
                let dragNote = this.notes.splice(this.dragIdx, 1)[0];
                this.notes.splice(nearestNoteIdx, 0, dragNote);
                Vue.nextTick()
                    .then(() => this.$refs[dragNote.id][0].$el.style.visibility = 'hidden');
                this.dragIdx = nearestNoteIdx;
                this.nearestNoteId = null
            }
        },
        stopDrag() {
            document.body.removeEventListener('mousemove', this.drag)
            document.body.removeEventListener('mouseup', this.stopDrag)
            this.$refs[this.notes[this.dragIdx].id][0].$el.style.visibility = '';
            this.$refs.frame.style.display = 'none';
            keepService.saveNotes(this.notes);
        }
    },
    created() {
        keepService.createNotes();
        if (!keepService.checkLoggedUser()) this.$router.push('/')
        keepService.getNotes()
            .then(notes => this.notes = notes, err => console.log(err));
        eventBus.$on('deleteTodo', (todoId, noteId) => keepService.deleteTodo(todoId, noteId).then(notes => this.notes = notes))
        eventBus.$on('toggleIsDone', (todoId, noteId) => keepService.toggleIsDone(todoId, noteId).then(notes => this.notes = notes))
        eventBus.$on('header-changed', (newHeader, noteId) => keepService.updateNoteHeader(noteId, newHeader).then(notes => this.notes = notes))
        eventBus.$on('toggle-pin', noteId => keepService.togglePin(noteId).then(notes => this.notes = notes))
        eventBus.$on('search-item-clicked', noteId => {
            let selectedNote = this.$refs[noteId][0].$el
            selectedNote.scrollIntoView();
            selectedNote.classList.add('flash')
            setTimeout(() => selectedNote.classList.remove('flash'), 200)
            setTimeout(() => selectedNote.classList.add('flash'), 400)
            setTimeout(() => selectedNote.classList.remove('flash'), 600)
            setTimeout(() => selectedNote.classList.add('flash'), 800)
            setTimeout(() => selectedNote.classList.remove('flash'), 1000)
        });
        eventBus.$on('started-editing', () => this.isEditing = true)
        eventBus.$on('stopped-editing', () => this.isEditing = false)
    },
    mounted() {
        document.querySelector('title').innerHTML = 'Miss keep';
        document.getElementById('favicon').href = 'img/miss-keep.png';
        document.querySelector('.logo-img').src = 'img/miss-keep.png';
        if (document.body.classList.contains('open')) {
            document.body.classList.toggle('open');
            document.querySelector(".mobile-menu-button").classList.toggle("change");
        }
    }
}