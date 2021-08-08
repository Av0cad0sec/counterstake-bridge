"use strict";
const { ethers } = require("ethers");
const conf = require('ocore/conf.js');
const EvmChain = require('./evm-chain.js');
const { getProvider } = require("./evm/provider.js");

let bCreated = false;

class Polygon extends EvmChain {

	#bFree;

	constructor(bFree) {
		if (bCreated)
			throw Error("Polygon class already created, must be a singleton");
		bCreated = true;
		
	//	const provider = getProvider('Polygon', bFree);
		const provider = new ethers.providers.WebSocketProvider(process.env.testnet ? `wss://polygon-mumbai.g.alchemy.com/v2/${conf.alchemy_keys.polygon.testnet}` : `wss://polygon-mainnet.g.alchemy.com/v2/${conf.alchemy_keys.polygon.mainnet}`);
		super('Polygon', conf.polygon_factory_contract_address, conf.polygon_assistant_factory_contract_address, provider, true);
		this.#bFree = bFree;
	}

	forget() {
		console.log(`removing ${this.getProvider().listenerCount()} listeners on ${this.network}`);
		this.getProvider().removeAllListeners();
		bCreated = false;
	}

	getNativeSymbol() {
		return 'MATIC';
	}

//	getMaxBlockRange() {
//		return this.#bFree ? 1000 : 0;
//	}


}

module.exports = Polygon;