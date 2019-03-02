import bookService from '../services/books-service.js'
import { eventBus, EVENT_FEEDBACK } from '../../../services/eventbus-service.js'


export default {
    template: `
    <section class="book-add book-filter flex column">
        <div class="flex justify-center">
        <input type="search"  v-model="searchInput" @input="onSearch"
        placeholder="Search a book in google" title="search in google" >
        </div>
        <ul v-if="booksList" class="google-res" >
            <li v-for="book in booksList" @click="addBook(book)">
                <div class="flex space-between align-center">
                <p>{{book.volumeInfo.title}} by <span v-if="book.volumeInfo.authors">{{book.volumeInfo.authors.toString()}}</span></p>
                <button class="fas fa-plus-circle close-btn btn"></button>
                </div>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            searchInput: '',
            booksList: null,
        }
    },
    created() {

    },
    methods: {
        onSearch() {
            if (this.searchInput === '') this.booksList = null;
            else {
                bookService.getBooksData(this.searchInput)
                    .then(res => this.booksList = res.data.items)
                    .catch(err => console.log(err))
            }
        },
        addBook(book) {
            try {
                bookService.addBook(book)
                    .then(() => {
                        let txt = 'To book';
                        let URL = `http://127.0.0.1:5500/index.html#/book/${book.id}`;
                        eventBus.$emit(EVENT_FEEDBACK,{txt: `The book was added to your list `,link: `/book/${book.id}`},'success')
                        this.$emit('renderBooks');
                    })
            } catch (err) {
                console.log('err in add', err)
            }

        }
    }
}

