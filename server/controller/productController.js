const Product = require('../models/productModel');
const Category = require('../models/CategoryModel');
const slugify = require('slugify');
const { options } = require('../routes/categoryRoutes');

exports.createProduct = async (req,res) =>{
    try{
        const {pname,description,category,benifits,weightOptions,specifications,nutritionInfo,isFeatured}= req.body;

        if(!pname || !description || !category)
        {
            return res.status(400).json({message: "Name,Desc, & category are required"});
        }

        const categoryExists = await Category.findById(category);
        if(!categoryExists)
        {
            return res.status(400).json({message: "Invalid Category"});
        }

        const slug = slugify(pname,{lower:true});

        const existingProduct = await Product.findOne({slug});
        if(existingProduct)
        {
            return res.status(400).json({message: "Product name exist"})
        }

        if(!req.files || !req.files.mainImage)
        {
            return res.status(400).json({message: "Main Image is Required"})
        }
        const mainImageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.files.mainImage[0].filename}`;

        let galleryImages = [];

        if(req.files.images && req.files.images.length > 0)
        {
            galleryImages = req.files.images.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        }

        let parsedWeightOptions = [];
        let  parsedBenifits = [];
        let parsedSpecifications = {};
        let parsedNutrition = {};
        
        if(weightOptions)
        {
            parsedWeightOptions = JSON.parse(weightOptions)
        
        if(!Array.isArray(parsedWeightOptions) || parsedWeightOptions.length === 0)
        {
            return res.status(400).json({message: "one  weight is required minimum"})
        }

        parsedWeightOptions.forEach(option =>{
            if(!option.label || !option.price || option.stock == null)
            {
                return res.status(400).json({message: "Invalid Weight structure"})
            }
        });
    }
    else{
        return res.status(400).json({message: "Weight options are required"})
    }

    if(benifits)
    {
        parsedBenifits = JSON.parse(benifits)
    }
    if(specifications)
    {
        parsedSpecifications = JSON.parse(specifications)
    }
    if(nutritionInfo)
    {
        parsedNutrition = JSON.parse(nutritionInfo);
    }

    const product = await Product.create({
        pname,
        slug,
        description,
        category,
        mainImage: mainImageUrl,
        image: galleryImages,
        weightOptions: parsedWeightOptions,
        benifits: parsedBenifits,
        specifications: parsedSpecifications,
        nutritionInfo: parsedNutrition,
        isFeatured: isFeatured === "true"
    });
    res.status(201).json({success: true, message: "Product Created SuccessFully", product});
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
}

exports.getProducts = async (req,res) =>{
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const {category,search,minPrice,maxPrice,featured} = req.query;

        let query = {isActive : true};

        if(category){
            query.category = category
        }
        if(featured === "true")
        {
            query.isFeatured = true;
        }
        if(search)
        {
            query.$text = {$search: search};
        }

        let products = await Product.find(query).populate("category","cname").sort({createdAt: -1})
        .skip(skip).limit(limit);

        if(minPrice || maxPrice)
        {
            products = products.filter(product => {
                return product.weightOptions.some(option =>{
                    const price = option.price;
                    return (
                        (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice))
                    )
                })
            })
        }
        const totalProducts = await Product.countDocuments(query);
        res.json({
            products,
            page,
            totalPages: Math.ceil(totalProducts/limit),
            totalProducts
        });
    }
    catch(err){
        res.status(500).json({message: "Server Error"});
    }
}
exports.getProductBySlug = async (req,res) =>{
    try{
        const product = await Product.findOne({slug: req.params.slug,isActive: true}).populate("category","cname");
        
        if(!product)
        {
            return res.status(404).json({message: "Product Not Found"});
        }
        res.json(product);
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
}
exports.updateProduct = async (req,res) =>{
    try{
        const {id} = req.params;

        const product = await Product.findById(id);

        if(!product)
        {
            return res.status(404).json({message: "Product Not Found"});
        }

        const {pname,description,category,benifits,weightOptions,specifications,nutritionInfo,isFeatured,isActive} = req.body;

        if(pname)
        {
            product.pname = pname;
            product.slug = slugify(pname,{lower: true});
        }

        if(description)
        {
            product.description = description;
        }

        if(category)
        {
            const categoryExist = await Category.findById(category)
            if(!category)
            {
                return res.status(400).json({message: "No Category Found"})
            }
            product.category = category;
        }

        if(typeof isFeatured !== "undefined")
        {
            product.isFeatured = isFeatured === "true";
        }

        if(typeof isActive !== "undefined")
        {
            product.isActive = isActive === "true"
        }

        
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
}