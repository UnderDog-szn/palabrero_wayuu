const QRCode = require('qrcode');

QRCode.toFile('qr_palabrero.png', 'https://palabrerowayuu-production.up.railway.app', {
    width: 300,
    margin: 2
}, function(err) {
    if (err) throw err;
    console.log('QR generado: qr_palabrero.png');
});