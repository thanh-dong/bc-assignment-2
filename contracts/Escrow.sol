pragma solidity ^0.4.3;

contract Escrow{
    address buyer;
    address seller;
    address owner;
    uint createdTime;
    uint    buyerAcceptedAt;
    uint sellerAcceptedAt;

    function Escrow(address _buyer, address _seller, address _owner) public payable {
        buyer = _buyer;
        seller = _seller;
        owner = _owner;
        createdTime = now;
    }

    function update(bool ok) public {
        require(msg.sender == buyer || msg.sender == seller);
        if (!ok) {
            buyer.transfer(address(this).balance);
        } else {
            if (msg.sender == buyer) {
                buyerAcceptedAt = now;
            }
            if (msg.sender == seller) {
                sellerAcceptedAt = now;
            }
            if (sellerAcceptedAt > 0 && buyerAcceptedAt > 0 ) {
                seller.transfer(address(this).balance);
            }
        }
    }
}
