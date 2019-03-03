export default {
    template:`
    <form class="email-search flex space-around align-center" @submit.prevent="setFilter">
        <div class="search-tab">
            <input type="search"  v-model="inputSearch" placeholder="Search your emails" title="Type in a search parameter" @input="onSearch"/>
        </div>
        <div class="search-checkbox flex" title="Search in all emails">
            <input type="checkbox" id="all" value="all" v-model="selected">
            <label for="all">Search in all emails</label>
        </div> 
    </form>
    `,
    data() {
        return {
            inputSearch: '',
            selected: false
        }
    },
    methods: {
        onSearch() {
            this.$emit('searchInEmails', this.inputSearch, this.selected);
        },
    }
}