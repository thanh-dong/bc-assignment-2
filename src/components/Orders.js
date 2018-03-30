import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import getWeb3 from '../utils/getWeb3'
import { getEscrow } from '../utils/getContracts'

const mapStateToProps = (state) => {
	return {
		productsList: state.product.list,
		orders: state.order,
		owner: state.user.owner
	};
}

class Orders extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.orders !== this.props.orders || nextProps.account !== this.props.account 
	}

  render() {
	let orderList = {}
	if (this.props.owner !== this.props.account) {
		orderList = _.pick(this.props.orders, this.props.account)
	} else {
		orderList = this.props.orders;
	}
    return (
		<div style={{padding: 20}}>
			{_(orderList).keys().map((key) => this.renderGroup(key, orderList[key])).value()}
	  	</div>
    );
  }

  renderGroup  = (account, orders) => {
	return (<ListGroup>
		{_.map(orders, (item) => this.renderItem(item, account))}
	</ListGroup>);
  }

  renderItem = (item, account) => 
	(
		<ListGroupItem>
			<ListGroupItemHeading>
				Status: <Badge color="success">{item.status}</Badge>
				{this.props.owner === this.props.account && 
					<Badge color="success" style={{marginLeft: 15}}>From: {account}</Badge>
				}
				</ListGroupItemHeading>
			<ListGroupItemText>
				Total: {item.value}
			</ListGroupItemText>
			<ListGroupItemText>
				<div className="product-action">
                    <button className={"added"} type="button" onClick={() => this.confirm(account, item.escrow)}>Confirm</button>
                </div>
			</ListGroupItemText>
		</ListGroupItem>
	)

	confirm = async (account, escrowAdd) => {
		const Escrow = await getEscrow()
		Escrow.at(escrowAdd).update({from: account});
	}
}

export default connect(mapStateToProps)(Orders)