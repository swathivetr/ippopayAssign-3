const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

let db;

const mongoConnect=(cb)=>{
    MongoClient.connect(
        'mongodb+srv://swathi:Swathi27102001@cluster0.ssmcy1t.mongodb.net/shop?retryWrites=true&w=majority'
        ).then((client)=>{
            console.log("connected");
            db=client.db();
            cb();
        })
        .catch((err)=>{
            console.log(">>>>>>>>>>>>>>>>>>>>");
            console.log(err);
            throw err;
        });
}

const getDb=()=>{
    if(db)
    {
        return db;
    }
    throw 'database not found!'
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;