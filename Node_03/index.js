import "dotenv/config"

import express from "express";
import routes from './Routes/index.js';
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/' ,(req, res) => {
    return res.send('Welcome to PRISMA ORM')
});

app.use(routes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
