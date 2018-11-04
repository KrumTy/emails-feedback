module.exports = (req, res, next) => {
  const { user } = req;

  if (!user || !user.credits < 1) {
    res.status(403).send({
      error: 'Not enough credits!'
    });
  }

  next();
};
