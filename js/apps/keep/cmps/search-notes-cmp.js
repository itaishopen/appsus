import searchItem from './search-item-cmp.js'

export default {
    components: {
        searchItem
    },
    template: `
        <section class="search-notes">
            <div class="search-input">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="type to search" v-model="searchInput" @input="toggleRes">
            </div>
            <ul class="search-res" v-if="!hidingRes && searchResults.length">
                    <search-item
                    v-for="note in searchResults"
                    :note="note"
                    :key="note.id"
                    @click.native.stop="resClicked"></search-item>
            </ul>
        </section>
    `,
    props: ['notes'],
    data() {
        return {
            searchInput: '',
            hidingRes: true
        }
    },
    methods: {
        toggleRes() {         
            if (!this.hidingRes && !this.searchInput.trim()) this.hideRes();
            else if (this.hidingRes && this.searchInput.trim()) this.showRes();
        },
        hideRes() {
            this.hidingRes = true;
            document.body.removeEventListener('click', this.hideRes);
        },
        showRes() {
            this.hidingRes = false;
            document.body.addEventListener('click', this.hideRes);
        },
        resClicked() {
            this.searchInput = '';
            this.showingRes = false;
        }
    },
    computed: {
        searchResults() {
            if (!this.searchInput.trim()) return [];
            let regex = new RegExp(this.searchInput.trim(), 'i');            
            return this.notes.filter(note => regex.test(note.header) || regex.test(note.content))
        }
    }
}