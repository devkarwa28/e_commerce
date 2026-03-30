const Product = require("../models/productModel");
const Category = require("../models/CategoryModel");
const slugify = require("slugify");
const uploadToCloudinary = require("../utilites/cloudinaryUpload");


exports.createProduct = async (req, res) => {
  try {
    const {
      pname,
      description,
      category,
      benifits,
      weightOptions,
      specifications,
      nutritionInfo,
      seo,
      isFeatured,
    } = req.body;

    if (!pname || !description || !category) {
      return res
        .status(400)
        .json({ message: "Name,Desc, & category are required" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid Category" });
    }

    const slug = slugify(pname, { lower: true });

    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ message: "Product name exist" });
    }

    if (!req.files || !req.files.mainImage) {
      return res.status(400).json({ message: "Main Image is Required" });
    }
    let mainImageUrl = "";

    if(req.files && req.files.mainImage){
        const result = await uploadToCloudinary(req.files.mainImage[0].buffer, "products/main");
        mainImageUrl = result.secure_url;
    }

    let galleryImages = [];

    if ( req.files && req.files.images && req.files.images.length > 0) {
     galleryImages = await Promise.all(
        req.files.images.map(async (file) => {
            const result = await uploadToCloudinary(file.buffer, "products/gallery");
            return result.secure_url;
        })
     )
    }

    let parsedWeightOptions = [];
    let parsedBenifits = [];
    let parsedSpecifications = {};
    let parsedNutrition = {};
    let parsedSeo = {};

    if (weightOptions) {
      parsedWeightOptions = JSON.parse(weightOptions);

      if (
        !Array.isArray(parsedWeightOptions) ||
        parsedWeightOptions.length === 0
      ) {
        return res
          .status(400)
          .json({ message: "one  weight is required minimum" });
      }

      parsedWeightOptions.forEach((option) => {
        if (!option.label || !option.price || option.stock == null) {
          return res.status(400).json({ message: "Invalid Weight structure" });
        }
      });
    } else {
      return res.status(400).json({ message: "Weight options are required" });
    }

    if (benifits) {
      parsedBenifits = JSON.parse(benifits);
    }
    if (specifications) {
      parsedSpecifications = JSON.parse(specifications);
    }
    if (nutritionInfo) {
      parsedNutrition = JSON.parse(nutritionInfo);
    }

    if (seo) {
      parsedSeo = JSON.parse(seo);
    }

    const product = await Product.create({
      pname,
      slug,
      description,
      category,
      mainImage: mainImageUrl,
      images: galleryImages,
      weightOptions: parsedWeightOptions,
      benifits: parsedBenifits,
      specifications: parsedSpecifications,
      nutritionInfo: parsedNutrition,
      seo: parsedSeo,
      isFeatured: isFeatured === "true",
    });
    res.status(201).json({
      success: true,
      message: "Product Created SuccessFully",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const { category, search, minPrice, maxPrice, featured } = req.query;

    let query = { isActive: true };

    if (category) {
      query.category = category;
    }
    if (featured === "true") {
      query.isFeatured = true;
    }
    if (search) {
      query.$text = { $search: search };
    }

    let products = await Product.find(query)
      .populate("category", "cname")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (minPrice || maxPrice) {
      products = products.filter((product) => {
        return product.weightOptions.some((option) => {
          const price = option.price;
          return (
            (!minPrice || price >= Number(minPrice)) &&
            (!maxPrice || price <= Number(maxPrice))
          );
        });
      });
    }
    const totalProducts = await Product.countDocuments(query);
    res.json({
      products,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    }).populate("category", "cname");

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const {
      pname,
      description,
      category,
      benifits,
      weightOptions,
      specifications,
      nutritionInfo,
      isFeatured,
      isActive,
      seo,
      removedImages,
    } = req.body;

    if (pname) {
      const slug = slugify(pname, { lower: true });

      const existingProduct = await Product.findOne({ slug, _id: { $ne: id } });

      if (existingProduct) {
        return res.status(400).json({ message: "Product name already exists" });
      }

      product.pname = pname;
      product.slug = slugify(pname, { lower: true });
    }

    if (description) {
      product.description = description;
    }

    if (category) {
      const categoryExist = await Category.findById(category);
      if (!categoryExist) {
        return res.status(400).json({ message: "No Category Found" });
      }
      product.category = category;
    }

    if (typeof isFeatured !== "undefined") {
      product.isFeatured = isFeatured === "true";
    }

    if (typeof isActive !== "undefined") {
      product.isActive = isActive === "true";
    }

    if (benifits) {
      try {
        product.benifits = JSON.parse(benifits);
      } catch (err) {
        return res.status(400).json({ message: "Invalid benifits format" });
      }
    }

    if (weightOptions) {
      try {
        const parsedWeightOptions = JSON.parse(weightOptions);

        if (
          !Array.isArray(parsedWeightOptions) ||
          parsedWeightOptions.length === 0
        ) {
          return res
            .status(400)
            .json({ message: "Weight option must be valid" });
        }
        product.weightOptions = parsedWeightOptions;
      } catch (err) {
        return res.status(400).json({ message: "Invalid Weight Options" });
      }
    }

    if (specifications) {
      try {
        product.specifications = JSON.parse(specifications);
      } catch (err) {
        return res.status(400).json({ message: "Inavlid Specifications" });
      }
    }

    if (nutritionInfo) {
      try {
        product.nutritionInfo = JSON.parse(nutritionInfo);
      } catch (err) {
        return res.status(400).json({ message: "invalid nutrition info" });
      }
    }
    if (seo) {
      try {
        product.seo = JSON.parse(seo);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid SEO format",
        });
      }
    }

    if (req.files && req.files.mainImage) {
      const result = await uploadToCloudinary(req.file.mainImage[0].buffer, "products/main");
      product.mainImage = result.secure_url;
    }
    
    if (req.files && req.files.images && req.files.images.length > 0) {
     let galleryImages = await Promise.all(
        req.files.images.map(async (file) => {
            const result = await uploadToCloudinary(file.buffer, "products/gallery");
            return result.secure_url;
        })
     )
     product.images = galleryImages;
    }
    if (removedImages) {
      try {
        const removed = JSON.parse(removedImages);

        product.images = product.images.filter(
          (img) => !removed.includes(img)
        );
      } catch (err) {
        return res.status(400).json({
          message: "Invalid removed images",
        });
      }
    }
    await product.save();

    res.json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "No Product Found" });
    }

    product.isActive = !product.isActive;

    await product.save();

    res.json({
      success: true,
      message: "Product Deactivated",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category", "cname");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
