import emailServices from '../apps/email/services/email-service.js'
import emailFilter from '../apps/email/cmps/email-filter-cmp.js'
import emailList from '../apps/email/cmps/email-list-cmp.js'
import emailStatus from '../apps/email/cmps/email-status-cmp.js'
import emailSearch from '../apps/email/cmps/email-search-cmp.js'
// import emailSort from '../apps/email/cmps/'
import { eventBus, EVENT_FEEDBACK } from '../services/eventbus-service.js'

export default {
    template: `
        <section class="email-app-container">
            <div class="email-actions-toolbar">
                <router-link to="/"><i class="fas fa-arrow-circle-left"></i>Back</router-link>
                <email-search @searchInEmails="searchInEmails"></email-search>
            </div>
            <div class="filter-sort-container">
                <email-filter @setFilter="setFilter"></email-filter>
                <!-- <email-sort @sort="sort"></email-sort> -->
                <router-link class="compose-email-btn" to="/email/compose"><i class="fas fa-plus"></i></router-link>
                <email-status v-if="unreadEmails !== 0" :unReadEmailsCount="unreadEmails"></email-status>
            </div>
            <router-link to='/email'><email-list :emails="emails" @deleteEmail="deleteMail"></email-list></router-link> 
        </section>
    `,
    data() {
        return {
            emails: [],
            unreadEmails: 0,
            filter: 'all',
        }
    },
    computed: {

    },
    created() {
        emailServices.query()
            .then(emails => {
                this.emails = emails;
                this.unreadEmails = this.checkEmailStatus();
                eventBus.$emit(EVENT_FEEDBACK, { txt: 'Welcome to your inbox!', link: '' }, 'welcome')
            });

    },
    methods: {
        setFilter(filter) {
            this.filter = filter;
            emailServices.query(this.filter)
                .then(emails => {
                    this.emails = emails;
                });
        },
        checkEmailStatus() {
            return this.emails.filter(email => !email.isRead).length;
        },
        deleteMail(emailId) {
            emailServices.deleteAnEmail(emailId)
                .then(() => {
                    emailServices.query(emails => {
                        this.emails = emails;
                        this.unreadEmails = this.checkEmailStatus();
                    })
                })
        },
        searchInEmails(searchParam) {
            emailServices.query(searchParam)
                .then(emails => this.emails = emails)
        },
        // sort(sortParam) {
        //     emailServices.onSort(sortParam)
        //         .then(emails => {
        //             this.emails = emails;
        //             this.$router.push('/email');
        //         })
        // }
    },
    components: {
        emailList,
        emailFilter,
        emailStatus,
        emailSearch,
        // emailSort,
    }
}