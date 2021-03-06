import editableHeader from './header-cmp.js'
import utilService from '../../../services/util-service.js'


export default {
    components: {
        editableHeader
    },
    props: ['note'],
    template: `
        <li class="keep-note-img keep-note" :class="{white_txt: isDark}" :style="{backgroundColor: color}">
            <editable-header :header="note.header" :noteId="note.id"></editable-header>
            <img :src="imgSrc" class="note-img">
            <div class="note-controls">
                <button class="icon-btn" @click="deleteNote" @mousedown.stop=""><i class="fas fa-trash-alt"></i></button>
                <router-link :to="'/email/' + note.id"><button class="icon-btn" @click="" @mousedown.stop=""><i class="fas fa-paper-plane"></i></button></router-link>
                <input type="color" v-model="color" @change="updateColor" style="display: none" ref="colorPicker">
                <button class="icon-btn" @click="chooseColor" @mousedown.stop=""><i class="fas fa-palette"></i></button>
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
        },
        sendAsEmail() {
            this.$emit('sendAsEmail', this.note.id);
        }
    },
    computed: {
        isDark() {
            return utilService.getBrightness(this.note.color) < 50;
        },
        imgSrc() {           
            return this.note.content;
        }
    },
    mounted() {
    }
}
