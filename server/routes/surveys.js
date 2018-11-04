const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const emailTemplates = require('../services/emailTemplates');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { user } = req;
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      _user: user.id,
      dateSent: Date.now(),
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({
        email: email.trim()
      }))
    });

    const mailer = new Mailer(survey, emailTemplates(survey));

    try {
      await mailer.send();
      await survey.save();
      user.credits -= 1;
      const updatedUser = await user.save();

      res.send(updatedUser);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
