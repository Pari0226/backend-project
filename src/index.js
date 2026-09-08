import http from 'http'

const server = http.createServer((req,res)=>{
    res.write('Hello, this is a response from your Node.js server!');
    res.end()
})
server.listen(3000,()=>{
    console.log("server is running sasas bhsabhsha")
})