// This function is executed when the page loads to enable Ethereum connection button

window.onload=function(){
	document.getElementById('enableEthereumButton').addEventListener('click', () => {
		getAccount();
		location.reload();
	});
	account = getCookie('account');
	if(account) {
		document.getElementById('showAccount').innerHTML = account;
	}
}

// Connecting to localhost Ethereum test blockchain
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;

// Displays a message ifEthereum wallet is installed

if (typeof window.ethereum !== 'undefined') {
	console.log('MetaMask is installed!');
}

myContract = new web3.eth.Contract(
// ENTER YOUR ABI CONTENT HERE.
[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "itemReceiver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itemValue",
				"type": "string"
			}
		],
		"name": "ItemRegistration",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Items",
		"outputs": [
			{
				"internalType": "address",
				"name": "itemDestination",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itemValue",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "blockTimestamp",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "itemReceiver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itemValue",
				"type": "string"
			}
		],
		"name": "NewItem",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "itemID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "itemReceiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "itemID",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "item",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numItems",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
);

myContract.options.address = "0x83682EA0Cf1fb20f133039a6FA3859709A003600"; //update with your own contract address

// Show Items created in the blockchain
var numItems = myContract.methods.numItems().call(function(err, res){
	numItems = res;
	var text = "";
	var i;
	var count = 0;
	for (i = 0; i < numItems; i++) {
		var Items = myContract.methods.Items(i).call((error, result) => {
			ul = document.createElement('ul');
			document.getElementById('itemsList').appendChild(ul);
			let li = document.createElement('li');
    		ul.appendChild(li);
			li.innerHTML += count + ' - ' + result['itemDestination'] + ' - ' + result['itemName'] + ' - ' + result['itemValue'] + ' - ' + result['blockTimestamp'];
			count++;
//			console.log(result);
		});
	};
});

// Get items owned by MetaMask wallet connected to the page
getItems(account);

// Function to get the account address that is connected to MetaMask
async function getAccount() {
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const account = accounts[0];
	setAccount(account);
	document.getElementById('showAccount').innerHTML = account;
//	location.reload();
}

// Function to get the list of items owned by MetaMask walled connected to the page
function getItems(owner) {
	var numItems = myContract.methods.numItems().call(function(err, res){
		numItems = res;
		var text = "";
		var i;
		var count = 0;
		user = getCookie('account');
		for (i = 0; i < numItems; i++) {
			var Items = myContract.methods.Items(i).call((error, result) => {
				if (result['itemDestination'].toUpperCase() == user.toUpperCase()) {
					ul = document.createElement('ul');
					document.getElementById('itemsOwned').appendChild(ul);
					let li = document.createElement('li');
					ul.appendChild(li);
					li.innerHTML += count + ' - ' + result['itemDestination'] + ' - ' + result['itemName'] + ' - ' + result['itemValue'] + ' - ' + result['blockTimestamp'];
					count++;
				}
			});
		};
	});
}

// Function to get an specific item type, ie. color of an object
function getItem(itemType) {
	var itemReturn = "";
	var numItems = myContract.methods.numItems().call(function(err, res){
		numItems = res;
		var i;
		var count = 0;
		user = getCookie('account');
		for (i = 0; i < numItems; i++) {
			var Items = myContract.methods.Items(i).call((error, result) => {
				console.log(result['itemDestination'], user);
				console.log(result['itemName'], itemType);
				if (result['itemDestination'].toUpperCase() == user.toUpperCase() && result['itemName'] == itemType) {
					console.log("count: ", count);
					if(count == 0) {
						itemReturn = result['itemValue'];
						console.log("itemReturn:", itemReturn);
						count++;
						setCookie(itemType, itemReturn);
					}
				}
				if(count == 0) {
					console.log("No items registered for this user!");
					if(getCookie(itemType) != "white") {
						setCookie(itemType, "white");
					}
				}
			});
		};
	});
}

// Function to set account variable and store it in a cookie
function setAccount(sender){
	account = sender;
	setCookie('account', account);
}

// Function to call Solidity method to create a new item
function itemCreate() {
	owner = document.getElementById("owner").value;
	itemType = document.getElementById("itemtype").value;
	itemValue = document.getElementById("itemvalue").value;

	account = getCookie("account");
	myContract.methods.ItemRegistration(owner, itemType, itemValue).send({from: account, gas: 1500000, gasPrice: '30000000000000'}).then((f) => {
        console.log(account, owner, itemType, itemValue);
	})
	location.reload();
}

// Function to call Solidity method to transfer ownership of an item
function itemTransfer() {
	web3.eth.handleRevert = true;
	receiver = document.getElementById("receiver").value;
	item = document.getElementById("itemID").value;
	account = getCookie("account");
	myContract.methods.Transfer(receiver, item).send({from: account, gas: 1500000, gasPrice: '30000000000000'})
	.on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
		document.getElementById("error_message").innerHTML = "<font color=red>You must be the owner of the asset to be able to transfer the ownership</font>";
	})
	.then(function(error, receipt) {
		location.reload();
	});
}

// Function to create cookies
function setCookie(cname, cvalue, exdays = 365) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

// Function to retrieve cookies
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}