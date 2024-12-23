import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.argv[2] || 8080
const env = process.argv[3] || 'dev'

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT} - ${env}`);
});