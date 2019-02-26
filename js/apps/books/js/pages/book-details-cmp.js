import longText from '../cmps/long-text-cmp.js'
import bookService from '../services/books-service.js';
import reviewsList from '../cmps/review/review-list-cmp.js';

export default {
    template: `
    <section v-if="book" class="book-details flex column">
        <div class="flex book-details-container">
            <div class="book-details-img">
                <img class="book-img"  :src="book.thumbnail">
            </div>

            <div class="book-details-header flex column align-center">
                <h1>{{book.title}}</h1>
                <h3>{{book.subtitle}}</h3>

                <p><span>authors: </span>{{book.authors.toString()}}</p>
                <h3>Published Date</h3>
                <h5>{{this.book.publishedDate}} - <span>{{bookAgeTxt}}</span></h5>

                <div  class="book-details-main flex column align-center">
                    <p class="book-desc"><span>description: </span>{{shortDesc}}</p>
                    <long-text v-if="showDesc" :str="this.book.description" :len=100></long-text>
                    <button class="more-btn" v-if="book.description.length > 100" v-on:click="continueRead">{{readMore}}
                    </button>
                    <p><span>page Count: </span>{{book.pageCount}} pages {{pageCountTxt}}</p>
                    <p><span>categories: </span>{{book.categories.toString()}}</p>
                    <p><span class="fa fa-globe"></span>: {{book.language}}</p>
                    <div class="amount flex">
                        <p :class="priceColoring"><span>amount: </span>{{isForSale}} {{currencyIcon}}</p>
                        <p> <span v-if="!book.listPrice.isOnSale"><img class="new-icon" src="img/new.png"></span><img class="sale-icon" v-else src="img/sale.png"></p>
                    </div>
                </div>
                <button  v-on:click="reviewBook"><i class="fas fa-pen"></i>Add review</button>
            </div>
        </div>
        <router-link v-if="isNextBook" class="next-btn" :to="goBook(1)">Next Book</router-link>
        <router-link v-if="isPrevBook" class="prev-btn" :to="goBook(-1)">Previous Book</router-link>
        <reviews-list class="flex" :bookSelectedId="book.id" :reviews="reviews" v-if="reviews" @deleteReview="onDeleteReview"></reviews-list>
    </section>
    `,
    data() {
        return {
            book: bookService.getBookById(this.$route.params.bookId),
            showDesc: false,
            reviews: bookService.getBookById(this.$route.params.bookId).reviews,
            currencyIcon: bookService.iconCurrency(this.$route.params.bookId),
            bookIdx: bookService.getBookIdx(this.$route.params.bookId),
            isNextBook: null,
            isPrevBook: null,
        }
    },
    created() {
        this.isNextBook = this.bookIdx < bookService.getBooks().length - 1;
        this.isPrevBook = this.bookIdx > 0;
    },
    watch: {
        '$route.params.bookId': function (id) {
            this.book = bookService.getBookById(id);
            this.bookIdx = bookService.getBookIdx(id);
            this.isNextBook = this.bookIdx < bookService.getBooks().length - 1;
            this.isPrevBook = this.bookIdx > 0;
            this.showDesc = false;
            this.reviews = bookService.getBookById(id).reviews;
            this.currencyIcon = bookService.iconCurrency(id);
        }
    },
    methods: {
        continueRead() {
            this.showDesc = !this.showDesc;
        },
        reviewBook() {
            this.$router.push(`/bookReview/${this.book.id}`);
        },
        onDeleteReview(idx) {
            bookService.deleteAReview(this.book.id, idx)
        },
        goBook(num) {
            let bookId = bookService.getBookByIdx(this.bookIdx + (+num)).id;
            return `/book/${bookId}`
        },
    },
    computed: {
        pageCountTxt() {
            var numOfPages = this.book.pageCount;
            if (numOfPages < 100 && numOfPages > 0) return '"Light Reading"';
            else if (numOfPages > 200 && numOfPages <= 500) return '"Decent Reading"';
            else if (numOfPages > 500) return '"Long reading"';
            return '';
        },
        bookAgeTxt() {
            var currYear = (new Date()).getFullYear();
            if (this.book.publishedDate === '') return 'no publish date'
            var bookAge = currYear - this.book.publishedDate;
            if (bookAge > 10) return 'Veteran Book';
            else if (bookAge < 1) return 'New';
            return '';
        },
        priceColoring() {
            var bookPrice = this.book.listPrice.amount;
            if (bookPrice < 20 && bookPrice !== 0) return 'green';
            else if (bookPrice > 150) return 'red';
            return '';
        },
        shortDesc() {
            var bookDesc = this.book.description;
            if (bookDesc.length > 100) bookDesc = bookDesc.substring(0, 100);
            return bookDesc;
        },
        isForSale() {
            let price = this.book.listPrice.amount;
            return (price === 0) ? 'Not for sale' : price;
        },
        readMore() {
            return this.showDesc ? 'less' : 'more';
        }
    },
    components: {
        longText,
        reviewsList
    }
}
