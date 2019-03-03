import editableHeader from './header-cmp.js'
import utilService from '../../../services/util-service.js'
import { eventBus } from '../../../services/eventbus-service.js';


export default {
    components: {
        editableHeader
    },
    props: ['note'],
    template: `
        <li class="keep-note-txt keep-note" :class="{white_txt: isDark}" :style="{backgroundColor: color}">
            <editable-header :header="note.header" :noteId="note.id"></editable-header>
            <p ref="content" class="note-txt editable" :class="{editable_active: isEditing}" :contenteditable="isEditing" @mousedown.stop="">
                {{txt}}
            </p>
            <div class="note-controls">
                <button @click.stop="editNote" @mousedown.stop="" class="icon-btn"><i class="fas fa-pen"></i></button>
                <button class="icon-btn" @click="deleteNote" @mousedown.stop=""><i class="fas fa-trash-alt"></i></button>
                <router-link to="/email"><button :note="note" class="icon-btn" @click="" @mousedown.stop=""><i class="fas fa-paper-plane"></i></button></router-link>
                <input type="color" v-model="color" @change="updateColor" style="display: none" ref="colorPicker">
                <button class="icon-btn" @click="chooseColor" @mousedown.stop=""><i class="fas fa-palette"></i></button>
            </div>
        </li>
    `,
    data() {
        return {
            txt: this.note.content,
            isEditing: false,
            color: this.note.color
        }
    },
    methods: {
        editNote() {
            this.isEditing = true;            
            document.body.addEventListener('mousedown', this.stopEditing)
            eventBus.$emit('started-editing')
        },
        stopEditing(ev) {
            ev.stopPropagation();
            this.isEditing = false;
            this.txt = this.$refs.content.innerText
            if (this.txt !== this.note.content) {
                    this.$emit('note-txt-changed', this.txt, this.note.id)
                 }
            document.body.removeEventListener('mousedown', this.stopEditing)
            eventBus.$emit('stopped-editing')
        },
        deleteNote() {
            this.$emit('delete-note', this.note.id);
        },
        chooseColor() {
            this.$refs.colorPicker.click();
        },
        updateColor() {
            this.$emit('color-changed', this.color, this.note.id)
        },
        sendAsEmail() {
            this.$emit('sendAsEmail', this.note.id);
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
