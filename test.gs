// First test file for proof of concept. 

function testFills() {
  var method = "GET";
  var path = "/api/v3/brokerage/orders/historical/fills";
  var body = "";
  var orders = cb_v3_req(method, path, body)
  Logger.log(orders.fills.length)
}
