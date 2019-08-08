const { Schema, model } = require('mongoose');
const encryption = require('../utilities/encryption');

const userSchema = new Schema({
  email: { type: Schema.Types.String, required: true },
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },
  phoneNumber: { type: Schema.Types.String, required: true },
  salt: { type: Schema.Types.String, required: true },
  hashedPassword: { type: Schema.Types.String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  roles: [{ type: Schema.Types.String }]
});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  }
})

const User = model('User', userSchema);

User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) {
      return;
    }
    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, '123123');
    return User.create({
      email: 'admin@adminov.com',
      firstName: 'Admincho',
      lastName: 'Adminov',
      phoneNumber: '+33782298959',
      salt,
      hashedPassword,
      roles: ['Admin']
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = User;