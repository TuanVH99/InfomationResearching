const axios = require("axios");
const core = "imdbdata";
const imdbCore = axios.create({
  baseURL: "http://localhost:8983/solr/imdbdata",
});
module.exports = { imdbCore };
