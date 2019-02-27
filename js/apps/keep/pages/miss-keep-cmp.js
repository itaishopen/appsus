import keepService from '../service/keep-service.js'
import noteTxt from '../cmps/note-txt-cmp.js'
import noteTodos from '../cmps/note-todos-cmp.js'
import noteImg from '../cmps/note-img-cmp.js'
import noteVid from '../cmps/note-vid-cmp.js'

export default {
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVid
    },
    template:`
    <section class="miss-keep">
        <ul class="note-list">
            <component v-for="note in notes" :is="'note-' + note.type" :note="note" :key="note.header"></component>
        </ul>
    </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        keepService.getNotes()
            .then(notes => this.notes = notes)
    }
}