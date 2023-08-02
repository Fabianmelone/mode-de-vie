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

// Custom Handlebar helper to compare two values
Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
  switch (operator) {
    case 'lt':
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

module.exports = {
  regexMatch,
  Handlebars
};