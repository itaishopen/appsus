export default {
  props: ['email'],
  template: `
      <div class="email-preview">
          <h3 class="email-preview-sender">{{email.sender}}
              <h4 class="email-preview-subject">{{email.subject}}</h4>
          </h3>
          <h5 class="email-preview-sentAt">{{email.sentAt.timeToShow}}</h5>
          <i v-if="email.isRead" class="fas fa-check"></i>
      </div>
  `,
}