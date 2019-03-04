import emailServices from '../apps/email/services/email-service.js'
import emailFilter from '../apps/email/cmps/email-filter-cmp.js'
import emailList from '../apps/email/cmps/email-list-cmp.js'
import emailStatus from '../apps/email/cmps/email-status-cmp.js'
import emailSearch from '../apps/email/cmps/email-search-cmp.js'
import emailSort from '../apps/email/cmps/email-sort-cmp.js'
import emailCompose from '../apps/email/cmps/email-compose-cmp.js'
import emailReply from '../apps/email/cmps/email-reply-cmp.js'
import emailDetails from '../apps/email/cmps/email-details-cmp.js'
import emailActions from '../apps/email/cmps/multipul-emails-check-btn-cmp.js'
import keepService from '../apps/keep/service/keep-service.js'
import { eventBus, EVENT_FEEDBACK } from '../services/eventbus-service.js'

export default {
    template: `
        <section class="email-app-container flex column">
            <div class="email-actions-toolbar flex align-center justify-center">
                <div id="mobile-email-filter-button" class="mobile-email-filter-button" @click="toggleMenu">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
                <email-search @searchInEmails="searchInEmails"></email-search>
            </div>  
            <div class="filter-sort-container flex column">
                <div class="upper-control flex">
                <button class="compose-email-btn" @click="composeOpen"><i class="fas fa-plus gradient-color"></i><span class="compose-email-txt">Compose</span></button>
                    <email-sort v-if="checkedEmailsNum === 0" @sort="sort"></email-sort>
                    <email-actions v-if="checkedEmailsNum > 0" :checkedEmails="checkedEmails" @renderEmails="backBtn"></email-actions>
                </div>
                <div class="main-container flex">
                    <email-filter :unreadEmails="unreadEmails" @setFilter="setFilter"></email-filter>
                    <email-list v-if="!isReply && !isCompose && !isShow" :emails="emails" @deleteEmail="deleteMail" @restoreEmail="restoreEmail" @replyToEmail="replyToEmail" @changeEmail="changeEmail" @sendDraft="sendDraft" @openEmail="openEmail"></email-list>
                    <email-details v-if="isShow" :email="emailToShow" @backBtn="backBtn" @replyToEmail="replyToEmail"></email-details>
                    <email-reply v-if="isReply && !isCompose && !isShow" @replyClose="replyClose" @sendEmail="replyClose" :emailForReply="emailForReply"></email-reply>
                    <email-compose v-if="isCompose && !isReply && !isShow" @composeClose="composeClose" @backBtn="backBtn"></email-compose>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            emails: [],
            unreadEmails: 0,
            checkedEmails: [],
            checkedEmailsNum: 0,
            filter: 'inbox',
            isCompose: false,
            isReply: false,
            isShow: false,
            emailToShow: {},
            emailForReply: {},
            sortParam: 'date',

        }
    },
    computed: {

    },
    created() {
        if (!emailServices.checkLoggedUser()) return this.$router.push('/')
        emailServices.query(this.filter)
            .then(emails => {
                this.emails = emails;
                this.checkEmailStatus();
                this.checkedEmails = this.emails.filter(email => email.isCheck);
                this.checkedEmailsNum = this.checkedEmails.length;
                eventBus.$emit(EVENT_FEEDBACK, { txt: 'Welcome to your inbox!', link: '' }, 'welcome')
            });
        let noteId = this.$route.params.noteId
        if (noteId) {
            keepService.getNotes().then(notes => {
                let note = notes.filter(note => note.id === noteId)[0]
                this.emailForReply = {
                    recipient: '',
                    sender: 'awesome@devil.com',
                    subject: note.header,
                    body: note.content,
                }
                this.isReply = true;
            })

        }
        document.querySelector('title').innerHTML = 'Mr Email';
        document.getElementById('favicon').href = 'img/mr-email.png';
        document.querySelector('.logo-img').src = 'img/mr-email.png';
        if (document.body.classList.contains('show')) {
            document.getElementById("mobile-email-filter-button").classList.toggle("change-filter");
            document.body.classList.toggle('show');
        }
        if (document.body.classList.contains('open')) {
            document.querySelector(".mobile-menu-button").classList.toggle("change");
            document.body.classList.toggle('open');
        }
    },
    mounted() {
        document.querySelector('title').innerHTML = 'Mr Email';
        document.getElementById('favicon').href = 'img/mr-email.png';
        document.querySelector('.logo-img').src = 'img/mr-email.png';
        if (document.body.classList.contains('show')) {
            document.getElementById("mobile-email-filter-button").classList.toggle("change-filter");
            document.body.classList.toggle('show');
        }
        if (document.body.classList.contains('open')) {
            document.querySelector(".mobile-menu-button").classList.toggle("change");
            document.body.classList.toggle('open');
        }
    },
    methods: {
        backBtn() {
            emailServices.query(this.filter)
                .then(emails => {
                    this.isCompose = false;
                    this.isReply = false;
                    this.isShow = false;
                    this.emails = emails;
                    this.checkEmailStatus();
                    this.checkedEmails = this.emails.filter(email => email.isCheck);
                    this.checkedEmailsNum = this.checkedEmails.length;
                })
        },
        openEmail(emailId) {
            emailServices.getEmailById(emailId).then(email => {
                email.isRead = true;
                emailServices.sendAnEmail(email)
                    .then(() => {
                        emailServices.query(this.filter)
                            .then(emails => {
                                this.emailToShow = email;
                                this.isShow = true;
                                this.isCompose = false;
                                this.isReply = false;
                                this.emails = emails;
                                this.checkEmailStatus();
                                this.checkedEmails = this.emails.filter(email => email.isCheck);
                                this.checkedEmailsNum = this.checkedEmails.length;
                            })
                    })
            })
        },
        changeEmail(emailId, change) {
            emailServices.getEmailById(emailId).then(email => {
                switch (change) {
                    case 'star':
                        email.isStar = !email.isStar;
                        break;
                    case 'check':
                        email.isCheck = !email.isCheck;
                        break;
                    case 'unread':
                        email.isRead = false;
                        break;
                    case 'read':
                        email.isRead = true;
                        break;
                }
                emailServices.sendAnEmail(email)
                    .then(() => {
                        emailServices.query(this.filter)
                            .then(emails => {
                                this.emails = emails;
                                this.checkEmailStatus();
                                this.checkedEmails = this.emails.filter(email => email.isCheck);
                                this.checkedEmailsNum = this.checkedEmails.length;
                            })
                    })
            })
        },
        setFilter(filter) {
            this.filter = filter;
            this.isCompose = false;
            this.isReply = false;
            this.isShow = false;
            emailServices.query(this.filter)
                .then(emails => {
                    this.emails = emails;
                    this.checkEmailStatus();
                });
        },
        checkEmailStatus() {
            return emailServices.unreadEmails().then(num => this.unreadEmails = num);
        },
        deleteMail(emailId) {
            emailServices.deleteAnEmail(emailId)
                .then(() => {
                    emailServices.query(this.filter).then(emails => {
                        this.emails = emails;
                        this.checkEmailStatus();
                        this.checkedEmails = this.emails.filter(email => email.isCheck);
                        this.checkedEmailsNum = this.checkedEmails.length;
                    })
                })
        },
        restoreEmail(emailId) {
            emailServices.restoreAnEmail(emailId)
                .then(() => {
                    emailServices.query(this.filter).then(emails => {
                        this.emails = emails;
                        this.checkEmailStatus();
                        this.checkedEmails = this.emails.filter(email => email.isCheck);
                        this.checkedEmailsNum = this.checkedEmails.length;
                    })
                })
        },
        searchInEmails(searchParam, searchLoc) {            
            if (searchLoc === 'all') {
                emailServices.onSearch(searchParam, searchLoc)
                    .then(emails => {
                            this.emails = emails
                            this.checkEmailStatus();
                        })
            } 
            if(searchLoc === 'current') {
                emailServices.onSearch(searchParam)
                    .then(emails => {
                        this.emails = emails
                        this.checkEmailStatus();
                    })
            }
        },
        sort(sortParam) {
            this.sortParam = sortParam
            emailServices.onSort(this.sortParam)
                .then(emails => {
                    this.emails = emails;
                    this.checkEmailStatus();
                })
        },
        composeOpen() {
            this.isCompose = true;
            this.isReply = false;
            this.isShow = false;

        },
        composeClose() {
            this.isCompose = false;
        },
        replyToEmail(emailId) {
            emailServices.getEmailById(emailId)
                .then(email => {
                    email.subject = 'Re: ' + email.subject;
                    this.emailForReply = email;
                    this.isReply = true;
                    this.isShow = false;
                    this.isCompose = false;
                })
        },
        sendDraft(emailId) {
            emailServices.getEmailById(emailId)
                .then(email => {
                    let emailSender = email.sender
                    email.sender = email.recipient;
                    email.recipient = emailSender;
                    email.isDraft = false
                    this.emailForReply = email;
                    this.isReply = true;
                })
        },
        replyClose(emailData) {
            emailServices.sendAnEmail(emailData)
                .then(() => {
                    this.emailForReply = {};
                    this.isReply = false;
                })
        },
        deleteAll() {
            emailServices.delAllFolderEmails(this.emails).then(() => {
                emailServices.query(this.filter)
                    .then(emails => this.emails = emails)
            })
        },
        toggleMenu() {
            if (document.body.classList.contains('open')) {
                document.getElementById("mobile-menu-button").classList.toggle("change");
                document.body.classList.toggle('open');
            }
            document.getElementById("mobile-email-filter-button").classList.toggle("change-filter");
            document.body.classList.toggle('show');
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
        emailDetails,
        emailActions,
    }
}