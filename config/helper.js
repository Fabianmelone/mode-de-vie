const Handlebars = require('handlebars');

const regexMatch = (pattern, str) => {
  const regex = new RegExp(pattern, "i"); // 'i' makes it case-insensitive
  return regex.test(str);
};

// Format the likes and views counts
Handlebars.registerHelper('formatCount', (count) => {
  if (count >= 1000 && count < 1000000) {
    return (count / 1000).toFixed(0) + 'K';
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(0) + 'M';
  } else {
    return count;
  }
});

module.exports = {
  regexMatch,
  Handlebars
};