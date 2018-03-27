import getWeb3 from './getWeb3'
import contract from 'truffle-contract'
import StoreContract from '../../build/contracts/Store.json'
import EscrowContract from '../../build/contracts/Escrow.json'

export function getStore() {
    return getWeb3.then((result) => {
        const Store = contract(StoreContract);
        Store.setProvider(result.web3.currentProvider);
        return Store;
    });
}

export function getEscrow() {
    return getWeb3.then((result) => {
        const Escrow = contract(EscrowContract);
        Escrow.setProvider(result.web3.currentProvider);
        return Escrow;
    });
}

export function getStoreOwnerAccount() {
    return getWeb3.then((result) => result.web3.eth.accounts[0]);
}