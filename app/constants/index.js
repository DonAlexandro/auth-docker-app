const messages = {
  technical: {
    /**
     * Return internal server error message with technical info
     * @param {string} where - place where an error ocurred
     * @returns {string} generated message
     */
    internalError: where => `[${where}] internal error:`
  },
  userFriendly: {
    internalError: `Oops... seems there is an error. Don't worry, we're fixing it right now`,
    unauthorizedError: 'Please login to continue',
    invalidCredentials: 'Invalid credentials',
    userNotFound: email => `User with ${email} wasn't found`,
    emailExists: email => `User with email "${email}" already exists`
  }
};

module.exports = {
  messages
};
