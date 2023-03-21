# INTRODUCTION
<p align="center">
Film searching with Solr. The data is crawled from IMDB
</p>

## ABOUT CREATOR

***1. Vũ Hoàng Tuấn***

Responsible as Backend developer

> tuan.vh175995@sis.hust.edu.vn 

***2. Ngô Đình Long***

scrapy crawler for solr

**Special thanks to *Trần Thị Phượng* for having done the report**

## ABOUT PROJECT

### Solr 

Download Solr zip here, at its homepage

[Solr download page](https://solr.apache.org/downloads.html)

Open commandline, type:

- `.\bin\solr.cmd start` to start the solr, after that, you can open `http://localhost:8983` to see the admin page
- `.\bin\solr.cmd create -c imdbdata` to create the *imdbdata* core
- `java -Dtype=application/json -Dc=imdbdata -jar .\example\exampledocs\post.jar sample.json` after the core is create. The sample.json is the json file which contains the documents i have already crawled from IMDB.

### Scrapy

Used python for crawling data from imdb

I suggest install with anaconda, then open the *Anaconda Powershell Prompt*, `cd` to `.\scrapy\imdb\` to run the command. more instruct in folder's **readme**
 
### Backend

Used NodeJs for releasing API

Just open commandline: `npm install`, `node index.js`, and done!








