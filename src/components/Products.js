import React, {Component} from 'react';
import Product from './Product';
import LoadingProducts from '../loaders/Products';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
	Collapse,
	Navbar,
	Nav,
	NavItem,
	NavLink} from 'reactstrap';

import AddProduct from './AddProduct'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		productsList: state.product.list,
		owner: state.user.owner
	};
}

class Products extends Component{
	state = {
		page: 'home'
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state || nextProps.cart.length !== this.props.cart.length || nextProps.productsList.length !== this.props.productsList.length || nextProps.selectedAccount !== this.props.selectedAccount
	}

  	render() {
		const {productsList = []} = this.props;
		const onNavBarClick = (page) => this.setState({page})
    	let productsData;
    	let term = this.props.searchTerm;
		
		function searchingFor(term){
			return function(x){
				return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
			}
		}
		productsData = productsList.filter(searchingFor(term)).map(product =>{
			return(
					<Product key={product.id} price={product.price} name={product.name} image={product.image} id={product.id} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} openModal={this.props.openModal} isAdded={this.props.cart.findIndex((x => x.id === product.id)) > 0}/>
				)
			}
		);

		// Empty and Loading States
		let view;
		if(productsData.length <= 0 && !term){
			view = <LoadingProducts />
		} else if(productsData.length <= 0 && term){
			view = <NoResults />
		} else{
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300} 
				component="div"
				className="products">
					{productsData}
			</CSSTransitionGroup>
		}

		const renderPage = () => {
			if (this.state.page === 'home') {
				return view;
			} else if (this.state.page === 'addProduct') {
				return <AddProduct />
			} else if (this.state.page === 'order') {
				return undefined
			}
		}

		return(
			<div className="products-wrapper">
				<Navbar style={{backgroundColor: '#fff', borderBottom: '1px solid gray'}} light expand="md">
					<Collapse isOpen={true} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink active={this.state.page === 'home'} onClick={() => onNavBarClick('home')}>Home</NavLink>
							</NavItem>
							{this.props.owner === this.props.selectedAccount && <NavItem>
								<NavLink active={this.state.page === 'addProduct'} onClick={() => onNavBarClick('addProduct')}>Add Product</NavLink>
							</NavItem>}
							<NavItem>
								<NavLink active={this.state.page === 'order'} onClick={() => onNavBarClick('order')}>Orders</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				{renderPage()}
			</div>
		)
	}
}

export default connect(mapStateToProps)(Products);