const amqp = require('amqplib')
const msg = {number:process.argv[1]}

console.log("$$$$$$$$,",process.config)
async function connect()
{
    try {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    // create a queue that goes through tcp connection
    const result = await channel.assertQueue("jobs")
    channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)))
    console.log(`job sent successfully ${msg.number}`)            
    }catch(ex){
        console.error(ex)
    }
}
connect()
