import utilService from '../../../services/util-service.js'

export default {
    template: `
        <section :class="{white_txt: isDark}" class="add-note" :style="{backgroundColor: color}">
            <input type="text" placeholder="title" v-model="title" class="note-header">
            <ul v-if="selected === 'todos'" class="new-todos">
                <input type="text" v-for="todo in newTodos" v-model="todo.content" ref="newTodos" placeholder="To-Do">
            </ul>
            <div class="note-txt" @keydown="isEmpty=false" @keyup="updateContent" ref="mainTxt" :class="{empty: isEmpty}" :data-type="selected"
                 contenteditable></div>
            <img class="note-img-preview" :src="imgUrl" v-show="showImgPrev">
            <input type="file" v-if="selected === 'img'" style="display: none" @input="getImgUrl" ref="filePicker">
            <input type="color" v-model="color" style="display: none" ref="colorPicker">
            <div class="add-controls">
                <button class="icon-btn" @click="selected = 'txt'"><i class="fas fa-font"></i></button>
                <button class="icon-btn" @click="selected = 'todos'"><i class="fas fa-list-ul"></i></button>
                <button class="icon-btn" @click="selected = 'img'"><i class="fas fa-image"></i></button>
                <button class="icon-btn" @click="selected = 'vid'"><i class="fab fa-youtube"></i></button>
                <button class="icon-btn" @click="chooseColor"><i class="fas fa-palette"></i></button>
                <button class="icon-btn" @click="chooseFile" v-show="selected === 'img'"><i class="fas fa-file-upload"></i></button>
                <button class="icon-btn" @click="addNote"><i class="fas fa-check"></i></button>
            </div>
            <!-- <select name="type" v-model="selected">
                <option value="txt">Text</option>
                <option value="todos">Todos</option>
                <option value="img">Image</option>
                <option value="vid">Video</option>
            </select> -->
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
            imgUrl: null,
            isEmpty: true
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
            this.$refs.mainTxt.innerText = '';
            this.newTodos = [];
            this.showImgPrev = false;
            this.imgUrl = null;
            this.color = '#ffffff';
            this.$refs.filePicker.value = '';
        },
        updateContent(ev) {
            this.content = ev.target.innerText;
            this.isEmpty = (this.$refs.mainTxt.innerText.trim() === '');
            this.keepNewTodo(ev);
        },
        keepNewTodo(ev) {
            if (this.selected !== 'todos') return;
            let todoContent = this.content;
            this.newTodos.push({ content: todoContent });
            this.content = '';
            ev.target.innerText = '';
            this.isEmpty = true;
            Vue.nextTick()
                .then(() => this.$refs.newTodos[this.newTodos.length - 1].focus());
        },
        getImgUrl(ev) {
            let file = ev.target.files[0];
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                this.imgUrl = reader.result;
                this.showImgPrev = true;
            }, false);
            if (file) reader.readAsDataURL(file);
        },
        chooseColor() {
            this.$refs.colorPicker.click();
        },
        chooseFile() {
            this.$refs.filePicker.click();
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
        isDark() {
            console.log(utilService.getBrightness(this.color) < 50);
            
            return utilService.getBrightness(this.color) < 50;
        }
    },
    created() {

    }
}


