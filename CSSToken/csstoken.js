class CSSToken {
    constructor(provider,abi,address,web3) {
        this.access = provider.eth.contract(abi);
        this.contract = this.access.at(address);
        this.w3 = web3;
    }

    createShip(name,color,callback) {
        let contract = this.contract;
        let w3 = this.w3;
        contract.getCreationShipPrice(function(error,price) {
            if (!error) {
                contract.createShip(name,color,{from:w3.eth.accounts[0],gasPrice:1000000000,value:price},callback);
            }
        });
    }

    unsetGame(ship,callback) {
        this.contract.unsetGame(ship,{from:w3.eth.accounts[0],gasPrice:1000000000},callback);
    }

    getShipsByOwner(address,callback) {
        this.contract.getShipsByOwner(address,callback);
    }

    getShipsByOwnerResult(result) {
        let ret = [];
        for (let i = 0; i <= result.length -1; i++) {
            ret[i] = result[i].toNumber();
        }
        return ret;
    }
}