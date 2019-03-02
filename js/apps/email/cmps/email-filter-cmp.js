export default {
    props: ['unreadEmails'],
    template:`
    <form class="email-filter flex column space-between" @submit.prevent="setFilter">
            <div class="tab flex">
                <input type="radio" id="inbox" value="inbox" checked v-model="filter"/>
                <label for="inbox" class="flex space-between" @click="menuClick"><span><i class="fas fa-inbox"></i>Inbox</span> <span v-if="unreadEmails !== 0">{{unreadEmails}}</span></label>
            </div>
            <div class="tab flex">
                <input type="radio" id="starred" value="starred" checked v-model="filter"/>
                <label for="starred" class="flex" @click="menuClick"><i class="fas fa-star"></i>Starred</label>
            </div>
            <div class="tab flex">
                <input type="radio" id="unread-filter" value="unread-filter" v-model="filter" />
                <label for="unread-filter" class="flex" @click="menuClick"><i class="fas fa-envelope"></i>Unread</label>
            </div> 
            <div class="tab flex">
                <input type="radio" id="read-filter" value="read-filter" v-model="filter" />
                <label for="read-filter" class="flex" @click="menuClick"><i class="fas fa-envelope-open"></i>Read</label>
            </div>
            <div class="tab flex">
                <input type="radio" id="sent" value="sent" v-model="filter" />
                <label for="sent" class="flex" @click="menuClick"><i class="fas fa-paper-plane"></i>Sent</label>
            </div> 
            <div class="tab flex">
                <input type="radio" id="draft" value="draft" v-model="filter" />
                <label for="draft" class="flex" @click="menuClick"><i class="fas fa-file-alt"></i>Draft</label>
            </div> 
            <div class="tab flex">
                <input type="radio" id="trash" value="trash" v-model="filter" />
                <label for="trash" class="flex" @click="menuClick"><i class="fas fa-trash-alt"></i>Trash</label>
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
        },
        menuClick() {
            if (document.body.classList.contains('show')) {
                document.getElementById("mobile-email-filter-button").classList.toggle("change-filter");
                document.body.classList.toggle('show');
            }
        },
    },
    watch: {
        'filter': function () {
            this.setFilter();
        },
        
    }
}