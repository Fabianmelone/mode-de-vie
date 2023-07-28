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
    },
    format_views: (views) => {
        if (views >= 1000) {
            const roundedViews = Math.round(views / 100)
            return `${roundedViews}k`;
        }
        return views.toString();
    }
};