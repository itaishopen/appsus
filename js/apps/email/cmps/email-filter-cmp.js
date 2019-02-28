export default {
    props: ['unreadEmails'],
    template:`
    <form class="email-filter flex column space-between" @submit.prevent="setFilter">
            <div class="tab">
                <input type="radio" id="inbox" value="inbox" checked v-model="filter"/>
                <label for="inbox">Inbox <span v-if="unreadEmails !== 0">{{unreadEmails}}</span></label>
            </div>
            <div class="tab">
                <input type="radio" id="sent" value="sent" v-model="filter" />
                <label for="sent">Sent</label>
            </div> 
            <div class="tab">
                <input type="radio" id="trash" value="trash" v-model="filter" />
                <label for="trash">Trash</label>
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
            filter: 'inbox',
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