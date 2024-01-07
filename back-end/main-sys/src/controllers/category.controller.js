const Category = require("../models/category.model");
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
      const totalCategories = await Category.countDocuments({ isMain: true });
      const totalPages = Math.ceil(totalCategories / perPage);
      let categories = await Category.find({ isMain: true })
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
      const name = req.body.name;
      const sub_cate = req.body.sub_cate;
      const sub_category = [];
      console.log(req.body);
      for (let cate of sub_cate) {
        const newCategory = new Category({
          name: cate,
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
      const name = req.body.name;
      let sub_cate = req.body.sub_cate;
      console.log("sub_cate:", sub_cate);
      let category = await Category.findOne({ name }).populate(
        "sub_category._id"
      );
      let removeCategory = [];
      console.log(category.sub_category);
      category.sub_category = category.sub_category.filter((cate) => {
        // Lọc ra những cate phải bỏ đi
        if (!sub_cate.includes(cate._id.name)) {
          // Thêm những phần tử cần xóa vào list
          removeCategory.push(cate._id.name);
          return false;
        }
        // Bỏ phần tử đã có trong list
        sub_cate = sub_cate.filter((item) => item != cate._id.name);
        return true;
      });
      category.sub_category = category.sub_category.map((cate) => {
        cate._id = cate._id._id;
        return cate;
      });

      //Lưu những cate mới
      for (let cate of sub_cate) {
        const newCategory = new Category({
          name: cate,
          sub_category: [],
          isMain: false,
        });
        const savedElement = await newCategory.save();
        category.sub_category.push({ _id: savedElement._id });
      }
      await Category.updateOne({ name }, category);

      // Xóa những cate cần nữa
      for (let cate of removeCategory) {
        await Category.deleteOne({ name: cate });
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
        await Category.deleteOne({ _id: cate._id._id });
      }
      await Category.deleteOne({ _id: req.params.id });
      res.status(200).json({ msg: "Deleted Category" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new categoryController();
