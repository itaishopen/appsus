import starRating from './star-rating-cmp.js'
import longReview from './review-long-comment-cmp.js'
import longText from '../long-text-cmp.js'


export default {
    props: ['bookSelectedId', 'reviews'],
    template: ` 
    <section class="review-list flex column justify-center">  
        <h1 v-if="reviews">Book reviews</h1>
        <div class="book-reviews flex space-around">
            <ul  class="flex">
                <li class="reviews-item flex column space-between" v-for="(review,idx) in reviews">
                    <button class="delete-btn" @click="deleteReview(review.id)"><i class="fas fa-user-times"></i></button>
                    <p>star: </p>
                    <star-rating :show-rating='false' :rating='review.selectedStar' :star-size='13' :read-only='true' :increment='0.5'></star-rating>
                    <p>comments: </p>
                    <long-review :str="review.comments" :len=50></long-review>
                    <long-text v-if="showDesc" :str="review.comments" :len=50></long-text>
                    <button class="more-btn" v-if='review.comments.length > 50' v-on:click="continueRead">{{buttonTag}}</button>
                    <h5>writer: {{review.userName}}</h5>
                    <p>read on: {{review.dateRead}}</p>

                </li>
            </ul>
        </div>
    </section>
    `
    ,
    data() {
        return {
            bookId: this.bookSelectedId,
            showDesc: false
        }
    },
    methods: {
        deleteReview(idx) {
            this.$emit('deleteReview', idx);
        },
        continueRead() {
            this.showDesc = !this.showDesc;
        }
    },
    computed: {
        buttonTag() {
            return this.showDesc ? 'less' : 'more';
        },
    },
    components: {
        longText,
        starRating,
        longReview,
    }
}