const toMoneyConversion = (currency, digits, dot, transform) => {
    let n, c, d, t, s, i, j;
    n = currency;
    c = isNaN(digits = Math.abs(digits)) ? 2 : digits;
    d = dot === undefined ? "," : dot;
    t = transform === undefined ? "." : transform;
    s = n < 0 ? "-" : "";
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

export default toMoneyConversion;