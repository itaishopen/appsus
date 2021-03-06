export default {
    props: ['unreadEmails'],
    template:`
    <form class="email-sort flex space-between" @submit.prevent="setSortBy">
            <div class="tab flex">
                <input type="radio" id="date" value="date" checked v-model="sortBy" @click="setSortBy('date')"/>
                <label for="date">Date</label>
            </div>
            <div class="tab flex">
                <input type="radio" id="subject" value="subject" v-model="sortBy" @click="setSortBy('subject')" />
                <label for="subject">Subject</label>
            </div> 
            <div class="tab flex">
                <input type="radio" id="sender" value="sender" v-model="sortBy" @click="setSortBy('sender')"/>
                <label for="sender">Sender</label>
            </div>
            <div class="tab flex">
                <button type="button" id="read" value="name" @click="setSortBy(name)">{{name}}</button>
            </div>
        </form>
    `,
    data() {
        return {
            sortBy: 'date',
            isRead: false,
        }
    },
    methods: {
        setSortBy(val) {
            if (val === 'unread') {
                this.isRead = true;
            } else if (val === 'read') {
                this.isRead = false;
            }
            this.sortBy = val
            this.$emit('sort', this.sortBy)
        },
        

    },
    computed: {
        name() {
            return this.isRead ? 'read' : 'unread'
        },
    }
}