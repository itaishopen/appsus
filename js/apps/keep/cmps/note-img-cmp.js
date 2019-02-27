export default {
    props: ['note'],
    template: `
        <li class="keep-note-img keep-note">
            <h3 class="note-header">{{header}}</h3>
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
        header() {
            return this.note.header;
        },
        imgSrc() {           
            return this.note.content;
        }
    },
    created() {
        
    }
}
