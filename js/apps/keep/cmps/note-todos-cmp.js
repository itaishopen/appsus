import todo from './todo-cmp.js'
import editableHeader from './header-cmp.js'
import utilService from '../../../services/util-service.js'
import { eventBus } from '../../../services/eventbus-service.js';


export default {
    props: ['note'],
    components: {
        todo,
        editableHeader
    },
    template: `
        <li class="keep-note-todos keep-note" :class="{white_txt: isDark}" :style="{backgroundColor: color}">
            <editable-header :header="note.header" :noteId="note.id"></editable-header>
            <ul class="todos">
                <todo v-for="todo in todos" :todo="todo" :noteId="note.id" :key="todo.todoTxt"></todo>
            </ul>
            <input v-if="editing" v-model="newTodoTxt" class="editable_active" type="text" placeholder="enter new todo" @click.stop="" autofocus>
            <div class="note-controls">
                <button @click.stop="addTodo" @mousedown.stop="" class="icon-btn"><i class="fas fa-plus"></i></button>
                <button class="icon-btn" @click="deleteNote" @mousedown.stop=""><i class="fas fa-trash-alt"></i></button>
                <button class="icon-btn" @click="" @mousedown.stop=""><i class="fas fa-share"></i></button>
                <input type="color" v-model="color" @change="updateColor" style="display: none" ref="colorPicker">
                <button class="icon-btn" @click="chooseColor" @mousedown.stop=""><i class="fas fa-palette"></i></button>
            </div>
        </li>
    `,
    data() {
        return {
            editing: false,
            newTodoTxt: '',
            color: this.note.color
        }
    },
    methods: {
        addTodo() {
            if (this.editin) return;
            this.editing = true;
            document.body.addEventListener('click', this.stopEditing);
            eventBus.$emit('started-editing')
        },
        stopEditing(ev) {
            ev.stopPropagation();
            this.editing = false;
            if (this.newTodoTxt) this.$emit('new-todo', this.newTodoTxt, this.note.id);            
            document.body.removeEventListener('click', this.stopEditing);
            this.newTodoTxt = '';
            eventBus.$emit('stopped-editing')
        },
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