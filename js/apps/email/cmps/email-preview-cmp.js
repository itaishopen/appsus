export default {
  props: ['email'],
  template: `
      <div class="email-preview flex space-between">
        <div class="email-preview-letter flex align-center justify-center" :style="{ background: starColor }">
            <input type="checkbox" id="letter-checkbox" v-model="selected(email.id)" @click="setCheck" class="email-preview-letter-checkbox">
            <label for="letter-checkbox">
                <span v-if="!email.isCheck" class="first-letter">{{email.sender.charAt(0).toUpperCase()}}</span>
                <span v-if="selected" class="first-letter"><i class="fas fa-check"></i></span>
            </label>
        </div>
        <router-link  class="email-link flex" :to="'email/details/'+ email.id">
          <div class="text-container flex column justify-center">
              <div class="email-preview-sender">{{email.sender}}</div>
              <div class="email-preview-subject">{{email.subject}}</div>
          </div>
          <div class="email-preview-sentAt">{{email.sentAt.timeToShow}}</div>
        </router-link>
      </div>
  `,
  data() {
    return {
      selected: false,
      color: '#00ffff',
      currEmail: null
    }
  }, 
  methods: { 
    setCheck(emailId) {
      console.log(this.selected)
      this.$emit('emailCheck', emailId, this.selected);
    }
  },
  computed: {
    starColor() {
         return "#"+((1<<24)*Math.random()|0).toString(16);
    },
},
}