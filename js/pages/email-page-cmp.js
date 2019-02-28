import emailServices from '../apps/email/services/email-service.js'
import emailFilter from '../apps/email/cmps/email-filter-cmp.js'
import emailList from '../apps/email/cmps/email-list-cmp.js'
import emailStatus from '../apps/email/cmps/email-status-cmp.js'
import emailSearch from '../apps/email/cmps/email-search-cmp.js'
import emailSort from '../apps/email/cmps/email-sort-cmp.js'
import emailCompose from '../apps/email/cmps/email-compose-cmp.js'
import emailReply from '../apps/email/cmps/email-reply-cmp.js'
import { eventBus, EVENT_FEEDBACK } from '../services/eventbus-service.js'
import utilService from '../services/util-service.js';

export default {
    template: `
        <section class="email-app-container flex column">
            <div class="email-actions-toolbar flex space-between">
                <router-link class="flex space-evenly" to="/"><i class="fas fa-arrow-circle-left"></i>Back</router-link>
                <email-search @searchInEmails="searchInEmails"></email-search>
            </div>
            
            <div class="filter-sort-container flex column">
                <div class="upper-control flex">
                    <button class="compose-email-btn" @click="composeOpen"><i class="fas fa-plus"></i>Compose</button>
                    <email-sort @sort="sort"></email-sort>
                    <button v-if="filter === 'trash' || filter === 'draft'" class="delete-all" @click="deleteAll"><i class="fas fa-dumpster fa-2x"></i></button>
                </div>
                <div class="main-container flex">
                    <email-filter :unreadEmails="unreadEmails" @setFilter="setFilter"></email-filter>
                    <email-list :emails="emails" @deleteEmail="deleteMail" @restoreEmail="restoreEmail" @replyToEmail="replyToEmail" @markAsUnread="markAsUnread" @markAsRead="markAsRead"></email-list>
                </div>
                <email-reply v-if="isReply" @replyClose="replyClose" @sendEmail="replyClose" :emailForReply="emailForReply"></email-reply>
                <email-compose v-if="isCompose" @composeClose="composeClose"></email-compose>
            </div>
        </section>
    `,
    data() {
        return {
            emails: [],
            unreadEmails: 0,
            filter: 'inbox',
            isCompose: false,
            isReply: false,
            emailForReply: {},
            sortParam: 'date',
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
            document.querySelector('title').innerHTML = 'Mr Email';
            document.getElementById('favicon').href = 'img/favicon5.ico';             
    },
    methods: {
        markAsUnread(emailId) {
            emailServices.getEmailById(emailId).then(email => {
                email.isRead = false
                emailServices.sendAnEmail(email)
                    .then(() => {
                        emailServices.query(this.filter)
                            .then(emails => {
                                this.emails = emails;
                                this.unreadEmails = this.checkEmailStatus();
                            })
                    })
            })
        },
        markAsRead(emailId) {
            emailServices.getEmailById(emailId).then(email => {
                email.isRead = true
                emailServices.sendAnEmail(email)
                    .then(() => {
                        emailServices.query(this.filter)
                            .then(emails => {
                                this.emails = emails;
                                this.unreadEmails = this.checkEmailStatus();
                            })
                    })
            })
        },
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
            this.sortParam = sortParam
            emailServices.onSort(this.sortParam)
                .then(emails => {
                    this.emails = emails;
                })
        },
        composeOpen() {
            this.isCompose = true;
        },
        composeClose() {
            this.isCompose = false;
        },
        replyToEmail(emailId) {
            emailServices.getEmailById(emailId)
                .then(email => {
                    this.emailForReply = email;
                    this.isReply = true;
                })
        },
        replyClose(emailData) {
            emailServices.sendAnEmail(emailData)
                .then(() => {
                    this.emailForReply = {};
                    this.isReply = false;
                    // eventBus.$emit(EVENT_FEEDBACK, { txt: 'Your email was sent do you want to view it?', link: `/email/${emailData.id}` }, 'success');
                })
        },
        deleteAll() {
            emailServices.delAllFolderEmails(this.emails).then(() => {
                emailServices.query(this.filter)
                    .then(emails => this.emails = emails)
            })
        }
    },
    components: {
        emailList,
        emailFilter,
        emailStatus,
        emailSearch,
        emailSort,
        emailCompose,
        emailReply,
    }
}