const app = require("express")();
// const SolrNode = require("solr-node");
const { imdbCore } = require("./axios");
const {
  queryBuilderAll,
  parseInfo,
  queryBuilderField,
  optionalParamsBuilder,
} = require("./utilise");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//---------log------------
// require('log4js').getLogger("solr-node").level = "DEBUG";
//------------------------------
app.get("/find/all", async (req, res) => {
  try {
    const q = queryBuilderAll(req.query) + optionalParamsBuilder(req.query);
    console.log(q);
    const result = await imdbCore.get(`/select?${q}`);
    var a = await parseInfo(result.data);
    await res.json({
      message: "find all records",
      data: a,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
app.get("/find/field", async (req, res) => {
  try {
    const q = queryBuilderField(req.query) + optionalParamsBuilder(req.query);
    console.log(q);
    const result = await imdbCore.get(`/select?${q}`);
    var a = await parseInfo(result.data);
    res.json({ message: "Find with field", data: a });
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(3000, () => {
  console.log("App is running on port 3000");
});
