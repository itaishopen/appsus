import editableHeader from './header-cmp.js'
import utilService from '../../../services/util-service.js'


export default {
    components: {
        editableHeader
    },
    props: ['note'],
    template: `
        <li class="keep-note-img keep-note" :class="{white_txt: isDark}" :style="{backgroundColor: note.color}">
            <editable-header :header="note.header" :noteId="note.id"></editable-header>
            <img :src="imgSrc" class="note-img">
        </li>
    `,
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        isDark() {
            return utilService.getBrightness(this.note.color) < 50;
        },
        imgSrc() {           
            return this.note.content;
        }
    },
    created() {
        
    }
}
