import cors  from 'cors';
import Express from 'express';
import http  from 'http';
import bodyparser from 'body-parser'

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
  ];


  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };


  const app = Express();
app.use(cors());
app.options('*', cors(corsOptions));
app.use(bodyparser.json());

app.get('/', cors(corsOptions), (req, res, next) => {
    res.json([{ message: 'Bem Vindo Senhor, Como posso servi-lo!!!' }])
  })


  
const Server = http.createServer(app);
Server.listen(8099);
console.log("Servidor escutando na porta 8099");