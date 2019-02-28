export default {
  props: ['email'],
  template: `
      <div class="email-preview flex space-between">
        <div class="text-container flex column justify-center">
            <h3 class="email-preview-sender">{{email.sender}}</h3>
            <h4 class="email-preview-subject">{{email.subject}}</h4>
        </div>
        <h5 class="email-preview-sentAt">{{email.sentAt.timeToShow}}</h5>
      </div>
  `,
}