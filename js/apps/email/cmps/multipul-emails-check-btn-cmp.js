import emailServices from '../services/email-service.js'

export default {
    props: ['checkedEmails'],
    template: `
    <div class="email-actions-btns flex space-between" @submit.prevent="setSortBy">            
            <div class="action-btn flex">
                <button class="multipal-delete fas fa-arrow-left fa-lg" @click="backAll"> {{checkedEmails.length}}</button>
            </div>
            <div class="action-btn flex">
                <button class="multipal-delete fas fa-trash-alt fa-lg" @click="deleteAll"></button>
            </div>
            <div class="action-btn flex">
                <button class="multipal-restore fas fa-trash-restore-alt fa-lg" @click="restoreAll"></button>
            </div>
            <div class="action-btn flex">
                <button class="multipal-mark-as-read fas fa-envelope-open fa-lg" @click="markAsReadAll"></button>
            </div>
            <div class="action-btn flex">
                <button class="multipal-mark-as-unread fas fa-envelope fa-lg" @click="markAsUnreadAll"></button>
            </div>     
            <div class="action-btn flex">
                <button v-if="unStarNum > 0" class="multipal-stars fas fa-star fa-lg" @click="starAll"></button>
            </div>     
            <div class="action-btn flex">
                <button v-if="starNum > 0" class="multipal-stars far fa-star fa-lg" @click="unStarAll"></button>
            </div>     
        </div>
    `,
    methods: {
        backAll() {
            emailServices.unCheckAll(this.checkedEmails).then(() => this.$emit('renderEmails'))
        },
        deleteAll() {
            emailServices.delAllFolderEmails(this.checkedEmails).then(() => this.$emit('renderEmails'))
        },
        restoreAll() {
            emailServices.restoreAllCheckedEmail(this.checkedEmails).then(() => this.$emit('renderEmails'))
        },
        markAsReadAll() {
            emailServices.changeReadUnreadAll(this.checkedEmails, 'read').then(() => this.$emit('renderEmails'))
        },
        markAsUnreadAll() {
            emailServices.changeReadUnreadAll(this.checkedEmails, 'unread').then(() => this.$emit('renderEmails'))
        },
        starAll() {
            emailServices.starAll(this.checkedEmails, true).then(() => this.$emit('renderEmails'))
        },
        unStarAll() {
            emailServices.starAll(this.checkedEmails, false).then(() => this.$emit('renderEmails'))
        },
    },
    computed: {
        name() {
            return this.isRead ? 'read' : 'unread'
        },
        starNum() {
            return this.checkedEmails.filter(email => email.isStar).length
        },
        unStarNum() {
            return this.checkedEmails.filter(email => !email.isStar).length
        }
    }
}