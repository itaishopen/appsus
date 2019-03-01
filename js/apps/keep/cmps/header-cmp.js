import { eventBus } from "../../../services/eventbus-service.js";

export default {
    template: `
        <section>
            <h3
                :contenteditable="isEditing"
                ref="header"
                class="note-header editable"
                :class="{editable_active: isEditing}"
                @mousedown.stop=""
            >
                {{header}}
            </h3>
            <button @click="startEditing">edit</button>
        </section>
    `,
    props: ['header', 'noteId'],
    data() {
        return {
            isEditing: false
        }
    },
    methods: {
        startEditing(ev) {
            ev.stopPropagation();
            this.isEditing = true;
            document.body.addEventListener('mousedown', this.stopEditing);
            console.log('editing');
            
        },
        stopEditing(ev) {
            ev.stopPropagation();
            this.isEditing = false;
            document.body.removeEventListener('click', this.stopEditing);
            let currHeader = this.$refs.header.innerText;
            if (this.header !== currHeader) eventBus.$emit('header-changed', currHeader, this.noteId);
        }
    }
}