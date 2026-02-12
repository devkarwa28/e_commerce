const Category = require('../models/CategoryModel');
const slugify = require('slugify');
const path = require('path');

exports.createCategory = async (req,res) =>{
    try{
        const {cname} = req.body;
        if(!cname)
        {
            return res.status(400).json({message: "Cat name is required"})
        }
        const  existingCategory = await Category.findOne({cname});

        if(existingCategory)
        {
            return res.status(400).json({message: "this category is already present"})
        }
        let imageURL = "";
        if(req.file){
            imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }
        const category = await Category.create({cname,slug: slugify(cname,{lower: true}),image: imageURL})
        res.status(201).json(category);
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
}

exports.getAllCategory = async (req,res) =>{
    try{
        const categories = await Category.find({isActive: true}).sort({createdAt: -1});
        res.json(categories); 
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
}

exports.getOneCategory = async (req,res) =>{
    try{
        const category = await Category.findById((req.params.id));
        if(!category)
        {
            return res.status(400).json({message: "Category Not Found"})
        }
        res.json(category);
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
};

exports.updateCategory = async (req,res) =>{
    try{
        const {id} = req.params;
        const {cname,isActive} = req.body;
        
        const category = await Category.findById(id);

        if(!category)
        {
            return res.status(404).json({message: "Categort Not founded"});
        }
        if(cname)
        {
            category.cname = cname;
            category.slug = slugify(cname,{lower: true});
        }
        if(typeof isActive !== "undefined")
        {
            category.isActive = isActive;
        }
        if(req.file)
        {
            category.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }
        await category.save();

        res.json(category);
    }
    catch(err){
        res.status(500).json({message: "Server Error"})
    }
}

exports.deleteCategory = async (req,res) =>{
    try{
        const {id} = req.params;
        const category = await Category.findById(id);

        if(!category)
        {
            return res.status(404).json({message: "No Category"})
        }
        category.isActive = false;
        await category.save();
        res.json({message: "Category Disabled"})
    }
    catch(err){

    }
}