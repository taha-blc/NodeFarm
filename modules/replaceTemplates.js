module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRİCE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRİENS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRİPTİON%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    output = output.replace(/{%NOT_ORGANIC%}/g, product.organic ? '' : 'not-organic');

    return output;
};