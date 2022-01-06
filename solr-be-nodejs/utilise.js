const IMDBCrawled = require("./schema.model");

const listCommand = {
  delete:
    "http://localhost:8983/solr/admin/cores?action=UNLOAD&core=imdbdata&deleteIndex=true&deleteDataDir=true&deleteInstanceDir=true",
  example:
    "http://localhost:8983/solr/bibdata/select?q=title_txt_en:washington&start=10&rows=15",
};

const queryBuilderAll = (inputReqQuery) => {
  const qObj = { ...inputReqQuery };
  if (qObj.op) delete qObj.op;
  var q = "q=";
  if (
    qObj &&
    Object.keys(qObj).length === 0 &&
    Object.getPrototypeOf(qObj) === Object.prototype
  ) {
    q += "*%3A*";
    return q;
  }
  if (qObj.term) {
    q = `q=title:${qObj.term}+countries:${qObj.term}+languages:${qObj.term}+actors:${qObj.term}+genre:${qObj.term}+tagline:${qObj.term}+description:${qObj.term}+directors:${qObj.term}+runtime:${qObj.term}`;
    return q;
  }
};

const queryBuilderField = (inputReqQuery) => {
  const qObj = { ...inputReqQuery };
  delete qObj.op;
  delete qObj.row;
  delete qObj.starts;
  delete qObj.ident;

  var q = "q=";
  for (const key in qObj) {
    if (Object.hasOwnProperty.call(qObj, key)) {
      const element = qObj[key];
      q += `${key}:${element}+`;
    }
  }

  if (qObj.exact) {
    console.log(111);
    q.replace("exact", "111");
    var x = qObj[Object.keys(qObj)[0]];
    q.replace(`${x}\g`, `\"${x}\"`);
  }
  return q;
};

const optionalParamsBuilder = (inputReqQuery) => {
  const qObj = inputReqQuery;
  console.log(qObj);
  var op = qObj.op;
  console.log(op);
  if (!op) {
    op = "OR";
  } else {
    op = "AND";
  }
  console.log(op);

  var row = qObj.row;
  if (!row) row = 10;
  var starts = qObj.starts;
  if (!starts) starts = 0;
  var optionalQ = `&row=${row}&starts=${starts}&q.op=${op}`;
  return optionalQ;
};

/**
 * ? input response from axios and then parse into easier type to read
 * ! underconstructor
 * @param {Object} data
 * @returns Object
 */
const parseInfo = async (data) => {
  const input = data;
  const toParseArr = input.response.docs;
  const returnData = {
    queryInfo: input.responseHeader,
    total: input.response.numFound,
    start: input.response.start,
    docs: [],
  };
  await toParseArr.forEach((e) => {
    let tmp = {
      title: e.title.join(""),
      rating: e.rating,
      year: e.year ? Number(e.year.join("")) : 0,
      users_rating: e.users_rating ? Number(e["users_rating"].join("")) : 0,
      votes: Number(e.votes.join("")),
      metascore: e.metascore ? Number(e.metascore.join("")) : 0,
      img_url: e.img_url ? e.img_url.join("") : "",
      countries: e.countries ? e.countries : [],
      languages: e.languages ? e.languages : [],
      actors: e.actors ? e.actors : [],
      genre: e.genre ? e.genre : [],
      tagline: e.tagline ? e.tagline.join("") : "",
      description: e.description.join(""),
      directors: e.directors,
      duration: e.runtime ? e.runtime.join("") : "",
      imdb_url: e.imdb_url ? e.imdb_url.join("") : "",
      id: e.id,
      _version_: e._version_,
    };

    returnData.docs.push(tmp);
  });
  return returnData;
};
module.exports = {
  queryBuilderAll,
  parseInfo,
  queryBuilderField,
  optionalParamsBuilder,
};
