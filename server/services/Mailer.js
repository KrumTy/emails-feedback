const sendgrid = require('sendgrid');
const { SEND_GRID_KEY } = require('../config/keys');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sendGridApi = sendgrid(SEND_GRID_KEY);
    this.from_email = new helper.Email('no-reply@emails-feedback.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = Mailer.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  static formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.Email(email));
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => personalize.addTo(recipient));

    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sendGridApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sendGridApi.API(request);

    return response;
  }
}

module.exports = Mailer;
