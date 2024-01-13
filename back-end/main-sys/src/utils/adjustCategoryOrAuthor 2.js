const Author = require("../models/author.model");
const Category = require("../models/category.model");

module.exports = {
  async adjustCategoryOrAuthor(id, value, isAuthor = false) {
    if (isAuthor) {
      const author = await Author.findOne({ _id: id });
      author.published_book += value;
      await author.save();
    } else {
      const category = await Category.findOne({ _id: id });
      console.log("Thay đổi: ", value, " cho ", category.name);
      category.num_product += value;
      await category.save();
      // Kiểm tra xem category là sub thì phải cập nhật cho main của nó
      if (!category.isMain) {
        console.log("Có vô");
        const mainCategories = await Category.find({ isMain: true });
        console.log("Các main: ", mainCategories);
        for (let mainCate of mainCategories) {
          for (let subCate of mainCate.sub_category) {
            console.log("So sánh", subCate._id, " và ", category._id);
            if (subCate._id.equals(category._id)) {
              console.log("OK");
              console.log("Thay đổi: ", value, " cho ", mainCate.name);
              mainCate.num_product += value;
              await mainCate.save();
              return;
            }
          }
        }
      }
    }
  },
};
