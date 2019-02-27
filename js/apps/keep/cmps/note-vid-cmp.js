export default {
    props: ['note'],
    template: `
        <li class="keep-note">
            <h3 class="note-header">{{header}}</h3>
            <iframe width="200" height="150"
                :src="vidSrc">
            </iframe>
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
        vidSrc() {           
            return this.note.vidSrc;
        }
    },
    created() {
        
    }
}
