const cb_key = "api-key";
const cb_secret = "api-secret";

function cb_v3_req(method, path, body) {
  var cb_time = Math.floor(Date.now() / 1000).toString();  
  var cb_msg = cb_time + method + path + body;
  var cb_sig = Utilities.computeHmacSha256Signature(cb_msg, cb_secret);
  cb_sig = cb_sig.reduce(function(str,chr){
  chr = (chr < 0 ? chr + 256 : chr).toString(16);
    return str + (chr.length==1?'0':'') + chr;
    },'');
  var headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "CB-ACCESS-KEY": cb_key,
    "CB-ACCESS-SIGN": cb_sig,
    "CB-ACCESS-TIMESTAMP": cb_time
  }
  var options = {
    muteHttpExceptions: true,
    headers
  }
  var url = 'https://api.coinbase.com';
  var res = UrlFetchApp.fetch(url + path, options)
  var content = res.getContentText();
  var json = JSON.parse(content);
  return json
}
