function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
}
function logout(url, callback) {
    localStorage.clear();
    location.href = 'index.html';
}
