var network = {
    updateRate: function(success) {
        wx.request({
            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22CNYUSD%22%2C%22CNYEUR%22%2C%22CNYHKD%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
            success: function(res) {
                success(res)
            }
        })
    }
}

module.exports.network = network
