const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:1234@cluster0-ycar6.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let inventors = null;
let id = null;

const myInventor = {
    first: "Ramiro",
    last: "Slullitel",
    year: 1999,
  };

client.connect()
  .then(function openConnection(){
    return client.db("tp2_desafio").collection("inventors");
  })
  .then((collection) => {
    inventors = collection;
    return inventors.insertOne(myInventor);
  })
  .then((result) => {
    id = result.insertedId;
    console.log("New inventor inserted with id:", id);
    return id;
  })
  .then((id) => {
    return inventors.updateOne(
        { _id : id },{ $set: { first: "Gaston" } 
    });
  })
  .then((result) => {
    console.log("Inventor updated with id:", id);
    return id;
  })
  .then((id) => {
    return inventors.find({ _id: id }).toArray();
  })
  .then((result) => {
    console.table(result);
    return id;
  })
  .then((id) => {
    return inventors.deleteOne({ _id: id });
  })
  .then((result) => {
    console.log("Inventor deleted with id:", id);
  })
  .catch((err) => {
    console.log(err);
    client.close();
  });