const fs = require('fs');
const path = require('path');
const { title } = require('process');



const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{products,toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id == id);
		res.render('detail', {title:product.name,product,toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const newId = products[products.length - 1].id;
		const {name,price,discount,description,category}= req.body;

		const newProduct={
			id: newId + 1,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category: category,
			description: description.trim(),
			image: "default-image.png",
		};

		products.push(newProduct);
		fs.writeFileSync(productsFilePath,JSON.stringify(products),'utf-8')
		return res.redirect('/products/detail'+ newProduct.id);
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id == id);
		res.render('product-edit-form', {product,toThousand})
	},

	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		const {name,price,discount,category,description,image}= req.body;
		const nuevoArray = products.map(product =>{
			if(product.id == id){
				return{
					id : +id,
					name : name.trim(),
					price: +price,
					discount: +discount,
					category,
					description : description.trim(),
					image : image ? image : product.image
				}
			}
			return product
		})
		const json = JSON.stringify(nuevoArray);
		fs.writeFileSync(productsFilePath,json,"utf-8");
		res.redirect(`/products/detail/${id}`); 
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params;
		const nuevaLista = products.filter(product => product.id != id);
		const json = JSON.stringify(nuevaLista);
		fs.writeFileSync(productsFilePath,json,"utf-8");
		res.redirect(`/products`);
	}
};

module.exports = controller;