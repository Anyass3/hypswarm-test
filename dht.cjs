const DHT = require("@hyperswarm/dht");
const crypto = require("hypercore-crypto");
var net = require("net");
const server =  DHT({});
var b32 = require("hi-base32");
const key = crypto.data(Buffer.from(process.argv[process.argv.length-1]));
const keyPair = crypto.keyPair(key);
console.log(b32.encode(keyPair.publicKey).replace('====','').toLowerCase()+'.southcoast.ga');
//const server = node.createServer();
server.on("connection", function(socket) {
console.log('conn')
  let open = { local:true, remote:true };
  var local = net.connect(8080, "localhost");
  local.on('data', (d)=>{socket.write(d)});
  socket.on('data', (d)=>{local.write(d)});

  const remoteend = () => {
    if(open.remote) socket.end();
    open.remote = false;
  }
  const localend = () => {
    if(open.local) local.end();
    open.local = false;
  }
  local.on('error', remoteend)
  local.on('finish', remoteend)
  local.on('end', remoteend)
  socket.on('finish', localend)
  socket.on('error', localend)
  socket.on('end', localend)
});
server.listen(keyPair);
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err)
})
