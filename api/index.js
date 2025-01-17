import express from 'express'

const app = express();
app.listen(3000, () => {
    console.log('====================================');
    console.log("Server is running on port 3000 !!!!");
    console.log('====================================');
});

