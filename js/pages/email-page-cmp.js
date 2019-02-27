import emailServices from '../apps/email/services/email-service.js'
import emailFilter from '../apps/email/cmps/email-filter-cmp.js'
import emailList from '../apps/email/cmps/email-list-cmp.js'
import emailStatus from '../apps/email/cmps/email-status-cmp.js'
// import emailSearch from './email-search.cmp.js'
// import emailSort from '../apps/email/cmps/'
import { eventBus, EVENT_FEEDBACK } from '../services/eventbus-service.js'

export default {
    template: `
        <section class="email-app-container">
            <div class="email-actions-toolbar">
            <router-link to="/"><i class="fas fa-arrow-circle-left"></i>Back</router-link>
                <!-- <email-search @searchEmail="searchEmail"></email-search> -->
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
            .then(() => {
                this.emails = emailServices.getEmails();
                this.unreadEmails = this.checkEmailStatus();
                eventBus.$emit(EVENT_FEEDBACK, { txt: 'Welcome to your inbox!', link: '' }, 'welcome')
            });

    },
    methods: {
        setFilter(filter) {
            this.filter = filter;
            emailServices.query(this.filter)
                .then(() => {
                    this.emails = emailServices.getEmails();
                });
        },
        checkEmailStatus() {
            return this.emails.filter(email => !email.isRead).length;
        },
        deleteMail(emailId) {
            emailServices.deleteAnEmail(emailId)
                .then(emails => {
                    this.emails = emails;
                    this.$router.push('/email');
                })
        },
        // searchEmail(searchParam) {
        //     emailServices.query(this.filter)
        //         .then(emails => {
        //             this.emails = emailServices.searchEmails(emails, searchParam);
        //         })
        // },
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
        // emailSearch,
        // emailSort,
    }
}