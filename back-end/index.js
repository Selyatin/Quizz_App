
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://root:root@quizzer-avtfl.mongodb.net/test?retryWrites=true&w=majority";
const port = process.env.PORT || 8080;
const app = express();
let data = null;

MongoClient.connect(url, {useNewUrlParser: true},(err, client) => {
    if(err) throw err;
    console.log(client);
    let db = client.db("customQuizz");
    // To send the results
    db.collection("shipwrecks").findOne({},(err, result) => {
        if(err) throw err;
        data = result;
        client.close();
    });

    // To add new Values
    // db.collection("shipwrecks").insertOne({
    //   results: [
    //     {
    //       category: "General Knowledge",
    //       type: "multiple",
    //       difficulty: "easy",
    //       question: "Is XDEVMAN the best COMPANY ever ?",
    //       correct_answer: "YES",
    //       incorrect_answers: []
    //     },
    //     {
    //       category: "General Knowledge",
    //       type: "multiple",
    //       difficulty: "easy",
    //       question: "Who is currently developing this app ?",
    //       correct_answer: "Selyatin & Ayoub",
    //       incorrect_answers: [
    //         "Bill Gates",
    //         "Stephen Hawking",
    //         "Steve Jobs (!)"
    //       ]
    //     }
    //   ]
    // }, (err, result) => {
    //   if(err) throw err;
    //   console.log("1 Value Inserted");
    //   client.close();
    // });

    // To Delete values
    // db.collection("shipwrecks").deleteOne({_id: "5d0008eea9d22c08a88c86db"}, (err, result) => {
    //   if(err) throw err;
    //   console.log("1 Item Deleted");
    //   client.close();
    // });
});

app.get("/", (req,res) => {
    if(req) console.log("New Request");
    res.set("Content-type", "application/json");
     res.send(data);
});

app.listen(port);