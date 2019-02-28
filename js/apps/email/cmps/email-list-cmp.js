import emailPreview from './email-preview-cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list flex column">
            <div v-for="email in emails" class="email-preview-container flex" :class="email.isRead ? 'read' : 'unread'">
                <router-link class="email-link" :to="'email/details/'+ email.id"><email-preview :email="email"></email-preview></router-link>
                <div class="button-container flex space-evenly">
                    <button class="preview-btn preview-delete-btn fas fa-trash-alt fa-lg" @click="deleteEmail(email.id)"></button>
                    <button class="preview-btn preview-reply-btn fas fa-reply fa-lg" @click="replyToEmail(email.id)"></button>
                    <button v-if="email.isRead" class="preview-btn preview-unread-btn" @click="markAsUnread(email.id)"><i class="fas fa-envelope fa-lg"></i></button>
                    <button v-if="!email.isRead" class="preview-btn preview-read-btn" @click="markAsRead(email.id)"><i class="fas fa-envelope-open fa-lg"></i></button>
                    <button v-if="email.isDel" class="preview-btn preview-restorn-btn fas fa-trash-restore-alt fa-lg" @click="restoreEmail(email.id)"></button>
                </div>
            </div>
        </section>
        `,
    methods: {
        deleteEmail(emailId) {
            this.$emit('deleteEmail', emailId);
        },
        restoreEmail(emailId) {
            this.$emit('restoreEmail', emailId);
        },
        replyToEmail(emailId) {
            this.$emit('replyToEmail', emailId);
        },
        markAsUnread(emailId) {
            this.$emit('markAsUnread', emailId);
        },
        markAsRead(emailId) {
            this.$emit('markAsRead', emailId);
        },
    },
    components: {
        emailPreview,
    },

}