const app = require('express')();
const SolrNode = require('solr-node');

app.get("/", (req, res) => {
    res.send("Welcome");
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
//---------crawler------------
//----------api seach-----------
//-----------fectch data with pagination-----------
app.get("/get", async (req, res) => {
    try {
        var start = req.query.start;
        if (!start) start = 0;
        var rows = req.query.rows;
        if (!rows) rows = 10;
        var objQuery = client.query().q().start(start).rows(rows);
        const result = await client.search(objQuery);
        res.send(result);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
//-----------select fields to fetch-----------
app.get("/get/fields", async (req, res) => {
    try {
        // default rows and start
        var start = req.query.start;
        if (!start) start = 0;
        var rows = req.query.rows;
        if (!rows) rows = 10;
        var q = req.query.q
        if (!q) q = "*"
        var rawStringQuery = `q=${q}&fl=${req.query.fl}&start=${start}&rows=${rows}&wt=json`
        const result = await client.search(rawStringQuery);
        res.send(result);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
//-----------filter document to fetch-----------
app.get("/get/filter", async (req, res) => {
    try {
        var q = req.query
        // default rows and start
        var start = q.start;
        if (!start) start = 0;
        var rows = q.rows;
        if (!rows) rows = 10;
        var fl
        if (q.fields) {
            fl = q.fields
        } else {
            fields = "*"
        }
        delete q.fields
        var raw = objToString(q);
        var rawQuery = `q=${raw}&fl=${fl}&wt=json`
        const result = await client.search(rawQuery);
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
app.get("/test", async (req, res) => {
    try {
        var q = req.query
        // default rows and start
        var start = q.start;
        if (!start) start = 0;
        var rows = q.rows;
        if (!rows) rows = 10;
        var fl
        if (q.fields) {
            fl = q.fields
        } else {
            fields = "*"
        }
        delete q.fields
        var raw = objToString(q);
        var rawQuery = `q=${raw}&fl=${fl}&wt=json`
        const result = await client.search(rawQuery);
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
//------------------------------
app.listen(3000, () => {
    console.log("App is running on port 3000");
})

/**
 * 
 * @param {Object} obj 
 * @returns String
 */
function objToString(obj) {
    var tmp = obj;
    var stringified = JSON.stringify(tmp);

    stringified = stringified.replace(/"/g, "")
    stringified = stringified.replace("{", "")
    stringified = stringified.replace("}", "")

    return stringified;
}