const Author = require("../models/author.model");
const Product = require("../models/product.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
class authorController {
   // [GET] product/detail/:id
   getDetail = async (req, res, next) => {
    try {
      const author = await Author.findOne({ _id: req.params.id })
       
   
      res.status(200).json({ author });
    } catch (error) {
      next(error);
    }
  };

  // [GET] getAuthorList
  getAuthorList = async (req, res, next) => {
    try {
        const authorList = await Author.find();
      res.status(200).json(authorList);
    } catch (error) {
      next(error);
    }
  };

  // [GET] product/top-rated
  getAuthorListTopRated = async (req, res, next) => {
    try {
      // Retrieve all authors
      const authors = await Author.find();
  
      // Calculate average rating for each author
      const authorsWithAvgRating = await Promise.all(authors.map(async author => {
        // Retrieve products for the current author
        const products = await Product.find({ 'id_author': author._id }).populate('reviews');
  
        // Calculate the average rating for the products of the current author
        const totalRating = products.reduce((sum, product) => {
          const productRatingSum = product.reviews.reduce((ratingSum, review) => ratingSum + review.rating, 0);
          return sum + productRatingSum;
        }, 0);
  
        const avgRating = products.length > 0 ? totalRating / products.length : 0;
  
        return {
          ...author.toObject(),
          avgRating,
        };
      }));
  
      // Sort authors by average rating in descending order
      const sortedAuthors = authorsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);
  
      res.status(200).json(sortedAuthors);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new authorController();
