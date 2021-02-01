const response = {}
response.initSuccessRes = function (res) {
    return {
        success: true,
        data: res.result,
        status: 200,
        message: res.message
    }
}
response.initErrorRes = function (res) {
    return {
        success: false,
        data: res.result,
        status: 400,
        message: res.message
    }
}

module.exports = response