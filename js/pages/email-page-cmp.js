import emailServices from '../apps/email/services/email-service.js'
import emailFilter from '../apps/email/cmps/email-filter-cmp.js'
import emailList from '../apps/email/cmps/email-list-cmp.js'
import emailStatus from '../apps/email/cmps/email-status-cmp.js'
import emailSearch from '../apps/email/cmps/email-search-cmp.js'
import emailSort from '../apps/email/cmps/email-sort-cmp.js'
import { eventBus, EVENT_FEEDBACK } from '../services/eventbus-service.js'

export default {
    template: `
        <section class="email-app-container flex column">
            <div class="email-actions-toolbar flex space-around">
                <router-link to="/"><i class="fas fa-arrow-circle-left"></i>Back</router-link>
                <email-search @searchInEmails="searchInEmails"></email-search>
            </div>
            
            <div class="filter-sort-container flex column">
                <div class="upper-control flex">
                    <router-link class="compose-email-btn" to="/email/compose"><i class="fas fa-plus"> Compose</i></router-link>
                    <email-sort @sort="sort"></email-sort>
                </div>
                <div class="main-container flex">
                    <email-filter :unreadEmails="unreadEmails" @setFilter="setFilter"></email-filter>
                    <email-list :emails="emails" @deleteEmail="deleteMail" @restoreEmail="restoreEmail"></email-list>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            emails: [],
            unreadEmails: 0,
            filter: 'inbox',
        }
    },
    computed: {

    },
    created() {
        emailServices.query(this.filter)
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
            return this.emails.filter(email => !email.isRead && !email.isSent && !email.isDel).length;
        },
        deleteMail(emailId) {
            emailServices.deleteAnEmail(emailId)
                .then(() => {
                    emailServices.query(this.filter).then(emails => {
                        this.emails = emails;
                        this.unreadEmails = this.checkEmailStatus();
                    })
                })
        },
        restoreEmail(emailId) {
            emailServices.restoreAnEmail(emailId)
                .then(() => {
                    emailServices.query(this.filter).then(emails => {
                        this.emails = emails;
                        this.unreadEmails = this.checkEmailStatus();
                    })
                })
        },
        searchInEmails(searchParam) {
            emailServices.query(searchParam)
                .then(emails => this.emails = emails)
        },
        sort(sortParam) {
            emailServices.onSort(sortParam)
                .then(emails => {
                    console.log(emails)
                    this.emails = emails;
                })
        }
    },
    components: {
        emailList,
        emailFilter,
        emailStatus,
        emailSearch,
        emailSort,
    }
}