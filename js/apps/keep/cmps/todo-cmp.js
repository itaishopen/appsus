export default {
    props: ['todo'],
    template: `
        <li class="todo">
            <span class="todo-txt" :class="{todoDone: isDone}">{{todoTxt}}</span>
        </li>
    `,
    data() {
        return {
            
        }
    },
    methods: {
        
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
