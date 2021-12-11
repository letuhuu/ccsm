const WALLET_SERVICE_URL = "https://5d073b61fa00250014577c37.mockapi.io/wallet";
//const WALLET_SERVICE_URL = "https://testapi.io/api/letuhuu/wallet";
const MINER_POOL_URL = "https://eth.2miners.com/api/accounts/";
const PRICE_SERVICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum";
const REWARD_SERVICE_URL = "https://5d073b61fa00250014577c37.mockapi.io/reward";
/*const WALLETS = [
  {
    id: 1,
    name: "daulay",
    address: "0xdd5b869766620e3f0d744025e9ea04e2dd14eeb5",
  },
  {
    id: 2,
    name: "tula",
    address: "0xa9c49f21a88e68c5e66c7209ee3ddd079b321dfa",
  },
  { id: 3, name: "lcl", address: "0xf0e1ed8c1f1883b4476169cadcd6fb5b91ccb601" },
  {
    id: 4,
    name: "luandalat",
    address: "0xd4b975c189b115f191787d672f8a1610ff2ab49d",
  },
  {
    id: 5,
    name: "tinETH",
    address: "0xf6dcf27342e87422e965169effac2580d9c1788f",
  },
  {
    id: 6,
    name: "luanchuong",
    address: "0x866d5887f3585d24def05c19d6484ae6af49892e",
  },
];*/
const WALLETS = [
  {
   "createdAt": "2021-06-25T03:02:54.232Z",
   "address": "13NknbGKvD79sNR1YjbvwvceNEEX82E9tP",
   "name": "daulay",
   "id": "1"
  },
  {
   "createdAt": "2021-06-24T19:43:37.322Z",
   "address": "16eoDJis8ELeL7R1vLPb2mzHZUJD6Q7tHT",
   "name": "lcl",
   "id": "2"
  },
  {
   "createdAt": "2021-06-25T03:02:54.232Z",
   "address": "0x866d5887f3585d24def05c19d6484ae6af49892e",
   "name": "luanchuong",
   "id": "3"
  },
  {
   "createdAt": "2021-06-24T19:43:37.322Z",
   "address": "14J3iotu2KfZAge3eSCdQrkL1G3uFgRA45",
   "name": "tinEth",
   "id": "4"
  },
  {
   "createdAt": "2021-06-24T19:43:37.322Z",
   "address": "nano_3hdaqgjf1c6f58pqago1apz9qywnjtrxpnpk5rxzqpxetqt6c8xame1mbe8q",
   "name": "tula",
   "id": "5"
  },
  {
   "createdAt": "2021-06-24T19:43:37.322Z",
   "address": "1321aJoCfS2BsFPmA1VAGrJ1rZ9GDbX6An",
   "name": "daulay2",
   "id": "6"
  },
  {
   "createdAt": "2021-06-24T19:43:37.322Z",
   "address": "186QMAbopPfZBzFqqdbSHVieoojnvhws9k",
   "name": "thien1",
   "id": "7"
  },
  {
   "createdAt": "2021-06-24T19:43:37.322Z",
   "address": "1P2KYdCiqacTX9e2wE9zQxsZrPP1NxiSPY",
   "name": "anhluan",
   "id": "8"
  }
 ];
