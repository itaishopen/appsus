export default {
    props: ['note'],
    template: `
        <li class="keep-note-txt keep-note">
            <h3 class="note-header" :class="{editable: editing}" :contenteditable="editing" @click.stop="">{{header}}</h3>
            <p class="note-txt" :class="{editable: editing}" :contenteditable="editing" @click.stop="">
                {{txt}}
            </p>
            <button @click.stop="editNote">edit</button>
        </li>
    `,
    data() {
        return {
            txt: this.note.content,
            header: this.note.header,
            editing: false
        }
    },
    methods: {
        editNote() {
            this.editing = true;            
            document.addEventListener('click', this.stopEditing)
        },
        stopEditing(ev) {
            ev.stopPropagation();
            this.editing = false;
            document.removeEventListener('click', this.stopEditing)
            //TODO update note
        }
    },
    computed: {

    },
    created() {
        
    }
}
