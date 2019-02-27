import emailPreview from './email-preview-cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <div v-for="email in emails" :class="(email.isRead)? 'read' : 'unread'">
            <router-link :to="selectEmail(email.id)"><email-preview :email="email"></email-preview></router-link>
                <button class="preview-delete-btn fas fa-trash-alt" @click="deleteEmail(email.id)"></button>
            </div>
        </section>
        `,
    methods: {
        selectEmail(emailId) {
            return `email/details/${emailId}`;
        },
        deleteEmail(emailId) {
            this.$emit('deleteEmail', emailId);
        }
    },
    components: {
        emailPreview,
    },

}