const fs =  require('fs');


const requestHandeler = (req,res) => {
    const url=req.url;
    const method=req.method;

    if( url === '/'){
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
        
    }


    if( url === '/message' && method === 'POST'){
        const body=[];
        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message=parsedBody.split('=')[0];
            fs.writeFile('message.txt',message ,(err) => {
                //res.writeHead(302,{});
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });

            
        });

        
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from Node JS server</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = {
    handler : requestHandeler,
    someText : 'Some hardcoded text'
};

// module.exports = requestHandeler;

//exports.handeler = requestHandeler;
//exports.someText = 'Some Hardcoded Text';