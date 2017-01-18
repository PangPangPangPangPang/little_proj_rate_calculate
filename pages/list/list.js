Page({
    data: {
        list: [
            {
                country: 'CNY',
                charge: 0.00,
                name: '人民币'
            },
            {
                country: 'USD',
                charge: 0.00,
                name: '美元'
            },
            {
                country: 'HKD',
                charge: 0.00,
                name: '港币'

            },
            {
                country: 'EUR',
                charge: 0.00,
                name: '欧元'
            },
            {
                country: 'JPY',
                charge: 0.00,
                name: '日元'
            },
            {
                country: 'GBP',
                charge: 0.00,
                name: '英镑'
            },
            {
                country: 'KRW',
                charge: 0.00,
                name: '韩元'
            },
            {
                country: 'AUD',
                charge: 0.00,
                name: '澳元'
            },
            {
                country: 'CAD',
                charge: 0.00,
                name: '加元'
            }
        ]
    },
    onLoad: function() {

    },
    tap_choose: function(event) {
        console.log(event.target.dataset.content)
        wx.setStorageSync('change', event.target.dataset.content)
        wx.navigateBack()
    }


})
