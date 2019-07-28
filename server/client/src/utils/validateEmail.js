const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  if (typeof emails != 'string') {
    return 'Invalid emails';
  }

  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => email && re.test(email) === false);

  if (invalidEmails.length > 0) {
    return `These emails are invalid: ${invalidEmails}`;
  }
};
