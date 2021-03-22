# In-Game Marketplace
> In-game Marketplace is a Ethereum Proof-of-Concept

## Installation

The project uses a local Ethereum network.

For testing purposes, we are using Ganache GUI or CLI.

A Python3 simple web server is used to serve the web pages.

Metamask is required to connect Ethereum wallets to the webpage: https://metamask.io/

Steps to run the Proof-of-Concept:

1. Install and run Ganache (GUI or CLI)

```$ ganache-cli```

2. Install Metamask

3. Run a Python web server in the /frontend directory

```$ python3 -m http.server --cgi 80```

4. Compile and deploy the ```inGameMkt.sol``` smart-contract to local Ethereum network

5. Create in-game items and transfer ownerships in the admin web page:

```http://localhost```

6. To test the items ownerships in the test game [1]:

```http://localhost/game```


## Reference

Adapted Game: ```https://codepen.io/gdube/pen/JybxxZ```