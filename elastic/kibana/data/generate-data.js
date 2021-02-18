x = `curl -XPUT 'http://localhost:9200/test8/test/2' -d '{
    "date" : "2015-08-23T14:02:30",
    "action" : "stop",
    "myid" : 1
}'
curl -XPUT 'http://localhost:9200/test8/test/3' -d '{
    "date" : "2015-08-23T00:01:45",
    "action" : "start",
    "myid" : 2
}'
curl -XPUT 'http://localhost:9200/test8/test/4' -d '{
    "date" : "2015-08-23T00:01:55",
    "action" : "start",
    "myid" : 3
}'
curl -XPUT 'http://localhost:9200/test8/test/5' -d '{
    "date" : "2015-08-23T14:04:00",
    "action" : "stop",
    "myid" : 2
}'
curl -XPUT 'http://localhost:9200/test8/test/6' -d '{
    "date" : "2015-08-23T14:02:55",
    "action" : "stop",
    "myid" : 3
}'`

const commaNewLine = `'\n`;

x.split(commaNewLine)
  .map(group)
  .map(objectify)
  .map(template)
  .forEach(putStrLn)

function group(x) {
  return /curl.+(\d).+\s*.+(\d{4}-\d{2}.+)",\s*".+"\s*:\s*"([a-zA-z]*)",/.exec(x)
}
function objectify([, myid, date, action, ]) {
  return { date, action, myid };
}
function indexName() {
  return 'tre_index';
}
function template(x) {
  return `PUT ${indexName()}/_doc/${x.myid}\n${JSON.stringify(x, null, 2)}`
}
function putStrLn(x) {
  console.log(x)
}
