const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Category = require('./models/Category');
const SubCategory = require('./models/SubCategory');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Seed Admin
        const adminEmail = 'admin@ficc.co.in';
        const adminExists = await Admin.findOne({ email: adminEmail });
        if (!adminExists) {
            const admin = new Admin({
                email: adminEmail,
                password: 'antony@uniform', // Will be hashed by pre-save hook
                role: 'admin'
            });
            await admin.save();
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        // 2. Seed Categories and Subcategories
        const categories = [
            {
                name: 'School',
                slug: 'school',
                subcategories: ['Regular', 'Sports', 'Kinder Garden', 'Play Group']
            },
            {
                name: 'Hospitality',
                slug: 'hospitality',
                subcategories: ['Apron', 'Cap', 'Chef Coat', 'Tableware', 'T-Shirt', 'Shirts', 'Normal working coat (sleeve)', 'Normal working coat (without sleeve)']
            },
            {
                name: 'Healthcare',
                slug: 'healthcare',
                subcategories: ['Lab Coat Apron', 'OT Gowns', 'Scrubs', 'Scrub Cap', 'T-Shirt']
            },
            {
                name: 'Industrial',
                slug: 'industrial',
                subcategories: ['Coverall', 'Safety Vest', 'Safety Shirt', 'Steel', 'Welding']
            },
            {
                name: 'Police',
                slug: 'police',
                subcategories: ['Police Fabric', 'Police Jacket', 'Police Uniform', 'T-Shirt']
            },
            {
                name: 'Military',
                slug: 'military',
                subcategories: ['Indian Coast Guard', 'Paramilitary', 'Indian Navy']
            },
            {
                name: 'Salon',
                slug: 'salon',
                subcategories: ['Apron', 'Hair Cutting Sheet', 'Staff Cap', 'T-Shirt', 'Shirts']
            },
            {
                name: 'Corporate',
                slug: 'corporate',
                subcategories: ['Shirts', 'T-Shirts', 'Blazers', 'Trousers']
            },
            {
                name: 'Sports',
                slug: 'sports',
                subcategories: ['Events', 'Bouncers', 'Marathon', 'Kabaddi']
            },
            {
                name: 'Customize',
                slug: 'customize',
                subcategories: ['Linen', 'Cotton', 'Dhotis', 'Uniforms']
            }
        ];

        for (const catData of categories) {
            let category = await Category.findOne({ slug: catData.slug });
            if (!category) {
                category = new Category({
                    name: catData.name,
                    slug: catData.slug,
                    description: `Premium ${catData.name} uniforms and apparel.`
                });
                await category.save();
                console.log(`Category created: ${catData.name}`);
            } else {
                category.name = catData.name;
                await category.save();
            }

            for (const subName of catData.subcategories) {
                const subSlug = subName.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
                let subCategory = await SubCategory.findOne({ slug: subSlug, category: category._id });
                if (!subCategory) {
                    subCategory = new SubCategory({
                        name: subName,
                        slug: subSlug,
                        category: category._id,
                        description: `${subName} solutions for ${catData.name} sector.`
                    });
                    await subCategory.save();
                    console.log(`SubCategory created: ${subName} under ${catData.name}`);
                }
            }
        }

        console.log('Seeding completed successfully');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
