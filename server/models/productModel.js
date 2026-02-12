let mongoose = require('mongoose');

const weightOptionSchema = new mongoose.Schema({
    lable:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    mrp:{
        type: Number,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    sku:{
        type: String,
    }
},{_id: false});

const nutritionSchema = new mongoose.Schema({
    energy: Number,
  protein: Number,
  carbohydrates: Number,
  sugar: Number,
  totalFat: Number,
  saturatedFat: Number,
  monoUnsaturatedFat: Number,
  polyUnsaturatedFat: Number,
  transFat: Number,
  cholesterol: Number,
  sodium: Number
},{_id: false});

const productSchema = new mongoose.Schema({
    pname:{
        type: String,
        required: true,
        trime: true,
        index: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    description:{
        type: String,
        required: true,
    },
    benifits:[
        {
            type: String
        }
    ],
    category:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true,
    },
    mainImage:{
        type: String,
        required: true
    },
    images:[String],
    weightOptions: [weightOptionSchema],

    baseprice: Number,
    baseMRP: Number,

    isFeatured:{
        type: Boolean,
        default: false,
        index: true,
    },
    isActive:{
        type: Boolean,
        default: true,
        index: true,
    },
    ratings:{
        type: Number,
        default: 0,
        index: true,
    },
    numReviews:{
        type: Number,
        default: 0,
    },
    specifications:{
        brandName: String,
        ingredients: String,
    countryOfOrigin: String,
    shelfLife: String,
    vegetarian: {
      type: Boolean,
      default: true
    },
    manufacturer: String,
    dimensions: String,
    },
    nutritionInfo: nutritionSchema,

    sold:{
        type: Number,
        default: 0,
    },

},{timestamps: true});

productSchema.index({pname: "text",description: "text"});
productSchema.index({category: 1, isActive:1});

module.exports = mongoose.model("Product",productSchema);