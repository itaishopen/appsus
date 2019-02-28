export default {
    template:`
    <form class="email-search" @submit.prevent="setFilter">
            <div class="search-tab">
                <input type="search"  v-model="inputSearch" placeholder="Search in your emails" title="Type in a search parameter" @input="onSearch">
            </div> 
        </form>
    `,
    data() {
        return {
            inputSearch: ''
        }
    },
    methods: {
        onSearch() {
            this.$emit('searchInEmails', this.inputSearch);
        },
    }
}