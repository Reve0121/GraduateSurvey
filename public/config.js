const dbConnection = {
    dev: {
        db_user: "",//添加的普通账户名
        db_pwd: "",
        db_base: "'mongodb://",
        db_host: "127.0.0.1",
        db_port: 27017,
        db_name: "graduate_survey",//数据库名称
        useNewUrlParser: true
    }
};

module.exports = dbConnection