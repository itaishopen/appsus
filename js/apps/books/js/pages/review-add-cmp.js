import bookService from '../services/books-service.js'
import reviewsList from '../cmps/review/review-list-cmp.js'
import starRating from '../cmps/review/star-rating-cmp.js'
import utilService from '../services/util-service.js'
import { eventBus, EVENT_FEEDBACK } from '../event-bus.js'


export default {
    template: `
    <section v-if="book" class="review-book">
        <button  class="back-btn fas fa-arrow-circle-left" @click="back"></button>
        <div class="flex space-around">
            <form class="flex column align-center" @submit.prevent="onSave">
                <h1 class="form-header">Book review</h1>
                <h3>user name:</h3>
                <input autofocus type="text" v-model="bookReview.userName" />
                <h3>Book name:</h3>
                <input type="text" v-model="bookReview.bookName" disabled />
                <h3>Star:</h3>
                <star-rating :show-rating='false' v-model="bookReview.selectedStar" :increment='0.5' :star-size='30'></star-rating>
                <h3>Read at: </h3>
                <input v-model="bookReview.dateRead"  type="date"/>
                <h3>comments:</h3>
                <textarea  v-model="bookReview.comments" placeholder="enter a comment"></textarea>
                <button type="submit" :disabled="!isValid">Save</button>
            </form>
            <reviews-list :reviews="listOfReviews" v-if="listOfReviews" @deleteReview="onDeleteReview"
            :bookSelectedId="this.book.id"></reviews-list> 
        </div>
    </section>
    `,

    data() {
        return {
            book: null,
            listOfReviews: null,
            bookId: null,
            bookReview: {
                id: utilService.makeId(),
                userName: 'Books Reader',
                bookName: null,
                dateRead: bookService.getTodayFormatted(),
                selectedStar: 2.5,
                comments: null
            }
        }
    },
    created() {
        this.book = bookService.getBookById(this.$route.params.bookId)
        this.bookId = this.book.id;
        this.bookReview.bookName = this.book.title;
        this.listOfReviews = this.book.reviews;
    },
    methods: {
        onSave() {
            bookService.writeAReview(this.bookId, this.bookReview);
            eventBus.$emit(EVENT_FEEDBACK,{txt: 'Your review was Saved', link: ''},'success');
            this.$router.push(`/book/${this.bookId}`);
        },
        onDeleteReview(reviewId) {
            bookService.deleteAReview(this.bookId, reviewId);
            eventBus.$emit(EVENT_FEEDBACK,{txt: 'Your review was deleted', link: ''},'success')
        },
        back() {
            this.$router.push(`/book/${this.bookId}`)
        },
        
    },
    computed: {
        isValid() {
            return this.bookReview.comments && this.bookReview.dateRead <= bookService.getTodayFormatted()
        },
    },
    components: {
        reviewsList,
        starRating,
    }
}