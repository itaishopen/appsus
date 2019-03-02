import { eventBus } from "../../../services/eventbus-service.js";

export default {
    template: `
        <section class="note-header">
            <h3
                :contenteditable="isEditing"
                ref="header"
                class="editable"
                :class="{editable_active: isEditing}"
                @mousedown.stop=""
            >
                {{header}}
            </h3>
            <button @click="startEditing" @mousedown.stop="" class="icon-btn edit-header"><i class="fas fa-pen"></i></button>
            <button @click="togglePin" @mousedown.stop=""  class="icon-btn pin-note"><i class="fas fa-thumbtack"></i></button>
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
            eventBus.$emit('started-editing');
        },
        stopEditing(ev) {
            ev.stopPropagation();
            this.isEditing = false;
            document.body.removeEventListener('mousedown', this.stopEditing);
            let currHeader = this.$refs.header.innerText;
            if (this.header !== currHeader) eventBus.$emit('header-changed', currHeader, this.noteId);
            eventBus.$emit('stopped-editing');
        },
        togglePin() {
            eventBus.$emit('toggle-pin', this.noteId)
        }
    }
}