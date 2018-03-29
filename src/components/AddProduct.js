import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import ipfsAPI from 'ipfs-api';
import {getStore, getStoreOwnerAccount} from '../utils/getContracts'
import {store, productAdded} from '../store'

class AddProduct extends Component {
	state = {
		name: '',
		category: '',
		description: '',
		price: '',
		image: '',
		added: false
	}

	componentDidMount() {
		getStore().then(st => 
			st.deployed()
      		.then((instance) => {
				instance.ProductAdded().watch((error, result) => {
					if (!error) {
						const product = {
							id: result.args.productId.toString(),
							name: result.args.name,
							category: result.args.category,
							price: result.args.price.toString(),
							description: result.args.description,
							status: result.args.status,
							image: `http://127.0.0.1:8080//ipfs/${result.args.imageLink}`
						}
						store.dispatch(productAdded(product));
					}
				});
			})
		);
	}

	render() {
		const {name, category, description, price} = this.state;

		const onChange = (e) => {
			this.setState({[e.target.name]: e.target.value})
		}
		return (
			<Form style={{padding: 20}}>
				<FormGroup>
					<Label for="exampleEmail">Name</Label>
					<Input type="text" name="name" id="name" placeholder="Product name" onChange={onChange} value={name}/>
				</FormGroup>
				<FormGroup>
					<Label for="examplePassword">Category</Label>
					<Input type="text" name="category" id="category" placeholder="Product category" onChange={onChange} value={category}/>
				</FormGroup>
				<FormGroup>
					<Label for="examplePassword">Description</Label>
					<Input type="text" name="description" id="description" placeholder="Description" onChange={onChange} value={description}/>
				</FormGroup>
				<FormGroup>
					<Label for="examplePassword">Price (finney)</Label>
					<Input type="number" name="price" id="price" placeholder="Product price" onChange={onChange} value={price}/>
				</FormGroup>
				<FormGroup>
					<Label for="image">Image</Label>
					<Input type="file" name="image" id="image" onChange={this.uploadPhoto}/>
				</FormGroup>
				<Button onClick={this.onSubmit}>Add Product</Button>
				<Alert style={{marginTop: 20}} color="info" isOpen={this.state.added} toggle={this.onDismiss}>
					Product added successfully!
				</Alert>
			</Form>);
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {name, category, description, price, image} = this.state;
		return getStoreOwnerAccount()
		.then((account) => 
			getStore().then((store) => store.deployed().then((i) => {
				i.addProduct(name, category, image, description, Number(price), {from: account, gas: 3000000 });
		})))
		.then(()=> this.setState({name: undefined, category: undefined, description: undefined, price:undefined, image: undefined, added: true}));
	}
	onDismiss = () => {
		this.setState({ added: false });
	}

	uploadPhoto = (e) => {
		const ipfs = ipfsAPI('localhost', '5001');
		const reader = new FileReader();
		reader.onloadend = async () => {
			const [response] = await ipfs.add([Buffer.from(reader.result)]);
			this.setState({
				image: response.hash,
			});
		};
		reader.readAsArrayBuffer(e.target.files[0]);
		};
}

export default AddProduct;