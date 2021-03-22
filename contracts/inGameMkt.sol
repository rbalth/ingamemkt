pragma solidity ^0.5.17;

contract inGameMarket {

    // Variable definitions

    address public owner;
    string public item;

    uint public numItems;
    
    // Game item structure
    struct Item {
        address itemDestination;
        string itemName;
        string itemValue;
        uint blockTimestamp;
    }

    mapping (uint => Item) public Items;

    // Modifier to allow only the wallet owner to create new items
    modifier onlyBy(address account) {
        if (msg.sender != account) revert();
        _;
    }

    // Function called by web interface to create a new item

    function ItemRegistration(address itemReceiver, string memory itemName, string memory itemValue ) public {
        owner = msg.sender;
        NewItem(itemReceiver, itemName, itemValue);        
    }

    // Function to enable new item creation

    function NewItem(address itemReceiver, string memory itemName, string memory itemValue) onlyBy(owner) public returns (uint itemID) {
        itemID = numItems++;
        Items[itemID] = Item(itemReceiver, itemName, itemValue, block.timestamp);
    }

    // Payable function to ransfer items to a new owners

    function Transfer(address itemReceiver, uint itemID) public payable {
		    Item storage t = Items[itemID];
		    if (t.itemDestination != msg.sender) revert();
		    t.itemDestination = itemReceiver;
    }        
}