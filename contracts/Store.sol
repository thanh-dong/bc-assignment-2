pragma solidity ^0.4.3;
import "./Escrow.sol";

contract Store {
    address public owner;
    address public escrowOwner;
    mapping (address => Customer) customers;
    mapping (uint => Product) products;
    mapping (address => Order[]) orders;
    uint orderNumber;
    uint public productCount = 0;

    struct Product {
        uint256 id;
        string name;
        string category;
        string imageLink;
        string description;
        uint price;
        ProductStatus status;
    }
    enum ProductStatus { STOCK, SOLD_OUT }
    struct Customer {
        address adr;
        bytes32 name;
        uint256 balance;
        Cart cart;
        uint256 orderNumber;
    }
    struct Cart {
        uint256[] products;
        uint256 completeSum;
    }
    struct Order {
        // uint256[] products;
        uint256 completeSum;
        address escrow;
    }
    event CustomerRegistered(address customer);
    event ProductAdded(uint256 productId, string name, string category, string imageLink, string description, uint price);
    event CartProductInserted(address customer, uint256 prodId, uint256 prodPrice, uint256 completeSum);
    event CartProductRemoved(address customer, uint256 prodId);
    event CartCheckoutCompleted(address customer, uint256 paymentSum, address escrow, string status);
    event CartEmptied(address customer);
    event OrderCreated(address customer, uint256 orderNumber);
    event OrderConfirm(address customer, string status);
    function Store() public {
        owner = msg.sender;
    }

    function connectEscrowOwner(address _eOwner) public {
        escrowOwner = _eOwner;
    }

    function addProduct(string name, string category, string imageLink, string description, uint price) public {
        products[productCount].id = productCount;
        products[productCount].name = name;
        products[productCount].category = category;
        products[productCount].imageLink = imageLink;
        products[productCount].description = description;
        products[productCount].price = price;
        products[productCount].status = ProductStatus.STOCK;
        ProductAdded(productCount, name, category, imageLink, description, price);
        productCount++;
    }

    function getProduct(uint productId) public view returns (
            string,
            string,
            string,
            string,
            uint,
            ProductStatus
        ) {
        if (productId <= productCount) {
            return (
                products[productId].name,
                products[productId].category,
                products[productId].imageLink,
                products[productId].description,
                products[productId].price,
                products[productId].status
            );
        }
    }

    function getProductCount() public view returns (uint) {
        return productCount;
    }

    function registerCustomer(address _address, bytes32 _name, uint256 _balance) public {
        Customer memory customer = Customer({adr: _address, name: _name, balance: _balance, cart: Cart(new uint256[](0), 0),orderNumber: 0});
        customers[_address] = customer;
        CustomerRegistered(_address);
    }

    // use when we store cart in block chain
    function addToCart(uint256 id) public returns (bool success, uint256 pos_in_prod_mapping) {
        Customer storage cust = customers[msg.sender];
        Product memory prod = products[id];
        uint256 prods_prev_len = cust.cart.products.length;
        cust.cart.products.push(prod.id);
        uint256 current_sum = cust.cart.completeSum;
        cust.cart.completeSum = current_sum + prod.price;
        if (cust.cart.products.length > prods_prev_len) {
            CartProductInserted(msg.sender, id, prod.price, cust.cart.completeSum);
            return (true, cust.cart.products.length - 1);
        }
        return (false, 0);
    }

    function checkoutCart() public payable{
        address escrow = address(((new Escrow).value(msg.value)(msg.sender, owner, escrowOwner)));
        orders[msg.sender].push(Order(msg.value, escrow));
        orderNumber++;
        CartCheckoutCompleted(msg.sender, msg.value, escrow, "open");
    }


    // function confirmOrder() public {
    //     orders[msg.sender].escrow.update(true);
    //     OrderConfirm(msg.sender, orders[msg.sender].escrow.status);
    // }

    // function rejectOrder(uint256 _orderNumber) public returns (bool success) {
    //     orders[_orderNumber].escrow.update(false);
    // }
}
