import bookService from '../apps/books/services/books-service.js';
import bookList from '../apps/books/cmps/book-list-cmp.js';
import bookFilter from '../apps/books/cmps/book-filter-cmp.js';
import bookAdd from'../apps/books/cmps/book-add-cmp.js'


export default {
    template: `
    <section class="book-app">
        <div class="books-header">
            <h1>Miss books</h1>
            <img  src="img/Open-Book.png" alt="">
        </div>
        <book-filter v-if="!selectedBook" @filtered="setFilter"></book-filter>     
        <book-add @renderBooks="renderList"></book-add>
        <book-list :books="booksToShow" @selectBook="onSelectBook"></book-list>  
    </section>
    `,
    data() {
        return {
            selectedBook: null,
            filteredBooks: null,
            books :[],
        }
    },
    created() {
		bookService.init().then(books => this.books = books);
    },
    mounted() {
        document.querySelector('title').innerHTML = 'Miss books';
        document.getElementById('favicon').href = 'img/book-Icon.png';
        document.querySelector('.logo-img').src = 'img/final-horse-circle.png';
        if (document.body.classList.contains('open')) {
            document.querySelector(".mobile-menu-button").classList.toggle("change");
            document.body.classList.toggle('open');
        }
    },
    methods: {
        onSelectBook(book) {
            this.selectedBook = book
        },
        setFilter(filter) {
            if (filter) this.filteredBooks = bookService.getBooks(filter);
            else this.filteredBooks = null;
        },
        renderList() {
            this.books = bookService.getBooks();
        }
    },
    computed: {
        booksToShow() {
            return this.filteredBooks ? this.filteredBooks : this.books;
        }
    },
    components: {
        bookList,
        bookFilter,
        bookAdd,        
    }
}

