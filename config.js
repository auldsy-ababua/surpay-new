var connectionString = "mongodb://mongoAdminBIT:BiT~2016^MdB@localhost:27017/surpay_app?authSource=admin"
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL || connectionString;
//exports.DATABASE_URL = 'mongodb://surpayApp:tonto989@ds141088.mlab.com:41088/surpay_app';
 exports.PORT = process.env.PORT || 8181;
