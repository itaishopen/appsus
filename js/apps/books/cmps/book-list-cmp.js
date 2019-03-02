import bookPreview from './book-preview-cmp.js';

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul class="flex">
                <li v-for="(book,idx) in books" class="flex column"  v-on:click="selected(book)">
                    <book-preview :book="book"></book-preview>
                </li>
            </ul>
        </section>
    `,
    methods: {
        selected(book) {
            this.$router.push(`/book/${book.id}`);
        },
    },
    components: {
        bookPreview
    }
}