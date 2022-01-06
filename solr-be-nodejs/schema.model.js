class IMDBCrawled {
  /**
   * ? Constructor class item crawled taken from Solr
   * @param {Array} title
   * @param {Array} rating
   * @param {Array} year
   * @param {Array} users_rating
   * @param {Array} votes
   * @param {Array} metascore
   * @param {Array} img_url
   * @param {Array} countries
   * @param {Array} languages
   * @param {Array} actors
   * @param {Array} genre
   * @param {Array} tagline
   * @param {Array} description
   * @param {Array} directors
   * @param {Array} runtime
   * @param {Array} imdb_url
   * @param {Array} id
   * @param {Array} _version_
   */
  constructor(
    title,
    rating,
    year,
    users_rating,
    votes,
    metascore,
    img_url,
    countries,
    languages,
    actors,
    genre,
    tagline,
    description,
    directors,
    runtime,
    imdb_url,
    id,
    _version_
  ) {
    this.title = title ? title.toString() : "";
    this.rating = rating ? rating : [];
    this.year = year ? Number(year.toString()) : 0;
    this.users_rating = users_rating ? Number(users_rating.toString()) : 0;
    this.votes = votes ? Number(votes.toString()) : 0;
    this.metascore = metascore ? Number(metascore.toString()) : 0;
    this.img_url = img_url ? img_url.toString() : "";
    this.countries = countries ? countries : [];
    this.languages = languages ? languages : [];
    this.actors = actors ? actors : [];
    this.genre = genre ? genre : [];
    this.tagline = tagline ? tagline.toString() : "";
    this.description = description ? description.toString() : "";
    this.directors = directors ? directors : [];
    this.duration = runrime ? runtime.toString() : "";
    this.imdb_url = imdb_url ? imdb_url.toString() : "";
    this.id = id ? id : "";
    this._version_ = _version_ ? _version_ : 0;
  }
}

module.exports = IMDBCrawled;
