const fs = require('fs');
const path = require('path');
const { title } = require('process');
const { v4: uuidv4 } = require('uuid');

const getJson = () => {
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}



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
		const products = getJson();
		const product = products.find(product => product.id == id);
		res.render('detail', {title:product.name,product,toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const id = uuidv4()
		const {name,price,discount,description,category}= req.body;
		const file = req.file;

		const products = getJson();

		const newProduct={
			id:uuidv4(),
			name: name.trim(),
			price: +price,
			discount: +discount,
			category: category,
			description: description.trim(),
			image: file ? file.filename : "default.jpg"
		};

		products.push(newProduct);
		const json = JSON.stringify(products);
		fs.writeFileSync(productsFilePath,json,"utf-8");
		return res.redirect(`/products/detail/${id}`);
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const products = getJson();
		const product = products.find(product => product.id == id);
		res.render('product-edit-form', {product,toThousand})
	},

	// Update - Method to update
	
	update: (req, res) => {
		const {id} = req.params;
		const {name,price,discount,category,description,image}= req.body;
		const products = getJson();
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
		const products = getJson();
		const nuevaLista = products.filter(product => product.id !== id);
		const json = JSON.stringify(nuevaLista);
		fs.writeFileSync(productsFilePath,json,"utf-8");
		return res.redirect(`/products`);

	}
};

module.exports = controller;