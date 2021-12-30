const amqp = require('amqplib')
async function connect()
{
    try {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    // create a queue that goes through tcp connection
    const result = await channel.assertQueue("jobs")
    console.log('waiting for messages');
    //jobs is the queue
    channel.consume("jobs",message =>{
    const input = JSON.parse(message.content.toString());
    console.log(`recieved job with input${input.number}`);
        
    })           
    }catch(ex){
        console.error(ex)
    }
}
connect()
