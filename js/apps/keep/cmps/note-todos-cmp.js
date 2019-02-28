import todo from './todo-cmp.js'
import editableHeader from './header-cmp.js'
import utilService from '../../../services/util-service.js'


export default {
    props: ['note'],
    components: {
        todo,
        editableHeader
    },
    template: `
        <li class="keep-note-todos keep-note" :class="{white_txt: isDark}" :style="{backgroundColor: note.color}">
            <editable-header :header="note.header" :noteId="note.id"></editable-header>
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
            if (this.newTodoTxt) this.$emit('new-todo', this.newTodoTxt, this.note.id);            
            document.body.removeEventListener('click', this.stopEditing);
            this.newTodoTxt = '';
        }
    },
    computed: {
        todos() {
            return this.note.content;
        },
        isDark() {
            return utilService.getBrightness(this.note.color) < 50;
        }
    },
    created() {
        
    }
}
