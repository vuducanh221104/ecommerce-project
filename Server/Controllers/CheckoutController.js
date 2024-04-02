const PaymentSchema = require('../Models/Payment');
const { findOne } = require('../Models/Products');

class CheckoutController {
    // [POST]/payment/create-payment-vnpay ~CREATE PAYMENT BANk (VNPAY)
    vnPay(req, res, next) {
        req.body = req.body.dataToSend;
        var ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var dateFormat = require('dateformat');

        var tmnCode = 'CHIXW77M';
        var secretKey = 'SEUIQSROQXWWPXYOGDFWVKGEVZBYZCTQ';
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        var returnUrl = process.env.BASE_URL_CLIENT + '/cart/complete';

        var date = new Date();
        var createDate = dateFormat(date, 'yyyymmddHHmmss'); //Create Date
        var orderId = dateFormat(date, 'HHmmss'); //Create OrderId using date
        var amount = req.body.amount; // price (ex:200000 =20k)
        var bankCode = 'NCB'; //Name Bank Customer choose
        //  var bankCode = req.body.bankCode;

        var orderInfo = req.body.orderDescription; //Info Description of customner when order
        var orderType = req.body.orderType; // Commodity codes (Mã hàng Hóa) have been by VNPAY
        var locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        // vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        function sortObject(obj) {
            var sorted = {};
            var str = [];
            var key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
            }
            return sorted;
        }
        vnp_Params = sortObject(vnp_Params);

        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require('crypto');
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.status(200).json(vnpUrl);
        // res.redirect(vnpUrl)
    }
    // [POST]/payment/create-payment-momo ~CREATE PAYMENT BANk (MOMO)
    moMo(req, res, next) {
        req.body = req.body.dataToSendMomo;
        var partnerCode = 'MOMO';
        var accessKey = 'F8BBA842ECF85';
        var secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = `${req.body.orderDescription}`;
        var redirectUrl = process.env.BASE_URL_CLIENT + '/cart/complete';
        var ipnUrl = 'https://callback.url/notify';
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        var amount = `${req.body.amount}`;

        var requestType = 'captureWallet';
        var extraData = ''; //pass empty value if your merchant does not have stores

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType;
        //puts raw signature

        //signature
        const crypto = require('crypto');
        var signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex');

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'en',
        });
        //Create the HTTPS objects
        const https = require('https');
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
        };
        //Send the request and get the response
        const reqMomo = https.request(options, (momoRes) => {
            momoRes.setEncoding('utf8');
            momoRes.on('data', (body) => {
                const payUrl = JSON.parse(body).payUrl;
                // Trả về payUrl cho client bằng
                res.status(200).json(payUrl);
            });
            momoRes.on('end', () => {});
        });

        req.on('error', (e) => {});
        // write data to request body
        reqMomo.write(requestBody);
        reqMomo.end();
    }

    // [POST]/payment/save ~SAVE INFO PAYMENT
    async savePayment(req, res, next) {
        try {
            const data = req.body.dataToSave;
            const findData = await PaymentSchema.findOne({ orderId: data.orderId });
            console.log(data)
            if (!findData) {
                const dataToSave = new PaymentSchema(data);
                const savedData = await dataToSave.save();
                res.status(200).json(savedData);
            }
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // [POST]
    async zaloPay(req, res, next) {
        // Node v10.15.3
        const axios = require('axios').default; // npm install axios
        const CryptoJS = require('crypto-js'); // npm install crypto-js
        const moment = require('moment'); // npm install moment

        req.body = req.body.dataToSendZalopay;

        // APP INFO
        const config = {
            app_id: '2553',
            key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
            key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
            endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
        };

        const embed_data = {};

        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: 'customer',
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: req.body.amount,
            description: `${req.body.orderDescription} #${transID}`,
            bank_code: 'zalopayapp',
        };

        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data =
            config.app_id +
            '|' +
            order.app_trans_id +
            '|' +
            order.app_user +
            '|' +
            order.amount +
            '|' +
            order.app_time +
            '|' +
            order.embed_data +
            '|' +
            order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        axios
            .post(config.endpoint, null, { params: order })
            .then((response) => {
                res.status(200).json(response.data);
            })
            .catch((err) => console.log(err));
    }
}

module.exports = new CheckoutController();
