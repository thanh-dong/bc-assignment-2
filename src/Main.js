import React, { Component } from 'react';
import Header from './components/Header';
import Products from './components/Products';
import QuickView from './components/QuickView';
import './style.css'


class Main extends Component {
	constructor(props) {
		super();
		this.state = {
			cart: [],
			totalItems: 0,
			totalAmount: 0,
			term: '',
			category: '',
			cartBounce: false,
			quantity: 1,
			quickViewProduct: {},
			modalActive: false,
			selectedAccount: props.accounts[0].value
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
		this.onAcccountChanged = this.handleChange.bind(this);
		this.clearCart = this.clearCart.bind(this);
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
		}.bind(this), 1000);
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}
	handleRemoveProduct(id, e) {
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id === id));
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

	handleChange = ({value}) => {
		this.setState({ selectedAccount: value });
    }

	clearCart = () => {
		this.setState({cart: []});
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
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
					accounts={this.props.accounts}
					onAcccountChanged={this.handleChange}
					selectedAccount={this.state.selectedAccount}
					clearCart={this.clearCart}
				/>
				<Products
					searchTerm={this.state.term}
					addToCart={this.handleAddToCart}
					productQuantity={this.state.quantity}
					updateQuantity={this.updateQuantity}
					openModal={this.openModal}
					cart={this.state.cart}
					selectedAccount={this.state.selectedAccount}
				/>
				<QuickView product={this.state.quickViewProduct} openModal={this.state.modalActive} closeModal={this.closeModal} />
			</div>
		)
	}
}

export default Main;