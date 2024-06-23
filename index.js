console.log('\033c')
const express=require('express');
const app=express();
const server=require('http').Server(app);
const fs=require('fs');

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

app.engine('html',require('ejs').renderFile);
app.set('views','files')

app.use(express.urlencoded({ extended: true }));

server.listen(3000,()=>{console.log('server is listening to your sounds >:)')});
var db,rather,l;
fs.readFile('./questions.json','utf8',(e,data)=>{
  db=JSON.parse(data);
  l=Math.floor(Math.random()*db.length);
  rather=db[l];
});

setInterval(()=>{
  fs.readFile('questions.json','utf8',(e,data)=>{db=JSON.parse(data);l=Math.floor(Math.random()*db.length);rather=db[l]});
},2000);
app.use(express.static('public'));

app.get(['/','/index.html','/index'],(req,res)=>{
  var user = req.headers["x-replit-user-name"];
  res.render('index.html',{rather,username: user});
});

app.get(['/new','/new.html','/createNew','/createNew.html','createNewQuestion','createNewQuestion.html'],(req,res)=>{
  res.render('new.html',{username:req.headers["x-replit-user-name"]});
})

app.post('/',(req,res)=>{
  var username = req.headers["x-replit-user-name"];
  if(db[l][2].includes(username) || !username || username.length==0) { return };
  var body = JSON.parse(Object.getOwnPropertyNames(req.body)[0]),clc=body['clc'];
  if(![1,0].includes(clc)){console.log("!Cheat Detected: ",username)}
  db[l][0].vote += 2-clc;
  db[l][1].vote += 1-Math.round(1-clc/2);
  db[l][2].push(username);
  fs.writeFileSync('questions.json',JSON.stringify(db));
});

app.post("/answered/:q",(req,res) => {
  let question = db[Number(req.params.q)];
  let username = req.headers["x-replit-user-name"];
  if(question[2].includes(username)){
    res.send("y");
  } else {
    res.send("n")
  }
})

app.post('/new',(req,res)=>{
  var author = req.headers["x-replit-user-name"];
  console.log("new question author: "+author);
  var body = JSON.parse(Object.getOwnPropertyNames(req.body)[0]);
  const both = [body.v1,body.v2,body.anonymous,body.anon_name];
  if(both[0].length == 0 || both[1].length == 0){
    return console.log("!input Failure (no context): ",author)
  }
  db.push([{"text":both[0],"vote":0},{"text":both[1],"vote":0},[],body.anonymous?body.anon_name:author,body.anonymous,db.length]);
  fs.writeFileSync('questions.json',JSON.stringify(db));
});
app.get('/gallery',(req,res)=>{
  var data = [];
  for (let i = 0; i < db.length; i += 3)
     data.push(db.slice(i, i+3));
  res.render('gallery.html',{username:req.headers["x-replit-user-name"], data:shuffle(data)});
})

app.get(['/question/:ID'],(req,res)=>{
  var user = req.headers["x-replit-user-name"];
  res.render('question.html',{rather: db[req.params.ID],username: user,id:req.params.ID});
});

app.post(['/question/:ID'],(req,res)=>{
  let id = req.params.ID
  var username = req.headers["x-replit-user-name"];
  if(db[id][2].includes(username) || !username || username.length==0) { return };
  var body = JSON.parse(Object.getOwnPropertyNames(req.body)[0]),clc=body['clc'];
  if(![1,0].includes(clc)){console.log("!Cheat Detected: ",username)}
  db[id][0].vote += 2-clc;
  db[id][1].vote += 1-Math.round(1-clc/2);
  db[id][2].push(username);
  fs.writeFileSync('questions.json',JSON.stringify(db));
});
