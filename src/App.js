import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import { getStore, getStoreOwnerAccount } from './utils/getContracts'
import Main from './Main'
import {store} from './store'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  async componentWillMount() {
    const ownerAccount = await getStoreOwnerAccount();
    const store = await getStore();
    getWeb3
      .then(results => 
        results.web3.eth.getAccounts((error, accounts) => 
          store.deployed()
              .then((instance) => {
                instance.connectEscrowOwner(accounts[1], { from: ownerAccount });
              }))
      ).catch(() => {
        console.log('Error finding web3.')
      })
  }

  async componentDidMount() {
    const store = await getStore();
    store.deployed()
      .then((instance) => {
          instance.ProductAdded().watch((error, result) => {
            console.log(result.args)
            // if (!error) {
            //   // store.dispath('PRODUCT_ADDED', result.arg)
            // }

          });
      });
  }

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App
