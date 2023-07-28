module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    format_likes: (likes) => {
        if (likes >= 1000) {
            const roundedLikes = Math.round(likes / 100)
            return `${roundedLikes}k`;
        }
        return likes.toString();
    }
};