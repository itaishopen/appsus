import todo from './todo-cmp.js'

export default {
    props: ['note'],
    components: {
        todo
    },
    template: `
        <li class="keep-note">
            <h3 class="note-header">{{header}}</h3>
            <ul class="todos">
                <todo v-for="todo in todos" :todo="todo" :key="todo.todoTxt"></todo>
            </ul>
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
        todos() {
            return this.note.todos;
        }
    },
    created() {
        
    }
}
