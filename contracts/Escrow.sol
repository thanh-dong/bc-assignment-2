pragma solidity ^0.4.3;

contract Escrow{
    address public buyer;
    address public seller;
    address owner;
    uint createdTime;
    uint buyerAcceptedAt;
    uint sellerAcceptedAt;
    uint ownerAcceptedAt;
    string public status = "open";

    function Escrow(address _buyer, address _seller, address _owner) public payable {
        buyer = _buyer;
        seller = _seller;
        owner = _owner;
        createdTime = now;
    }

    function update(bool ok) public {
        require(msg.sender == buyer || msg.sender == seller);
        if (!ok) {
            buyer.transfer(address(this).balance*99/100);
            owner.transfer(address(this).balance/100);
            status = "rejected";
        } else {
            if (msg.sender == buyer) {
                buyerAcceptedAt = now;
            }
            if (msg.sender == seller) {
                sellerAcceptedAt = now;
            }
            if (sellerAcceptedAt > 0 && buyerAcceptedAt > 0 ) {
                seller.transfer(address(this).balance*99/100);
                owner.transfer(address(this).balance/100);
                status = "success";
            }
        }
    }

    function status() public returns (string success) {
        return status;
    }
}
