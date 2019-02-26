import bookService from '../services/books-service.js';

export default {
    props: ['book'],
    template: `
         <li class="book-preview flex column align-center justify-center">
            <img :src="book.thumbnail" />
            <div class="book-txt flex column space-between">
                <h3>{{book.title}}</h3>
                <p> {{isForSale}} {{currencyIcon}}</p>
            </div>
        </li>
    `,
    data() {
        return {
            currencyIcon: bookService.iconCurrency(this.book.id),
        }
    },
    computed: {
        isForSale() {
            let price = this.book.listPrice.amount;
            return (price === 0) ? 'Not for sale' : 'Amount: ' + price;
        }
    }
}