const env = {
    PORT       : process.env.PORT || 3010,
    GLOBAL_SALT: '8hbg5gbdr#$%^ghvfd5',
    CHARSET    : "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&+",
    DIR_PHOTO  : process.cwd() + '/client/public/picture/photo_profile',
    DIR_DB     : process.cwd() + '/db',
};

module.exports = env;