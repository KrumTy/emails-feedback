const { REDIRECT_DOMAIN } = require('../config/keys');

module.exports = survey => `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your inputs!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${REDIRECT_DOMAIN}/api/surveys/thanks">Yes</a>
        </div>
        <div>
          <a href="${REDIRECT_DOMAIN}/api/surveys/thanks">No</a>
        </div>
      </div>
    </body>
  </html>
`;
