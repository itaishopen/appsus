import editableHeader from './header-cmp.js'
import utilService from '../../../services/util-service.js'

export default {
    components: {
        editableHeader
    },
    props: ['note'],
    template: `
        <li class="keep-note-txt keep-note" :class="{white_txt: isDark}" :style="{backgroundColor: note.color}">
            <editable-header :header="note.header" :noteId="note.id"></editable-header>
            <p ref="content" class="note-txt editable" :class="{editable_active: isEditing}" :contenteditable="isEditing" @click.stop="">
                {{txt}}
            </p>
            <button @click.stop="editNote">edit</button>
        </li>
    `,
    data() {
        return {
            txt: this.note.content,
            isEditing: false
        }
    },
    methods: {
        editNote() {
            this.isEditing = true;            
            document.addEventListener('click', this.stopEditing)
        },
        stopEditing(ev) {
            ev.stopPropagation();
            this.isEditing = false;
            this.txt = this.$refs.content.innerText
            if (this.txt !== this.note.content) {
                    this.$emit('note-txt-changed', this.txt, this.note.id)
                 }
            document.removeEventListener('click', this.stopEditing)
        }
    },
    computed: {
        isDark() {
            return utilService.getBrightness(this.note.color) < 50;
        }
    },
    mounted() {

    }
}
