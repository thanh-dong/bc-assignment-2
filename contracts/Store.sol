pragma solidity ^0.4.3;
import "./Escrow.sol";

contract Store {
    address public owner;
    address public escrowOwner;
    mapping (address => Customer) customers;
    mapping (uint256 => Product) products;
    mapping (uint256 => Order) orders;
    uint256 orderNumber;
    uint256 productCount;
    struct Product {
        uint256 id;
        string name;
        string category;
        string imageLink;
        string descLink;
        uint256 price;
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
        Escrow escrow;
    }
    event CustomerRegistered(address customer);
    event ProductAdded(uint256 productId, string name, string category, string imageLink, string descLink, uint price);
    event CartProductInserted(address customer, uint256 prodId, uint256 prodPrice, uint256 completeSum);
    event CartProductRemoved(address customer, uint256 prodId);
    event CartCheckoutCompleted(address customer, uint256 paymentSum);
    event CartEmptied(address customer);
    event OrderCreated(address customer, uint256 orderNumber);

    function Store() public {
        owner = msg.sender;
    }

    function connectEscrowOwner(address _eOwner) public {
        escrowOwner = _eOwner;
    }

    function addProduct(string name, string category, string imageLink, string descLink, uint price) public {
        products[productCount].id = productCount;
        products[productCount].name = name;
        products[productCount].category = category;
        products[productCount].imageLink = imageLink;
        products[productCount].descLink = descLink;
        products[productCount].price = price;
        products[productCount].status = ProductStatus.STOCK;
        ProductAdded(productCount, name, category, imageLink, descLink, price);
        productCount++;
    }

    function registerCustomer(address _address, bytes32 _name, uint256 _balance) public {
        Customer memory customer = Customer({adr: _address, name: _name, balance: _balance, cart: Cart(new uint256[](0), 0),orderNumber: 0});
        customers[_address] = customer;
        CustomerRegistered(_address);
    }

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

    // function removeFromCart(uint256 prod_pos_in_mapping) public {
    //     uint256[] memory new_product_list = new uint256[](customers[msg.sender].cart.products.length - 1);
    //     Product[] storage customerProds = customers[msg.sender].cart.products;
    //     for (uint256 i = 0; i < customerProds.length; i++) {
    //         if (i != prod_pos_in_mapping) {
    //             new_product_list[i] = customerProds[i];
    //         } else {
    //             customers[msg.sender].cart.completeSum -= products[customerProds[i]].price;
    //             CartProductRemoved(msg.sender, customerProds[i]);
    //         }
    //     }
    //     customers[msg.sender].cart.products = new_product_list;
    // }

    function checkoutCart() public returns (bool success) {
        Customer memory customer = customers[msg.sender];
        uint256 paymentSum = customer.cart.completeSum;
        if ((customer.balance >= paymentSum) &&
            customer.cart.products.length > 0) {
            customer.cart = Cart(new uint256[](0), 0);
            Order memory order = Order((new Escrow).value(paymentSum)(msg.sender, owner, escrowOwner));
            order.escrow.update(true);
            // customer.orders.push(order);
            customer.orderNumber++;
            orders[orderNumber] = order;
            orderNumber++;
            CartCheckoutCompleted(msg.sender, paymentSum);
            OrderCreated(msg.sender, customer.orderNumber);
            return true;
        }
        return false;
    }

    function confirmOrder(uint256 _orderNumber) public returns (bool success) {
        orders[orderNumber].escrow.update(true);
    }

    function rejectOrder(uint256 _orderNumber) public returns (bool success) {
        orders[orderNumber].escrow.update(false);
    }
}
