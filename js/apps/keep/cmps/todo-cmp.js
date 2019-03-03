import {eventBus} from '../../../services/eventbus-service.js'

export default {
    props: ['todo', 'noteId'],
    template: `
        <li class="todo">
            <span @click="toggleIsDone" @mousedown.stop="" class="todo-txt" :class="{todoDone: isDone}">{{todoTxt}}</span>
            <button @click="deleteTodo" @mousedown.stop="" class="icon-btn delete-todo-btn"><i class="fas fa-times"></i></button>
        </li>
    `,
    data() {
        return {
            
        }
    },
    methods: {
       deleteTodo() {           
           eventBus.$emit('deleteTodo', this.todo.id, this.noteId)
        },
        toggleIsDone(){            
            eventBus.$emit('toggleIsDone', this.todo.id, this.noteId)
        }
    },
    computed: {
        todoTxt() {
            return this.todo.todoTxt;
        },
        isDone() {
            return this.todo.isDone
        }
    },
    created() {
        
    }
}
