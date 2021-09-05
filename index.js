const Hyperswarm = require('hyperswarm')
const swarm = new Hyperswarm()

swarm.on('connection', (conn, info) => {
process.stdin.pipe(conn).pipe(process.stdout);
});
{
(async ()=>{
const topic = Buffer.alloc(32).fill('hello world from anj') // A topic must be 32 bytes
const discovery = swarm.join(topic, { server: true, client: true })
await discovery.flushed() // Waits for the topic to be fully announced on the DHT

//swarm.join(topic, { server: false, client: true })
await swarm.flush() // Waits for the swarm to connect to pending peers.
})()
}
