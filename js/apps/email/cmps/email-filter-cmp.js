export default {
    template:`
    <form class="email-filter" @submit.prevent="setFilter">
            <div class="tab">
                <input type="radio" id="all" value="all" checked v-model="filter"/>
                <label for="all">All</label>
            </div>
            <div class="tab">
                <input type="radio" id="read" value="read" v-model="filter" />
                <label for="read">Read</label>
            </div>
            <div class="tab">
                <input type="radio" id="unread-filter" value="unread" v-model="filter" />
                <label for="unread-filter">Unread</label>
            </div> 
        </form>
    `,
    data() {
        return {
            filter: 'all',
        }
    },
    methods: {
        setFilter() {
            this.$emit('setFilter', this.filter)
        }
    },
    watch: {
        'filter': function () {
            this.setFilter();
        },
        
    }
}