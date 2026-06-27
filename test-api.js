const http = require('http');

http.get('http://localhost:3000/api/students?status=Disabled', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            console.log(JSON.parse(data));
        } catch(e) {
            console.log(data);
        }
    });
});
