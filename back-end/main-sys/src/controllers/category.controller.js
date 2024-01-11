const Category = require("../models/category.model");
const Product = require("../models/product.model");
const Author = require("../models/author.model");
const { upload, uploadToImgur } = require("../middlewares/upload-file");
class categoryController {
  // *************** ADMIN *********************
  getAllCategory = async (req, res, next) => {
    try {
      let categories = await Category.find({ isMain: true }).populate(
        "sub_category._id"
      );
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };
  // [GET] Categorie/dashboard
  getManageCategory = async (req, res, next) => {
    try {
      const page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const perPage = isNaN(req.query.perPage)
        ? 4
        : Math.max(1, parseInt(req.query.perPage));
      const searchOption = req.query.search
        ? { name: { $regex: new RegExp(req.query.search, "i") } }
        : {};
      searchOption.isMain = true;
      const totalCategories = await Category.countDocuments(searchOption);
      const totalPages = Math.ceil(totalCategories / perPage);
      let categories = await Category.find(searchOption)
        .sort({ date: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate("sub_category._id");
      res.status(200).json({ categories, totalPages });
    } catch (error) {
      next(error);
    }
  };
  // [GET] category/edit
  getEditCategory = async (req, res, next) => {
    try {
      const category = await Category.findOne({ _id: req.params.id }).populate(
        "sub_category._id"
      );
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  };

  // [POST] category/edit/save
  addCategory = async (req, res, next) => {
    try {
      console.log(req.body);
      const name = req.body.name;
      const sub_cate = req.body.sub_cate;
      const sub_category = [];
      for (let cate of sub_cate) {
        const newCategory = new Category({
          name: cate.name,
          sub_category: [],
          isMain: false,
        });
        const savedElement = await newCategory.save();
        sub_category.push({ _id: savedElement._id });
      }
      const newCategory = new Category({
        name: name,
        sub_category,
        isMain: true,
      });

      const savedElement = await newCategory.save();

      res.status(200).json({ msg: "Added Category" });
    } catch (error) {
      next(error);
    }
  };

  // [POST] category/edit/save
  updateCategory = async (req, res, next) => {
    try {
      console.log(req.body);
      const _id = req.body.id;
      const name = req.body.name;
      let sub_cate = req.body.sub_cate;
      console.log("sub_cate được gửi lên:", sub_cate);
      let category = await Category.findOne({ _id }).populate(
        "sub_category._id"
      );
      let removeCategory = [];
      let updateNameSubCate = [];
      console.log("sub_cate hiện tại: ", category.sub_category);
      // Sửa tên main category
      category.name = name;
      category.sub_category = category.sub_category.filter((cate) => {
        // So sánh với từng phần tử trong list hiện tại
        for (let item of sub_cate) {
          // Subcate đang xét vẫn còn trong list
          if (item._id == cate._id._id) {
            // Thêm vào list để cập nhật lại tên nếu có thay đổi
            if (cate._id.name != item.name) {
              updateNameSubCate.push({ _id: cate._id._id, name: item.name });
            }
            // Bỏ phần tử đó ra khỏi sub_cate
            sub_cate = sub_cate.filter((item) => item._id != cate._id._id);
            return true;
          }
        }
        // Sub cate đang xét k còn trong list hiện tại
        removeCategory.push(cate._id);
        return false;
      });

      // Map lại để hủy cái lồng _id của populate
      category.sub_category = category.sub_category.map((cate) => {
        cate._id = cate._id._id;
        return cate;
      });

      console.log("Những sub cate cần đổi tên: ", updateNameSubCate);

      for (let cate of updateNameSubCate) {
        const subCategory = await Category.findOne({ _id: cate._id });
        subCategory.name = cate.name;
        await subCategory.save();
      }

      console.log("Những sub cate mới: ", sub_cate);

      // Lưu những cate mới
      for (let cate of sub_cate) {
        const newCategory = new Category({
          name: cate.name,
          sub_category: [],
          isMain: false,
        });
        const savedElement = await newCategory.save();
        category.sub_category.push({ _id: savedElement._id });
      }
      await Category.updateOne({ _id }, category);

      console.log("Những sub cate bị xóa: ", removeCategory);
      // Xóa những sub cate không cần nữa
      for (let cate of removeCategory) {
        // Tìm ra tất cả các cuốn sách của sub cate đang xét
        const removeProducts = await Product.find({
          id_category: cate._id,
        }).populate("id_author");
        // Cập nhật lại trường published_book của tất cả các tác giả có sách bị xóa
        for (let product of removeProducts) {
          await Author.updateOne(
            { _id: product.id_author._id },
            { $set: { published_book: product.id_author.published_book - 1 } }
          );
        }
        // Xóa tất cả các sp thuộc sub cate đó
        await Product.deleteMany({ id_category: cate._id });
        await Category.deleteOne({ _id: cate._id });
      }
      res.status(200).json({ msg: "Updated Category" });
    } catch (error) {
      next(error);
    }
  };

  // [POST] category/delete/:id
  deleteCategory = async (req, res, next) => {
    try {
      // Xóa tất cả những sub category
      let category = await Category.findOne({ _id: req.params.id }).populate(
        "sub_category._id"
      );
      for (let cate of category.sub_category) {
        // Tìm ra tất cả các cuốn sách của sub cate đang xét
        const removeProducts = await Product.find({
          id_category: cate._id._id,
        }).populate("id_author");
        // Cập nhật lại trường published_book của tất cả các tác giả có sách bị xóa
        for (let product of removeProducts) {
          await Author.updateOne(
            { _id: product.id_author._id },
            { $set: { published_book: product.id_author.published_book - 1 } }
          );
        }
        // Xóa tất cả sản phẩm của sub category đó
        await Product.deleteMany({ id_category: cate._id._id });
        // Xóa sub category đi
        await Category.deleteOne({ _id: cate._id._id });
      }
      // Xóa tất cả sản phẩm của main category đó
      await Product.deleteMany({ id_category: req.params.id });
      // Xóa main category đi
      await Category.deleteOne({ _id: req.params.id });
      res.status(200).json({ msg: "Deleted Category" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new categoryController();
