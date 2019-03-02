export default {
    template: `
        <section class="book-filter flex"  >
            <input type="search"  v-model="inputSearch.byName" 
            placeholder="Search for a book title" title="Type in a name" @input="onSearch">

            <input type="number"  v-model="inputSearch.fromPrice" @input="onSearch"
            placeholder="minimum price" title="Type your min price" >

            <input type="number"  v-model="inputSearch.toPrice" @input="onSearch"
            placeholder="maximum price" title="Type your max price">
        </section>
  `,
    data() {
        var search = {byName: '', fromPrice:'', toPrice:Infinity}
        return {
            inputSearch: search,
        }
    },
    methods: {
        onSearch() {
            let search = this.inputSearch;
            if(search.byName === '' && search.fromPrice === '' && search.toPrice === '') search = null; 
            this.$emit('filtered', search);
        }
    }
}