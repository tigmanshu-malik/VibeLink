// Input validation helper functions

/**
 * Check if email format is valid
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Check if password meets requirements
 * @param {string} password - Password to validate
 * @returns {Object} - { valid: boolean, message: string }
 */
exports.validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { 
      valid: false, 
      message: 'Password must be at least 6 characters' 
    };
  }
  
  return { valid: true, message: 'Password is valid' };
};

/**
 * Sanitize user input to prevent malicious data
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
exports.sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Basic sanitization - remove HTML tags
  return input.replace(/<[^>]*>?/gm, '');
};
