var whitelist = ["http://127.0.0.1:5174","http://127.0.0.1:5173",'http://192.168.100.4']
var corsOptions = {
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Headers',
        'Origin',
        'sessionId',
    ],
    credentials: true,
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default corsOptions;