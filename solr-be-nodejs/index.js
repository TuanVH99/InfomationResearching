const app = require('express')();
const SolrNode = require('solr-node');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//----------solr config---------------
var client = new SolrNode({
    host: 'localhost',
    port: '8983',
    core: 'db2',
    protocol: 'http'
})
//---------log------------
// require('log4js').getLogger("solr-node").level = "DEBUG";
//------------------------------
app.get("/find", async (req, res) => {
    res.send("something")
})
app.listen(3000, () => {
    console.log("App is running on port 3000");
})

