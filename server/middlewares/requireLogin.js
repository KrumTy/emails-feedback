module.exports = (req, res, next) => {
  const isNotLoggedIn = !req.user;
  const errorMessage = 'You are not logged in.';

  if (isNotLoggedIn) {
    res.status(401).send({
      error: errorMessage
    });
  }

  next(isNotLoggedIn && errorMessage);
};
