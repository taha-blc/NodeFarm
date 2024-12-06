const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = require(`./modules/replaceTemplates`)
// replaceTemplate fonksiyonu


// Dosyaları oku
let data, tempOverview, tempCard, tempProduct;

try {
    data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
    tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
    tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
    tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
} catch (err) {
    console.error('Dosya okuma hatası:', err);
    process.exit(1);
}

const dataObj = JSON.parse(data);

// HTTP sunucusunu oluştur
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // ! OVERVIEW PAGE
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);
    }

    // ! PRODUCT PAGE
    else if (pathname === '/product') {


        res.writeHead(200, { 'Content-type': 'text/html' })
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output);
    }

    // ! API
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    }

    // ! NOT FOUND
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'taha bilici',
        });
        res.end('<h1>Sayfa bulunamadı</h1>');
    }
});

// Sunucuyu başlat
server.listen(5500, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
