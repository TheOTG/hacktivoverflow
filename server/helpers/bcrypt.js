const bcrypt = require('bcrypt');

module.exports = {
  hash(str) {
    return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
  },
  compare(str, hashStr) {
    return bcrypt.compareSync(str, hashStr);
  },
};
