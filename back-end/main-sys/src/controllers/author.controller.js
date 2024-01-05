const Author = require("../models/author.model");
const Product = require("../models/product.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
class authorController {
  // [GET] product/detail/:id
  getDetail = async (req, res, next) => {
    try {
      const author = await Author.findOne({ _id: req.params.id });

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
      const authorsWithAvgRating = await Promise.all(
        authors.map(async (author) => {
          // Retrieve products for the current author
          const products = await Product.find({
            id_author: author._id,
          }).populate("reviews");

          // Calculate the average rating for the products of the current author
          const totalRating = products.reduce((sum, product) => {
            const productRatingSum = product.reviews.reduce(
              (ratingSum, review) => ratingSum + review.rating,
              0
            );
            return sum + productRatingSum;
          }, 0);

          const avgRating =
            products.length > 0 ? totalRating / products.length : 0;

          return {
            ...author.toObject(),
            avgRating,
          };
        })
      );

      // Sort authors by average rating in descending order
      const sortedAuthors = authorsWithAvgRating.sort(
        (a, b) => b.avgRating - a.avgRating
      );

      res.status(200).json(sortedAuthors);
    } catch (error) {
      next(error);
    }
  };

  // *************** ADMIN *********************
  // [GET] author/dashboard
  getManageAuthor = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 4
        : Math.max(1, parseInt(req.query.perPage));
      const totalAuthors = await Author.countDocuments({});
      const totalPages = Math.ceil(totalAuthors / perPage);
      const authors = await Author.find({})
        .skip((page - 1) * perPage)
        .limit(perPage);
      res.status(200).json({ authors, totalPages });
    } catch (error) {
      next(error);
    }
  };

  // [GET] product/edit
  getEditAuthor = async (req, res, next) => {
    try {
      const author = await Author.findOne({ _id: req.params.id });
      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  };

  // [POST] product/edit/save
  addAuthor = async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        if (req.file) {
          // Upload the file to Imgur
          const imgurLink = await uploadToImgur(req.file.buffer);
          // Do something with the Imgur link (e.g., save it to a database)
          req.body.image = imgurLink;
        } else req.body.image = "https://i.imgur.com/D8pnlgT.jpg";
        // Set up lại cái time để lưu vào DB
        const [day, month, year] = req.body.date_of_birth.split("/");
        const formattedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
        req.body.date_of_birth = formattedDate.toISOString();
        const newAuthor = new Author(req.body);
        await newAuthor.save();
        res.status(200).json({ msg: "Added Author" });
        // return res.status(200).send({ imgurLink });
      });
    } catch (error) {
      next(error);
    }
  };

  // [POST] product/edit/save
  updateAuthor = async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        // Set up lại cái time để lưu vào DB
        const [day, month, year] = req.body.date_of_birth.split("/");
        const formattedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
        req.body.date_of_birth = formattedDate.toISOString();
        // Update link ảnh nếu có
        if (req.file) {
          const imgurLink = await uploadToImgur(req.file.buffer);
          req.body.image = imgurLink;
        }
        await Author.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({ msg: "Updated Author" });
      });
    } catch (error) {
      next(error);
    }
  };

  // [POST] product/delete/:id
  deleteAuthor = async (req, res, next) => {
    try {
      await Author.deleteOne({ _id: req.params.id });
      res.status(200).json({ msg: "Deleted Author" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new authorController();
