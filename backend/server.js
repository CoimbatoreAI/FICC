const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB connected successfully');

        // Auto-seed Categories and Subcategories
        try {
            const Category = require('./models/Category');
            const SubCategory = require('./models/SubCategory');

            const categoriesToSeed = [
                { name: 'School', slug: 'school', subcategories: ['Regular', 'Sports', 'Kinder Garden', 'Play Group'] },
                { name: 'Hospitality', slug: 'hospitality', subcategories: ['Apron', 'Cap', 'Chef Coat', 'Tableware', 'T-Shirt', 'Shirts', 'Normal working coat (sleeve)', 'Normal working coat (without sleeve)'] },
                { name: 'Healthcare', slug: 'healthcare', subcategories: ['Lab Coat Apron', 'OT Gowns', 'Scrubs', 'Scrub Cap', 'T-Shirt'] },
                { name: 'Industrial', slug: 'industrial', subcategories: ['Coverall', 'Safety Vest', 'Safety Shirt', 'Steel', 'Welding'] },
                { name: 'Police', slug: 'police', subcategories: ['Police Fabric', 'Police Jacket', 'Police Uniform', 'T-Shirt'] },
                { name: 'Military', slug: 'military', subcategories: ['Indian Coast Guard', 'Paramilitary', 'Indian Navy'] },
                { name: 'Salon', slug: 'salon', subcategories: ['Apron', 'Hair Cutting Sheet', 'Staff Cap', 'T-Shirt', 'Shirts'] },
                { name: 'Corporate', slug: 'corporate', subcategories: ['Shirts', 'T-Shirts', 'Blazers', 'Trousers'] },
                { name: 'Sports', slug: 'sports', subcategories: ['Events', 'Bouncers', 'Marathon', 'Kabaddi'] },
                { name: 'Customize', slug: 'customize', subcategories: ['Linen', 'Cotton', 'Dhotis', 'Uniforms'] }
            ];

            for (const catData of categoriesToSeed) {
                let category = await Category.findOne({ slug: catData.slug });
                if (!category) {
                    category = new Category({
                        name: catData.name,
                        slug: catData.slug,
                        description: `Premium ${catData.name} uniforms and apparel.`
                    });
                    await category.save();
                } else if (category.name !== catData.name) {
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
                    }
                }
            }
            console.log('Database auto-seeding completed');
        } catch (seedError) {
            console.error('Auto-seeding error:', seedError);
        }
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.get('/', (req, res) => {
    res.send('FICC Backend API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
