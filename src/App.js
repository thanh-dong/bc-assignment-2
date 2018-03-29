import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import { getStore, getStoreOwnerAccount } from './utils/getContracts'
import Main from './Main'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import {store, productAdded, ownerLoaded} from './store'
import _ from 'lodash';

class App extends Component {
  state = {
    
  }
  async componentDidMount() {
    const ownerAccount = await getStoreOwnerAccount();
    store.dispatch(ownerLoaded(ownerAccount));
    const _store = await getStore();
    getWeb3
      .then(results => 
        results.web3.eth.getAccounts((error, accounts) => {
          this.setState({
              accounts: _.map(accounts, (account) => ({label: account, value: account}))
            });
          _store.deployed()
                .then((instance) => {
                  instance.connectEscrowOwner(accounts[1], { from: ownerAccount });
                });
              })
      ).catch(() => {
        console.log('Error finding web3.')
      });

      getStore().then(st =>
        st.deployed()
          .then((instance) =>
            instance.getProductCount.call().then(count => {
              for (let i = 0; i < count.toNumber(); i++) {
                instance.getProduct.call(i).then(data => {
                  store.dispatch(productAdded({
                    id: i,
                    name: data[0],
                    category: data[1],
                    image: `http://127.0.0.1:8080//ipfs/${data[2]}`,
                    description: data[3],
                    price: data[4].toNumber(),
                    status: data[5].toNumber()
                  }))
                }
                )
              }
            }))
      );
  }

  render() {
    if (!this.state.accounts) return null;

    return (
      <div className="App">
        <Main 
          accounts={this.state.accounts}
        />
      </div>
    );
  }
}

export default App
