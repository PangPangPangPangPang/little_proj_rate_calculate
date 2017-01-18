var app = getApp()
var n = require('../../utils/network.js')
new Page({
    data: {
        list: wx.getStorageSync('default_list'),
        calculate: [
            '7',
            '8',
            '9',
            '+',
            '4',
            '5',
            '6',
            '-',
            '1',
            '2',
            '3',
            '*',
            '.',
            '0',
            'c',
            '/'
        ],
        userInfo: {},
        number: 0.00,
        action: null,
        second_number: 0.00,
        rates: null
    },
    //事件处理函数
    tap_cell: function(event) {
    },
    longtap_cell: function(event) {
        wx.showModal({
            title: '需要切换国家吗',
            success: function(res) {
                if (res.confirm) {
                    wx.setStorageSync('will_change', event.target.dataset.content)
                    wx.navigateTo({
                        url: "../list/list"
                    })
                }

            },
            fail: function(res) {
            }

        })
    },
    changeRate: function() {
        var rate = wx.getStorageSync('rate')
        if (!rate) {
            wx.showToast({
                duration: 10000,
                title: '更新汇率'
            })
        }
        this.updateRate()
    },
    changeCountry: function() {
        var will_change = wx.getStorageSync('will_change')
        var change = wx.getStorageSync('change')
        var r = null
        if (will_change && change) {
            wx.setStorageSync('will_change', null)
            wx.setStorageSync('change', null)
            for (var i in this.data.list) {
                if (this.data.list[i].country == will_change.country) {
                    this.data.list[i] = change
                    wx.setStorageSync('default_list', this.data.list)
                    this.setData({
                        list: this.data.list
                    })
                }
            }
        }
    },
    onLoad: function() {
        //update rate  when load page
        this.updateRate()
    },
    onShow: function() {
        this.changeCountry()
    },
    get_rate: function(name) {
        if (this.data.rates === null) {
            this.data.rates = wx.getStorageSync('rate')
        }
        var list = this.data.rates.results.rate;
        for (var i in list) {
            var str = list[i].id.substring(3, 6)
            if (str == name) {
                return list[i].Rate
            }
        }
        return 1
    },
    tap_input: function(event) {
        var v = event.target.dataset.value
        if (v == 'c') {
            this.data.number = 0.00
            this.data.second_number = 0.00
            this.data.action = null
        }else if (v == '+' || v == '-' || v == '*' || v == '/'){
            this.data.second_number = 0.00
            this.data.number = this.data.list[0].charge
            this.data.action = v 
            return
        }else {
            if (this.data.action) {
                this.data.second_number = parseFloat(this.data.second_number.toString() + v)
            } else {
                this.data.number = parseFloat(this.data.number.toString() + v)
            }
        }
        for (var x in this.data.list) {
            var result = this.get_rate(this.data.list[x].country)
            var a = parseFloat(this.data.number)
            var b = parseFloat(this.data.second_number)
            if (this.data.action) {
                switch(this.data.action) {
                    case '+':
                        this.data.list[x].charge = ((a + b)*result).toFixed(2)
                        break
                    case '-':
                        this.data.list[x].charge = ((a - b)*result).toFixed(2)
                        break
                    case '*':
                        this.data.list[x].charge = ((a * b)*result).toFixed(2)
                        break
                    case '/':
                        this.data.list[x].charge = ((a / b)*result).toFixed(2)
                        break
                }
            }else {
                this.data.list[x].charge = (this.data.number * result).toFixed(2)
            }
        }
        this.setData({
            list: this.data.list
        })
    },
    updateRate: function() {
        var block = function(res) {
            wx.setStorageSync('rate', res.data.query)
            wx.hideToast()
        }
        n.network.updateRate(block)
    }

})
