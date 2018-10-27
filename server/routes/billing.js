const stripeModule = require('stripe');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const stripe = stripeModule(keys.STRIPE_SECRET_KEY);

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const { body, user } = req;

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5$ for 5 credits.',
      source: body.id
    });

    user.credits += 5;

    const updatedUser = await user.save();

    console.log('updatedUser', updatedUser);

    res.send(updatedUser);
  });
};
