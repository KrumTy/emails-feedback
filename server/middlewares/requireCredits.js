module.exports = (req, res, next) => {
  const hasNoCredits = req.user.credits < 1;
  const errorMessage = 'Not enough credits!';

  if (hasNoCredits) {
    res.status(403).send({
      error: errorMessage
    });
  }

  next(hasNoCredits && errorMessage);
};
