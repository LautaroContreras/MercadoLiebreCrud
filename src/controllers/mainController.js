const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	index: (req, res) => {
		const visited =products.filter(product => product.category == "visited");

		
		const inSale =products.filter(product => product.category == "in-sale");
		
		res.render("index",{visited,inSale,toThousand})
	},
	search: (req, res) => {
		const busqueda = req.query.keywords
		const resultados = [];
		products.forEach(product => {
			if (product.name.toLowerCase().includes(busqueda)){
				resultados.push(product)
			}
		});
		return res.render('results',{resultados,busqueda,toThousand});
	},
};

module.exports = controller;
