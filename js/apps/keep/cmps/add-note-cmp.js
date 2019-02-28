export default {
    template: `
        <section>
            <select name="type" v-model="selected">
                <option value="txt">Text</option>
                <option value="todos">Todos</option>
                <option value="img">Image</option>
                <option value="vid">Video</option>
            </select>
            <input type="text" placeholder="title" v-model="title">
            <ul v-if="selected === 'todos'" class="new-todos">
                <input type="text" v-for="todo in newTodos" v-model="todo.content" ref="newTodos">
            </ul>
            <input type="text" :placeholder="placeholder" v-model="content" @input="keepNewTodo">
            <input type="file" v-if="selected === 'img'" @change="getImgUrl">
            <img class="note-img-preview" :src="imgUrl" v-show="showImgPrev">
            <input type="color" v-model="color">
            <button @click="addNote">Add</button>
        </section>
    `,
    data() {
        return {
            selected: 'txt',
            title: '',
            content: '',
            color: '#ffffff',
            newTodos: [],
            showImgPrev: false,
            imgUrl: null
        }
    },
    methods: {
        addNote() {
            let content = this.content;
            if (this.selected === 'todos') content = this.newTodos.map(todo => todo.content);
            if (this.selected === 'img' && this.showImgPrev) content = this.imgUrl;
            this.$emit('add', { type: this.selected, color: this.color, title: this.title, content })
            this.title = '';
            this.content = '';
            this. newTodos = [];
            this.showImgPrev = false;
            this.imgUrl = null;
        },
        keepNewTodo() {
            if (this.selected !== 'todos') return;
            let todoContent = this.content;
            this.newTodos.push({ content: todoContent });
            this.content = '';
            Vue.nextTick()
                .then(() => this.$refs.newTodos[this.newTodos.length - 1].focus());
        },
        getImgUrl(ev) {
            let file = ev.target.files[0];
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                // this.$refs.imgPrev.src = reader.result
                this.imgUrl = reader.result;
                this.showImgPrev = true;
            }, false);
            if (file) reader.readAsDataURL(file);
        }
    },
    computed: {
        placeholder() {
            switch (this.selected) {
                case 'txt': return 'text'
                case 'todos': return 'todo'
                case 'img': return 'image link'
                case 'vid': return 'vid embed link'
            }
        },
    },
    created() {

    }
}
