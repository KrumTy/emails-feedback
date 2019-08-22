const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const emailTemplates = require('../services/emailTemplates');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    _.chain(req.body)
      .map(({ email, url }) => {
        const { pathname } = new URL(url);
        const p = new Path('/api/surveys/:surveyId/:choice');
        const match = p.test(pathname);

        return match && { email, ...match };
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email,
                hasResponded: false
              }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.hasResponded': true, lastRespondedOn: new Date() }
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { user } = req;
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      _user: user.id,
      sentOn: Date.now(),
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
