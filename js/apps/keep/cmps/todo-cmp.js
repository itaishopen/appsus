import {eventBus} from '../../../services/eventbus-service.js'

export default {
    props: ['todo', 'noteId'],
    template: `
        <li class="todo">
            <span @click="toggleIsDone" class="todo-txt" :class="{todoDone: isDone}">{{todoTxt}}</span>
            <button @click="deleteTodo">X</button>
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
