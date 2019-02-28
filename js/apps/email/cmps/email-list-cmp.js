import emailPreview from './email-preview-cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list flex column">
            <div v-for="email in emails" class="email-preview-container flex" :class="email.isRead ? 'read' : 'unread'">
                <router-link class="email-link" :to="'email/details/'+ email.id"><email-preview :email="email"></email-preview></router-link>
                <button class="preview-delete-btn fas fa-trash-alt" @click="deleteEmail(email.id)"></button>
                <button v-if="email.isDel" class="preview-delete-btn fas fa-trash-restore-alt" @click="restoreEmail(email.id)"></button>
            </div>
        </section>
        `,
    methods: {
        deleteEmail(emailId) {
            this.$emit('deleteEmail', emailId);
        },
        restoreEmail(emailId) {
            this.$emit('restoreEmail', emailId);
        }
    },
    components: {
        emailPreview,
    },

}