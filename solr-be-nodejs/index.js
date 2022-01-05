const app = require('express')();
const SolrNode = require('solr-node');

app.get("/", (req, res) => {
    res.send("Welcome");
})

//----------solr config---------------
var client = new SolrNode({
    host: 'localhost',
    port: '8983',
    core: 'imdbdata',
    protocol: 'http'
})
//---------log------------
require('log4js').getLogger("solr-node").level = "DEBUG";
//---------crawler------------
//----------api seach-----------
app.get("/getall", async (req, res) => {
    try {
        var objQuery = client.query().q().start(0).rows(10);
        const result = await client.search(objQuery);
        res.send(result);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
//------------------------------
app.listen(3000, () => {
    console.log("App is running on port 3000");
})