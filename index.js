const app = require('./app');
const port = 4000

app.listen(port, () => {
    console.log('Abrindo o server na porta ' + port);
})