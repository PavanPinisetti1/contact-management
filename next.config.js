// next.config.js
module.exports = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL || 'sqlite://contacts.db',
    },
};
