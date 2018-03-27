import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ipfsAPI from 'ipfs-api';
import {getStore, getStoreOwnerAccount} from '../utils/getContracts'

class AddProduct extends Component {
	state = {
		name: '',
		category: '',
		description: '',
		price: '',
		image: ''
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
			</Form>);
	}


	onSubmit = (e) => {
		e.preventDefault();
		const {name, category, description, price, image} = this.state;
		return getStoreOwnerAccount()
		.then((account) => 
			getStore().then((store) => store.deployed().then((i) => i.addProduct(name, category, image, description, 111111111, {from: account}))));
	}

	uploadPhoto = (e) => {
		const ipfs = ipfsAPI('localhost', '5001');
		const reader = new FileReader();
		reader.onloadend = async () => {
			const [response] = await ipfs.add([Buffer.from(reader.result)]);
			this.setState({
				image: `http://127.0.0.1:8080/ipfs/${response.hash}`,
			});
		};
		reader.readAsArrayBuffer(e.target.files[0]);
		};
}

export default AddProduct;