var vapp = new Vue({
  el: "#app",
  data: {
    wallets: [],
    price: 0,
    miners: [],
    twallet: [],
    c: 0,
  },
  methods: {
    getEthPrice: function () {
      this.$http.get(PRICE_SERVICE_URL).then(
        (response) => {
          let r = response.body;
          this.price = r["ethereum"].usd;
          //console.log(this.price);
        },
        (response) => {
          console.log(response);
        }
      );
    },
    getAllWallet: function () {
      this.$http.get(WALLET_SERVICE_URL).then(
        (response) => {
          this.loadMiners(response.body);
          /* let wallets = response.body;
          this.c = 0;
          this.twallet = [];
          var self = this;
          wallets.forEach((w) => {
            this.$http.get(MINER_POOL_URL + w.address).then(
              (response) => {
                let result = response.body;
                result.sumrewards.splice(3, 0, {
                  inverval: 0,
                  reward: this.getTodayReward(result.rewards),
                  numreward: 0,
                  name: "Today",
                  offset: 0,
                });
                result.sumrewards.splice(4, 0, {
                  inverval: 0,
                  reward: this.getYesterReward(result.rewards),
                  numreward: 0,
                  name: "Yesterday",
                  offset: 0,
                });
                this.twallet.push({
                  id: w.id,
                  name: w.name,
                  address: w.address,
                  details: result,
                });
                if (this.c == wallets.length - 1) {
                  this.wallets = this.twallet.sort(this.compare);
                  // setTimeout(() => {
                            //     let wallets = self.wallets;
                            //     wallets.forEach(wallet => {
                            //         $('#qrcode' + wallet.id.toString()).qrcode({ width: 120, height: 120, text: wallet.address })
                            //     });
                            // }, 100);
                }
                this.c++;
              },
              (response) => {
                console.log(response);
              }
            );
          }); */
        },
        (response) => {
          this.loadMiners(WALLETS);
          //console.log(response);
        }
      );
    },
    formatNumber: function (number, precision) {
      return number.toFixed(precision).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },
    formatNumber1: function (number, precision) {
      let res = number.toFixed(precision).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      while (res.endsWith("0")) {
        res = res.substring(0, res.length - 1);
      }
      return res;
    },
    formatDateTime: function (timestamp) {
      let dt = new Date(timestamp * 1000);
      return moment(dt).fromNow();
    },
    formatHashrate: function (hash) {
      let hr = hash / 1000000;
      if (hr >= 1000) {
        return this.formatNumber(hash / 1000000000, 2) + " GH/s";
      } else {
        return this.formatNumber(hr, 1) + " MH/s";
      }
    },
    formatWorkerHashrate: function (hash) {
      let hr = hash / 1000000;
      return this.formatNumber(hr, 0);
    },
    compare: function (a, b) {
      if (a.details.workersTotal > b.details.workersTotal) {
        return -1;
      } else if (a.details.workersTotal < b.details.workersTotal) {
        return 1;
      } else {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
      }
      return 0;
    },
    getTimestamp: function () {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      return [
        moment(today).add(-1, "days").unix(),
        moment(today).unix(),
        moment(today).add(1, "days").unix(),
      ];
    },
    getReward: function (rewards, from, to) {
      if(rewards == null) return 0;
      return rewards
        .filter((n) => n.timestamp >= from && n.timestamp < to)
        .map((n) => n.reward)
        .reduce((a, b) => a + b, 0);
    },
    getTodayReward: function (rewards) {
      let t = this.getTimestamp();
      return this.getReward(rewards, t[1], t[2]);
    },
    getYesterReward: function (rewards) {
      let t = this.getTimestamp();
      return this.getReward(rewards, t[0], t[1]);
    },
    loadMiners: function (wallets) {
      this.c = 0;
      this.twallet = [];
      //var self = this;
      wallets.forEach((w) => {
        this.$http.get(MINER_POOL_URL + w.address).then(
          (response) => {
            let result = response.body;
            result.sumrewards.splice(3, 0, {
              inverval: 0,
              reward: this.getTodayReward(result.rewards),
              numreward: 0,
              name: "Today",
              offset: 0,
            });
            result.sumrewards.splice(4, 0, {
              inverval: 0,
              reward: this.getYesterReward(result.rewards),
              numreward: 0,
              name: "Yesterday",
              offset: 0,
            });
            this.twallet.push({
              id: w.id,
              name: w.name,
              address: w.address,
              details: result,
            });
            if (this.c == wallets.length - 1) {
              this.wallets = this.twallet.sort(this.compare);
              this.saveYesterdayReward();
              /* setTimeout(() => {
                                let wallets = self.wallets;
                                wallets.forEach(wallet => {
                                    $('#qrcode' + wallet.id.toString()).qrcode({ width: 120, height: 120, text: wallet.address })
                                });
                            }, 100); */
            }
            this.c++;
          },
          (response) => {
            console.log(response);
          }
        );
      });
    },
    saveYesterdayReward: function () {
      let today = new Date();
      today.setHours(8, 0, 0, 0);
      if (new Date() < today) return;
      let lastUpdate = localStorage.getItem("lastUpdate");
      let yesterday = moment(new Date()).add(-1, "days").format("DD/MM/YYYY");
      if (lastUpdate == null || lastUpdate != yesterday) {
        //Get from server
        this.$http.get(`${REWARD_SERVICE_URL}?date=${yesterday}`).then(
          (response) => {
            let rewards = response.body;
            //console.log(rewards);
            let postData = this.wallets
              .filter((w) => rewards.every((r) => r.wallet != w.address))
              .map((w) => ({
                reward: this.getYesterReward(w.details.rewards),
                wallet: w.address,
                date: yesterday,
              }));
            if (postData.length > 0) {
              //console.log(postData);
              this.postReward(postData);
            }
          },
          (response) => {
            console.log(response);
          }
        );
        //Update localstorage
        localStorage.setItem("lastUpdate", yesterday);
      }
    },
    postReward: async function (postData) {
      for (let i = 0; i < postData.length; i++) {
        let response = await this.$http.post(REWARD_SERVICE_URL, postData[i]);
        // console.log(response);
        // console.log(moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS"));
      }
    },
    test: async function () {
      for (let i = 0; i < 10; i++) {
        let response = await this.test1({
          name: i,
          avatar: `avatar${i}`,
        });
        console.log(response);
        console.log(moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS"));
      }
    },
    test1: async function (data) {
      let response = await this.$http.post(
        "https://5d073b61fa00250014577c37.mockapi.io/test",
        data
      );
      return response;
    },
    /*sum: function () {
            return this.coin_list.map(n => n.amount * n.price).reduce((a, b) => a + b, 0)
        } */
  },
  mounted: function () {
    this.getEthPrice();
    this.getAllWallet();
    //this.test();

    /*  this.$http.get("https://testapi.io/api/letuhuu/wallet").then(response => {
            let result = response.body;
            console.log(result);
        }, response => {
            console.log(response)
        }); */

    /* let url = "https://eth.2miners.com/api/accounts/0xdd5b869766620e3f0d744025e9ea04e2dd14eeb5";
        let timestamps = this.getTimestamp();
        console.log(timestamps);
        this.$http.get(url).then(response => {
            let rewards = response.body.rewards;
            let todayReward = rewards.filter(n => n.timestamp >= timestamps[1] && n.timestamp < timestamps[2]).map(n => n.reward).reduce((a, b) => a + b, 0)
            let yesterdayReward = rewards.filter(n => n.timestamp >= timestamps[0] && n.timestamp < timestamps[1]).map(n => n.reward).reduce((a, b) => a + b, 0)
            console.log(todayReward)
            console.log(yesterdayReward)
        }, response => {
            console.log(response)
        }); */
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
    //let url = "https://oapi.raveos.com/v1/get_worker_info/369035";
    /*         let headers = {
            'Content-Type': 'application/json',
            "x-auth-token": "eab7fd16-644f-4136-89d4-379d4b52e0ec"
        }
        let url = "https://app.swaggerhub.com/proxy?url=https%3A%2F%2Foapi.raveos.com%2Fv1%2Fget_worker_info%2F369035&proxy-token=97000nx"
        //et data = { owner_uid : "2e63d448-3ce6-4efd-914a-2f7fb1dfc5eb", pagination :  { count : 50, offset : 0 } }
        this.$http.get(url, headers).then(response => {
            console.log(response);                        
        }, response => {
            console.log(response)
        }); */
  },
});
$(document).ready(function () {
  setInterval(function () {
    if ($("#autoUpdate").is(":checked")) {
      vapp.getAllWallet();
    }
  }, 90000);
});
