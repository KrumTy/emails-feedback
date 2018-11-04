const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
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

    const updatedSurvey = await survey.save();

    console.log('updatedSurvey', updatedSurvey);

    res.send(updatedSurvey);
  });
};
