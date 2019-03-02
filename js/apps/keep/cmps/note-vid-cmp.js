import editableHeader from './header-cmp.js'
import utilService from '../../../services/util-service.js'

export default {
    components: {
        editableHeader
    },
    props: ['note'],
    template: `
        <li class="keep-note-vid keep-note" :class="{white_txt: isDark}" :style="{backgroundColor: color}" ref="thisNote">
            <editable-header :header="note.header" :noteId="note.id"></editable-header>
            <iframe :width="vidWidth" :height="vidWidth*0.75"
                :src="vidSrc">
            </iframe>
            <div class="note-controls">
                <button class="icon-btn" @click="deleteNote" @mousedown.stop=""><i class="fas fa-trash-alt"></i></button>
                <button class="icon-btn" @click="" @mousedown.stop=""><i class="fas fa-share"></i></button>
                <input type="color" v-model="color" @change="updateColor" style="display: none" ref="colorPicker">
                <button class="icon-btn" @click="chooseColor" @mousedown.stop=""><i class="fas fa-palette"></i></button>
            </div>
        </li>
    `,
    data() {
        return {
            color: this.note.color,
            vidWidth: ''
        }
    },
    methods: {
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
        },
        vidSrc() {           
            return this.note.content;
        }
    },
    mounted() {
        this.vidWidth = this.$refs.thisNote.offsetWidth - 20
    }
}