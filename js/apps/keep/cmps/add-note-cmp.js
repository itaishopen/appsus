export default {
    template: `
        <section>
            <select name="type" v-model="selected">
                <option value="txt">Text</option>
                <option value="todos">Todos</option>
                <option value="img">Image</option>
                <option value="vid">Video</option>
            </select>
            <template v-if="selected === 'txt'">
                <input type="text" placeholder="title" v-model="title">
                <input type="text" placeholder="text" v-model="content">
                <button @click="addNote">Add</button>
            </template>
            <template v-if="selected === 'todos'">
                <input type="text" placeholder="title" v-model="title">
                <input type="text" placeholder="todos (seperate with commas)" v-model="content">
                <button @click="addNote">Add</button>
            </template>
            <template v-if="selected === 'img'">
                <input type="text" placeholder="title" v-model="title">
                <input type="text" placeholder="image link" v-model="content">
                <button @click="addNote">Add</button>
            </template>
            <template v-if="selected === 'vid'">
                <input type="text" placeholder="title" v-model="title">
                <input type="text" placeholder="vid embed link" v-model="content">
                <button @click="addNote">Add</button>
            </template>
        </section>
    `,
    data() {
        return {
            selected: 'txt',
            
            title: '',
            content: '',
        }
    },
    methods: {
        addNote() {
            this.$emit('add', {type: this.selected, title: this.title, content: this.content})
        }
    },
    computed: {

    },
    created() {
        
    }
}
