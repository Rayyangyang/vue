export var getStar = function(score){
    var arr = []
    var on = 'ON';
    var off = 'OFF';
    var half = "HALF";
    var onScore = Math.floor(Math.floor(score * 2) / 2);
    for (var i = 0; i < onScore; i++) {
        arr.push(on);
    }
    if (score - onScore > 0.5) {
        arr.push(half)
    } else {
        arr.push(off)
    }
    var len = 5 - arr.length
    for (var i = 0; i < len; i++) {
        arr.push(off)
    }
    return arr;
}