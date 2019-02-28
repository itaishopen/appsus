import { eventBus, EVENT_FEEDBACK } from '../../../services/eventbus-service.js'
import emailServices from '../services/email-service.js'

export default {
  template: `
    <section class="email-compose">
      <div class="compose-email-toolbar">
        <router-link to="/email"><i class="fas fa-arrow-circle-left"></i>Back</router-link>
      </div>

      <form class="compose-email-container" @submit.prevent="sendEmail">
        <input type="text" class="compose-email-to" placeholder="To" v-model="email.recipient">
        <input type="text" class="compose-email-from" placeholder="From" v-model="email.sender" disabled>
        <input type="text" class="compose-email-subject" placeholder="Subject" v-model="email.subject">
        
        <div class="compose-email-body">
            <textarea  cols="43" rows="10" placeholder="Message body" v-model="email.body"></textarea>
        </div>
        <button class="send-email-btn" type="submit">Send</button>
      </form>
    </section>
    `,
  data() {
    return {
      email: {
        recipient: '',
        sender: 'awesome@devil.com',
        subject: '',
        body: '',
      }
    }
  },
  methods: {
    sendEmail() {
      if (!this.email.recipient || !this.email.subject || !this.email.body) {
        eventBus.$emit(EVENT_FEEDBACK, {txt: 'Please fill in all the details', link: '' }, 'fail')
        return;
      }      
      emailServices.sendAnEmail(this.email)
        .then(() => {          
          // todo: display confirmation
          this.$router.push('/email');
        })
    }
  },
}