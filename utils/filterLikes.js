
const filterLikes = (arr) => {


    const arrLikes = arr.map( (post) => post.likes);
    

    arrLikes.sort( (a,b) => b - a);
    console.log(arrLikes);
}

module.exports = filterLikes;