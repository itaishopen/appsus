export default {
    template:`
    <form class="email-search flex space-around align-center" @submit.prevent="onSearch">
        <div class="search-tab">
            <input type="search"  v-model="inputSearch" placeholder="Search your emails" title="Type in a search parameter" @input="onSearch"/>
        </div>
        <div class="search-checkbox flex">
            <div class="search-label search-label-current">
                <input type="radio" id="current" value='current' v-model="selected">
                <label for="current">Current folder</label>
            </div>
            <div class="search-label search-label-all">
                <input type="radio" id="all" value='all' v-model="selected">
                <label for="all">All folders</label>
            </div>
        </div> 
    </form>
    `,
    data() {
        return {
            inputSearch: '',
            selected: 'current'
        }
    },
    watch: {
        'selected': function() {
            this.onSearch();
        }
    },
    methods: {
        onSearch() {
            this.$emit('searchInEmails', this.inputSearch, this.selected);
        },
        changeSelect(val) {
            this.selected = val
            this.onSearch()
        }
    }
}