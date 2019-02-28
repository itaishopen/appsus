import { eventBus, EVENT_FEEDBACK } from '../../../services/eventbus-service.js'
import emailServices from '../services/email-service.js'
import emailReply from './email-reply-cmp.js'


export default {
  template: `
    <section class="email-details">
      <div class="email-details-header">
        <router-link to="/email"><i class="fas fa-arrow-circle-left"></i>Back</router-link>
      </div>
      <h1 class="details-sender">{{email.sender}}</h1>

      <div class="subject-container">
          <h2 class="subject-txt">{{email.subject}}</h2>
          <h2 class="subject-sentAt" v-if="email.sentAt">{{email.sentAt.timeToShow}}</h2>
      </div>
      <div class="details-body-container"><p class="details-body-txt">{{email.body}}</p></div>

      <div class="email-actions-container">
          <button class="email-reply-btn" @click="isReplying = true">Reply</button>
          <router-link to="/email" for="toolbar-delete-btn" ><button class="toolbar-delete-btn fas fa-trash-alt" @click="deleteEmail"></button></router-link>
          <router-link to="/email" for="toolbar-mark-as-unread-btn"><button class="toolbar-mark-as-unread-btn"  @click="markAsUnread">Mark as unread</button></router-link>
      </div>
      <email-reply v-if="isReplying" :emailForReply="email" @sendEmail="sendEmail" @cancelReply="isReplying = false"></email-reply>
    </section>
    `,
  data() {
    return {
      email: [],
      isReplying: false,
    }
  },
  created() {
      this.loadData();
  },
  mounted() {
  },
  methods: {
    loadData() {
      emailServices.getEmailById(this.$route.params.emailId).then(email => {
        this.email = email;
        this.email.isRead = true;
        emailServices.sendAnEmail(this.email).then();
      });
    },
    deleteEmail(emailId) {
      emailServices.deleteAnEmail(emailId)
        .then() 
        .catch(err => eventBus.$emit(EVENT_FEEDBACK, { txt: err, link: '' }, 'fail'))
    },
    markAsUnread() {
      this.email.isRead = false
      emailServices.sendAnEmail(this.email)
        .then()
    },
    sendEmail(emailData) {
      emailServices.sendAnEmail(emailData)
      .then(() => {
        this.email = emailData;
          this.isReplying = false;
          // eventBus.$emit(EVENT_FEEDBACK, { txt: 'Your email was sent do you want to view it?', link: `/email/${emailData.id}` }, 'success');
        })
    }
  },
  
  components: {
    emailReply,
  },
}