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

class Products extends Component{
	state = {
		page: 'home'
	}


  	render(){
		const onNavBarClick = (page) => this.setState({page})
    	let productsData;
    	let term = this.props.searchTerm;
		
		function searchingFor(term){
			return function(x){
				return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
			}
		}
		productsData = this.props.productsList.filter(searchingFor(term)).map(product =>{
			return(
						<Product key={product.id} price={product.price} name={product.name} image={product.image} id={product.id} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} openModal={this.props.openModal}/>
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
							<NavItem>
								<NavLink active={this.state.page === 'addProduct'} onClick={() => onNavBarClick('addProduct')}>Add Product</NavLink>
							</NavItem>
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

export default Products;