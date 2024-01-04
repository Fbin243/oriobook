const mongoose = require("mongoose");
const account = require("./account.model");
const author = require("./author.model");

let mainCategories = [];
let subCategories = {};

const productSchema = new mongoose.Schema(
  {
    id_author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      mainCategory: {
        type: String,
        default: "Romance",
        enum: mainCategories,
      },
      subCategory: {
        type: String,
        enum: subCategories["Romance"] || [],
      },
    },
    reviews: {
      type: [
        {
          id_account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
          },
          rating: {
            type: Number,
            min: 0,
            max: 5,
          },
          content: {
            type: String,
            trim: true,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strictPopulate: false }
);


const Product = mongoose.model("product", productSchema);

const updateCategoryEnums = async () => {
  try {
    // Retrieve distinct main categories
    mainCategories = await Product.distinct("category.mainCategory");
    Product.schema.path("category.mainCategory").enumValues = mainCategories;
    console.log("Main Categories Enum:", mainCategories);

    // Organize subcategories based on main categories
    subCategories = {};
    for (const mainCategory of mainCategories) {
      const subCategoriesForMainCategory = await Product.distinct("category.subCategory", {
        "category.mainCategory": mainCategory,
      });
      subCategories[mainCategory] = subCategoriesForMainCategory;
    }

    // Update subCategory enum values and log
    for (const [mainCategory, subCategoriesForMainCategory] of Object.entries(subCategories)) {
      Product.schema.path("category.subCategory").enumValues = [
        ...Product.schema.path("category.subCategory").enumValues,
        ...subCategoriesForMainCategory,
      ];
      console.log(`Sub Categories Enum for ${mainCategory}:`, subCategoriesForMainCategory);
    }
  } catch (error) {
    console.error("Error updating category enums:", error);
  }
};

// Initial call to update enums
updateCategoryEnums();

module.exports = { Product, mainCategories, subCategories, updateCategoryEnums };
