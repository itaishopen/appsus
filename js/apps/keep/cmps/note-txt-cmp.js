export default {
    props: ['note'],
    template: `
        <li class="keep-note">
            <h3 class="note-header">{{header}}</h3>
            <p class="note-txt">
                {{txt}}
            </p>
        </li>
    `,
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    computed: {
        txt() {
            return this.note.txt;
        },
        header() {
            return this.note.header;
        }
    },
    created() {
        
    }
}
