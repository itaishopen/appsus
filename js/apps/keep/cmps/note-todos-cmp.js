import todo from './todo-cmp.js'
import keepService from '../service/keep-service.js'

export default {
    props: ['note'],
    components: {
        todo
    },
    template: `
        <li class="keep-note-todos keep-note">
            <h3 class="note-header">{{header}}</h3>
            <button @click.stop="addTodo">+</button>
            <ul class="todos">
                <todo v-for="todo in todos" :todo="todo" :noteId="note.id" :key="todo.todoTxt"></todo>
            </ul>
            <input v-if="editing" v-model="newTodoTxt" type="text" placeholder="enter new todo" @click.stop="" autofocus>
        </li>
    `,
    data() {
        return {
            editing: false,
            newTodoTxt: ''
        }
    },
    methods: {
        addTodo() {
            this.editing = true;
            document.body.addEventListener('click', this.stopEditing);
        },
        stopEditing(ev) {
            ev.stopPropagation();
            this.editing = false;
            if (this.newTodoTxt) this.$emit('newTodo', this.newTodoTxt, this.note.id);
            document.body.removeEventListener('click', this.stopEditing);
            this.newTodoTxt = '';
        }
    },
    computed: {
        header() {
            return this.note.header;
        },
        todos() {
            return this.note.content;
        }
    },
    created() {
        
    }
}
