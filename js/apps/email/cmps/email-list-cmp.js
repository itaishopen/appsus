import emailPreview from './email-preview-cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list flex column">
            <div v-for="email in emails" class="email-preview-container flex" :class="email.isRead ? 'read' : 'unread'">
                
                <email-preview :email="email" @emailCheck="emailCheck" @openEmail="openEmail"></email-preview>
                    
                <div class="button-container space-evenly">
                    <button v-if="!email.isStar" class="preview-btn preview-star-empty-btn far fa-star fa-lg" @click="starEmail(email.id)"></button>
                    <button v-if="email.isStar" class="preview-btn preview-star-full-btn fas fa-star fa-lg" @click="starEmail(email.id)"></button>
                    <button class="preview-btn preview-delete-btn fas fa-trash-alt fa-lg" @click="deleteEmail(email.id)"></button>
                    <button v-if="!email.isDraft && !email.isSent" class="preview-btn preview-reply-btn fas fa-reply fa-lg" @click="replyToEmail(email.id)"></button>
                    <button v-if="email.isDraft" class="preview-btn preview-draft-btn fas fa-paper-plane fa-lg" @click="sendDraft(email.id)"></button>
                    <button v-if="email.isRead" class="preview-btn preview-unread-btn" @click="markAsUnread(email.id)"><i class="fas fa-envelope fa-lg"></i></button>
                    <button v-if="!email.isRead" class="preview-btn preview-read-btn" @click="markAsRead(email.id)"><i class="fas fa-envelope-open fa-lg"></i></button>
                    <button v-if="email.isDel" class="preview-btn preview-restorn-btn fas fa-trash-restore-alt fa-lg" @click="restoreEmail(email.id)"></button>
                </div>
            </div>
        </section>
        `,
    methods: {
        openEmail(emailId) {
            this.$emit('openEmail', emailId);
        },
        deleteEmail(emailId) {
            this.$emit('deleteEmail', emailId);
        },
        restoreEmail(emailId) {
            this.$emit('restoreEmail', emailId);
        },
        replyToEmail(emailId) {
            this.$emit('replyToEmail', emailId);
        },
        sendDraft(emailId) {
            this.$emit('sendDraft', emailId);
        },
        starEmail(emailId) {
            this.$emit('changeEmail', emailId, 'star');
        },
        emailCheck(emailId) {
            this.$emit('changeEmail', emailId, 'check');
        },
        markAsUnread(emailId) {
            this.$emit('changeEmail', emailId, 'unread');
        },
        markAsRead(emailId) {
            this.$emit('changeEmail', emailId, 'read');
        },

    },
    components: {
        emailPreview,
    },

}