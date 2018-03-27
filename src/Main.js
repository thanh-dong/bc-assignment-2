import React, { Component } from 'react';
import Header from './components/Header';
import Products from './components/Products';
import QuickView from './components/QuickView';
import './style.css'

class Main extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0,
			term: '',
			category: '',
			cartBounce: false,
			quantity: 1,
			quickViewProduct: {},
			modalActive: false
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleMobileSearch = this.handleMobileSearch.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	getProducts() {
		this.setState({
			products: [
				{
					"id": 1,
					"name": "Brocolli - 1 Kg",
					"price": 120,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
					"category": "vegetables"
				},
				{
					"id": 2,
					"name": "Cauliflower - 1 Kg",
					"price": 60,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg",
					"category": "vegetables"
				},
				{
					"id": 3,
					"name": "Cucumber - 1 Kg",
					"price": 48,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg",
					"category": "vegetables"
				},
				{
					"id": 4,
					"name": "Beetroot - 1 Kg",
					"price": 32,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg",
					"category": "vegetables"
				},
				{
					"id": 5,
					"name": "Carrot - 1 Kg",
					"price": 56,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/carrots.jpg",
					"category": "vegetables"
				},
				{
					"id": 6,
					"name": "Tomato - 1 Kg",
					"price": 16,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/tomato.jpg",
					"category": "vegetables"
				},
				{
					"id": 7,
					"name": "Beans - 1 Kg",
					"price": 82,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beans.jpg",
					"category": "vegetables"
				},
				{
					"id": 8,
					"name": "Brinjal - 1 Kg",
					"price": 35,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/brinjal.jpg",
					"category": "vegetables"
				},
				{
					"id": 9,
					"name": "Capsicum",
					"price": 60,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/capsicum.jpg",
					"category": "vegetables"
				},
				{
					"id": 10,
					"name": "Mushroom - 1 Kg",
					"price": 75,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/button-mushroom.jpg",
					"category": "vegetables"
				},
				{
					"id": 11,
					"name": "Potato - 1 Kg",
					"price": 22,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/potato.jpg",
					"category": "vegetables"
				},
				{
					"id": 12,
					"name": "Pumpkin - 1 Kg",
					"price": 48,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/pumpkin.jpg",
					"category": "vegetables"
				},
				{
					"id": 13,
					"name": "Corn - 1 Kg",
					"price": 75,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/corn.jpg",
					"category": "vegetables"
				},
				{
					"id": 14,
					"name": "Onion - 1 Kg",
					"price": 16,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/onion.jpg",
					"category": "vegetables"
				},
				{
					"id": 15,
					"name": "Apple - 1 Kg",
					"price": 72,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg",
					"category": "fruits"
				},
				{
					"id": 16,
					"name": "Banana - 1 Kg",
					"price": 45,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/banana.jpg",
					"category": "fruits"
				},
				{
					"id": 17,
					"name": "Grapes - 1 Kg",
					"price": 60,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/grapes.jpg",
					"category": "fruits"
				},
				{
					"id": 18,
					"name": "Mango - 1 Kg",
					"price": 75,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/mango.jpg",
					"category": "fruits"
				},
				{
					"id": 19,
					"name": "Musk Melon - 1 Kg",
					"price": 36,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/musk-melon.jpg",
					"category": "fruits"
				},
				{
					"id": 20,
					"name": "Orange - 1 Kg",
					"price": 75,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/orange.jpg",
					"category": "fruits"
				},
				{
					"id": 21,
					"name": "Pears - 1 Kg",
					"price": 69,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/pears.jpg",
					"category": "fruits"
				},
				{
					"id": 22,
					"name": "Pomegranate - 1 Kg",
					"price": 95,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/pomegranate.jpg",
					"category": "fruits"
				},
				{
					"id": 23,
					"name": "Raspberry - 1/4 Kg",
					"price": 160,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/raspberry.jpg",
					"category": "fruits"
				},
				{
					"id": 24,
					"name": "Strawberry - 1/4 Kg",
					"price": 180,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/strawberry.jpg",
					"category": "fruits"
				},
				{
					"id": 25,
					"name": "Water Melon - 1 Kg",
					"price": 28,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/water-melon.jpg",
					"category": "fruits"
				},
				{
					"id": 26,
					"name": "Almonds - 1/4 Kg",
					"price": 200,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/almonds.jpg",
					"category": "nuts"
				},
				{
					"id": 27,
					"name": "Pista - 1/4 Kg",
					"price": 190,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/pista.jpg",
					"category": "nuts"
				},
				{
					"id": 28,
					"name": "Nuts Mixture - 1 Kg",
					"price": 950,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/nuts-mixture.jpg",
					"category": "nuts"
				},
				{
					"id": 29,
					"name": "Cashews - 1 Kg",
					"price": 650,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/cashews.jpg",
					"category": "nuts"
				},
				{
					"id": 30,
					"name": "Walnuts - 1/4 Kg",
					"price": 170,
					"image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/walnuts.jpg",
					"category": "nuts"
				}
			]
		});
	}
	componentWillMount() {
		this.getProducts();
	}

	// Search by Keyword
	handleSearch(event) {
		this.setState({ term: event.target.value });
	}
	// Mobile Search Reset
	handleMobileSearch() {
		this.setState({ term: "" });
	}
	// Filter by Category
	handleCategory(event) {
		this.setState({ category: event.target.value });
		console.log(this.state.category);
	}
	// Add to Cart
	handleAddToCart(selectedProducts) {
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
		if (this.checkProduct(productID)) {
			let index = cartItem.findIndex((x => x.id == productID));
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart: cartItem,
			cartBounce: true,
		});
		setTimeout(function () {
			this.setState({
				cartBounce: false,
				quantity: 1
			});
			console.log(this.state.quantity);
			console.log(this.state.cart);
		}.bind(this), 1000);
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}
	handleRemoveProduct(id, e) {
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id == id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();
	}
	checkProduct(productID) {
		let cart = this.state.cart;
		return cart.some(function (item) {
			return item.id === productID;
		});
	}
	sumTotalItems() {
		let total = 0;
		let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
	}
	sumTotalAmount() {
		let total = 0;
		let cart = this.state.cart;
		for (var i = 0; i < cart.length; i++) {
			total += cart[i].price * parseInt(cart[i].quantity);
		}
		this.setState({
			totalAmount: total
		})
	}

	//Reset Quantity
	updateQuantity(qty) {
		console.log("quantity added...")
		this.setState({
			quantity: qty
		})
	}
	// Open Modal
	openModal(product) {
		this.setState({
			quickViewProduct: product,
			modalActive: true
		})
	}
	// Close Modal
	closeModal() {
		this.setState({
			modalActive: false
		})
	}

	render() {
		return (
			<div className="container">
				<Header
					cartBounce={this.state.cartBounce}
					total={this.state.totalAmount}
					totalItems={this.state.totalItems}
					cartItems={this.state.cart}
					removeProduct={this.handleRemoveProduct}
					handleSearch={this.handleSearch}
					handleMobileSearch={this.handleMobileSearch}
					handleCategory={this.handleCategory}
					categoryTerm={this.state.category}
					updateQuantity={this.updateQuantity}
					productQuantity={this.state.moq}
				/>
				
				<Products
					productsList={this.state.products}
					searchTerm={this.state.term}
					addToCart={this.handleAddToCart}
					productQuantity={this.state.quantity}
					updateQuantity={this.updateQuantity}
					openModal={this.openModal}
				/>
				<QuickView product={this.state.quickViewProduct} openModal={this.state.modalActive} closeModal={this.closeModal} />
			</div>
		)
	}
}

export default Main;