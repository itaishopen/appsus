export default {
  props: ['email'],
  template: `
      <div class="email-preview flex space-between">
        <div class="email-preview-letter flex align-center justify-center" :style="{ background: starColor }">
            <input type="checkbox" id="letter-checkbox" class="email-preview-letter-checkbox">
            <label for="letter-checkbox" @click="emailCheck">
                <span v-if="!email.isCheck" class="first-letter">{{email.sender.charAt(0).toUpperCase()}}</span>
                <span v-if="email.isCheck" class="first-letter"><i class="fas fa-check"></i></span>
            </label>
        </div>
        <div  class="email-link flex" @click="openEmail(email.id)">
          <div class="text-container flex column justify-center">
              <div class="email-preview-sender">{{email.sender}}</div>
              <div class="email-preview-subject">{{email.subject}}</div>
          </div>
          <div class="email-preview-sentAt">{{email.sentAt.timeToShow}}</div>
        </div>
      </div>
  `,
  data() {
    return {
      // selected: this.email.isCheck,
      color: '#00ffff',
      currEmail: this.email,
    }
  },
  methods: { 
    openEmail(emailId) {
      console.log(emailId)
      this.$emit('openEmail', emailId);
    },
    emailCheck() {
      this.currEmail.isCheck = !this.currEmail.isCheck
      this.$emit('emailCheck', this.currEmail);
    }
  },
  computed: {
    starColor() {
         return "#"+((1<<24)*Math.random()|0).toString(16);
    },
},
}