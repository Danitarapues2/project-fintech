const timeago = require('timeago.js');

const helpers = {};

helpers.formatTimeAgo = (savedTimestamp) => {
    return timeago.format(savedTimestamp);
};

module.exports = helpers;