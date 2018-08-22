// server/models/Article.js
const mongoose = require('mongoose')
const articlecontroller = require('./../controllers/article.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/articles')
        .get(articlecontroller.getAll)
    /**
     * add an article
     */
    router
        .route('/article')
        .post(multipartWare, articlecontroller.addArticle)
    /**
     * clap on an article
     */
    router
        .route('/article/clap')
        .post(articlecontroller.clapArticle)
    /**
     * comment on an article
     */
    router
        .route('/article/comment')
        .post(articlecontroller.commentArticle)
    /**
     * get a particlular article to view
     */
    router
        .route('/article/:id')
        .get(articlecontroller.getArticle)
}
let ArticleSchema = new mongoose.Schema(
    {
        text: String,
        title: String,
        description: String,
        feature_img: String,
        claps: Number,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
);
ArticleSchema.methods.clap = function() {
    this.claps++
    return this.save()
}
ArticleSchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}
ArticleSchema.methods.addAuthor = function (author_id) {
    this.author = author_id
    return this.save()
}
ArticleSchema.methods.getUserArticle = function (_id) {
    Article.find({'author': _id}).then((article) => {
        return article
    })
}
module.exports = mongoose.model('Article', ArticleSchema)
