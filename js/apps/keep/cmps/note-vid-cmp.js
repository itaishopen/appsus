import editableHeader from './header-cmp.js'
import utilService from '../../../services/util-service.js'

export default {
    components: {
        editableHeader
    },
    props: ['note', 'idx'],
    template: `
        <li class="keep-note-vid keep-note" :class="{white_txt: isDark}" :style="{backgroundColor: color}">
            <editable-header :header="note.header" :noteId="note.id"></editable-header>
            <iframe width="200" height="150"
                :src="vidSrc">
            </iframe>
            <div class="note-controls">
                <button class="icon-btn" @click="deleteNote"><i class="fas fa-trash-alt"></i></button>
                <button class="icon-btn" @click=""><i class="fas fa-share"></i></button>
                <input type="color" v-model="color" @change="updateColor" style="display: none" ref="colorPicker">
                <button class="icon-btn" @click="chooseColor"><i class="fas fa-palette"></i></button>
            </div>
        </li>
    `,
    data() {
        return {
            color: this.note.color
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
    created() {
        
    }
}