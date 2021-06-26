const WALLET_SERVICE_URL = "https://5d073b61fa00250014577c37.mockapi.io/wallet";
const MINER_POOL_URL = "https://eth.2miners.com/api/accounts/"
const PRICE_SERVICE_URL = "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum"
var vapp = new Vue({
    el: '#app',
    data: {
        wallets: [],
        price: 0,
        miners: [],
        twallet: [],
        c: 0
    },
    methods: {
        getEthPrice: function () {
            this.$http.get(PRICE_SERVICE_URL).then(response => {
                let r = response.body;
                this.price = r["ethereum"].usd
                //console.log(this.price);
            }, response => {
                console.log(response)
            });
        },
        getAllWallet: function () {
            this.$http.get(WALLET_SERVICE_URL).then(response => {
                let wallets = response.body;
                this.c = 0;
                this.twallet = [];
                var self = this;
                wallets.forEach(w => {
                    this.$http.get(MINER_POOL_URL + w.address).then(response => {
                        this.twallet.push({ id: w.id, name: w.name, address: w.address, details: response.body })
                        if (this.c == wallets.length - 1) {
                            this.wallets = this.twallet.sort(this.compare);
                            /* setTimeout(() => {
                                let wallets = self.wallets;
                                wallets.forEach(wallet => {
                                    $('#qrcode' + wallet.id.toString()).qrcode({ width: 120, height: 120, text: wallet.address })
                                });
                            }, 100); */
                        }
                        this.c++;
                    }, response => {
                        console.log(response)
                    });
                });
            }, response => {
                console.log(response)
            });
        },
        formatNumber: function (number, precision) {
            return (number).toFixed(precision).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        },
        formatDateTime: function (timestamp) {
            let dt = new Date(timestamp * 1000)
            return moment(dt).fromNow();
        },
        formatHashrate: function (hash) {
            let hr = hash / 1000000;
            if (hr >= 1000) {
                return this.formatNumber(hash / 1000000000, 2) + ' GH/s';
            }
            else {
                return this.formatNumber(hr, 1) + ' MH/s';
            }
        },
        compare: function (a, b) {
            if (a.details.workersTotal > b.details.workersTotal) {
                return -1;
            }
            else if (a.details.workersTotal < b.details.workersTotal) {
                return 1;
            }
            else {
                if (a.details.currentHashrate > b.details.currentHashrate) {
                    return -1;
                }
                else if (a.details.currentHashrate < b.details.currentHashrate) {
                    return 1;
                }
            }
            return 0;
        },
        /*sum: function () {
            return this.coin_list.map(n => n.amount * n.price).reduce((a, b) => a + b, 0)
        } */
    },
    mounted: function () {
        this.getEthPrice();
        this.getAllWallet();
        /* let ids = this.coin_list.map(n => n.name).join(',');
        this.getCoinPrice(ids);
        setInterval(() => {
            this.getCoinPrice(ids);
        }, 120000);

        let url = "https://eth.2miners.com/api/accounts/0xdd5b869766620e3f0d744025e9ea04e2dd14eeb5";
        let headers = {
            'Content-Type': 'application/json',
            "x-auth-token": "05e3ea03-5088-4e37-ba5b-c8de78fe6bee",
            "User-Agent":"test"
        }
        let data = { owner_uid : "2e63d448-3ce6-4efd-914a-2f7fb1dfc5eb", pagination :  { count : 50, offset : 0 } }
        this.$http.get(url).then(response => {
            console.log(response);                        
        }, response => {
            console.log(response)
        }); */
    }
});
$(document).ready(function () {
    setInterval(function () {
        if ($('#autoUpdate').is(":checked")) {
            vapp.getAllWallet();
        }
    }, 90000);
});