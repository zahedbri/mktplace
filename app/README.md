## The Marketplace 

```javascript


const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DATABASE;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
```