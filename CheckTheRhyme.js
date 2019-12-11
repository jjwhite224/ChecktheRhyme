let lyrics;
let wordList;
let stanzaList;
let rhymeList;
let artAPI;
let artData;
let bubble=[];
let input;
let lyricSearch;
let trackInput;
let artistInput;
let trackId;
let track;
let artist;
let lyricText;
let albumID;
let albumart;

function setup(){
    trackInput = createInput('Enter a Track');
    trackInput.position(920,450);
    artistInput = createInput('Enter Artist')
    artistInput.position(trackInput.x+trackInput.width+50,450);
    trackButton = createButton('Search Lyrics');
    trackButton.position(trackInput.x+110,480);
    chartButton = createButton('#1 Searched Lyric');
    chartButton.position(trackButton.x,500);
    createCanvas(displayWidth,800);
  }

function draw(){
background(249, 229, 188);
for (i=0;i<bubble.length;i++){
  if (bubble[i]!= null){
    bubble[i].display();
    bubble[i].update();
    bubble[i].gravity();

}


  //bubble[i].gravity();
  for (j=0;j<bubble.length;j++){
  if (i!=j && bubble[i]!= null && bubble[j]!= null){
    bubble[i].rhymeCheck(bubble[j]);
    if(i!=j && bubble[i].detectCollision(bubble[j])){
      bubble[i].bounce();
      bubble[j].bounce();
    }
    }

  }
}
trackButton.mousePressed(loadLyrics);
chartButton.mousePressed(chartLyrics);

}

function dataSplit(lyrics){
  let wordCollector;
  let stanzaCollector='';
  let stanzaList=[];
  let wordList=[];
  let rhymeChecklist=[];
  let wordCounter=0;
  let stanzaCounter=0;
  for (let i=0;i<lyrics.length;i++){
    if (lyrics[i]!=','){
      stanzaCollector=stanzaCollector+lyrics[i];
    }


    if (str(lyrics[i])=='\n'){
      append(stanzaList,stanzaCollector);
      stanzaCollector=' ';
  }

  }
  for (let i=0;i<stanzaList.length;i++){
      wordCollector=split(stanzaList[i],' ');
      append(wordList,wordCollector)
      }

  for (let i=0;i<wordList.length;i++){
    for(let j=0;j<wordList[i].length;j++){
      if (wordList[i][j]!=''){
        append(rhymeChecklist,wordList[i][j]);
      }else if(wordList[i][j]=='...'||wordList[i][j]=='*******'){break;}
        }
      }
      return [wordList,stanzaList,rhymeChecklist];


}
function loadLyrics(){
const track=trackInput.value();
const artist=artistInput.value();
loadJSON('https://api.musixmatch.com/ws/1.1/track.search?q_track='+track+'&q_artist='+artist+'&f_has_lyrics=1&apikey=828251934ab71bde5ddf79419d12a713',searchLyrics);


}
function chartLyrics(){
  loadJSON('https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&country=us&f_has_lyrics=1&apikey=828251934ab71bde5ddf79419d12a713',searchLyrics);
}

function searchLyrics(search){
  console.log(search)
  trackId=search.message.body.track_list[0].track.track_id;
  trackname=search.message.body.track_list[0].track.track_name;
  artistname=search.message.body.track_list[0].track.artist_name;
  albumID=search.message.body.track_list[0].track.album_id;
  textSize(30);
  text(trackname,width/2,height/2);
  console.log(trackId);
  loadJSON("https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="+trackId+"&apikey=828251934ab71bde5ddf79419d12a713",getLyrics);
  loadJSON("https://api.musixmatch.com/ws/1.1/album.get?album_id="+albumID+"&apikey=828251934ab71bde5ddf79419d12a713",getAlbum);
}

function getLyrics(lyricData){
  displayLyrics(lyricData);
  function displayLyrics(lyricData){
    lyrics=lyricData.message.body.lyrics.lyrics_body
    text(lyricData)
    console.log(lyricData);
    wordList=dataSplit(lyrics)[0];
    stanzaList=dataSplit(lyrics)[1];
    rhymeList=dataSplit(lyrics)[2];
    console.log(wordList);
    console.log(stanzaList);
    console.log(rhymeList);
    for(i=0;i<rhymeList.length;i++){
      if (RiTa.containsWord(rhymeList[i])==true){
      bubble[i]=new Bubble(rhymeList[i]);
      if(bubble[i]!=null){
        bubble[i].rhymeCheck(rhymeList[i]);
      }

      }

      }
    }
    }

  function getAlbum(albumJSON){
    console.log(albumJSON);
    albumName=albumJSON.message.body.album.album_name;
    artistName=albumJSON.message.body.album.artist_name;
    loadJSON('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=	ece64c4337c8a1bfd576483ec3c27355&artist='+artistName+'&album='+albumName+'&format=json',getAlbumart);
  }
  function getAlbumart(album){
    console.log(album.album.image);
    albumCoverPath=album.album.image['4']['#text'];
    loadImage(albumCoverPath,showAlbum);
  }
function showAlbum(albumArt){
  background(albumArt);

}






class Bubble{
  constructor(circleWord){
    this.circleSize=25
    this.circleColor=color(random(255),random(255),random(255));
    this.textColor=color(0);
    this.textSize=5
    this.circleWord=circleWord
    this.x=random(width);
    this.y=random(height);
    this.r=this.circleSize/2;
    this.horizspeed=random(0,2);
    this.vertspeed=random(0,2);
    this.counter=0;
  }
  display(){
    push();
    noStroke();
    fill(this.circleColor);
    //this.circleSize=map(this.counter,0,100,25,75);
    circle(this.x,this.y,this.circleSize);
    pop();
    fill(this.textColor);
    //this.textSize=map(this.counter,0,100,10,13);
    textSize(this.textSize);
    textAlign(CENTER);
    textFont('Arial');
    text(this.circleWord,this.x,this.y);
  }
  gravity(){
    if(this.y+this.r<height){
      this.y+=.1;
    }
  }
  detectCollision(otherBubble){
    let d=dist(this.x,this.y,otherBubble.x,otherBubble.y);
    if (d<this.r+otherBubble.r){
      return true;
    }
    else{
      return false;
    }
  }
update(){
  this.x=this.x+this.horizspeed;
  this.y=this.y+this.vertspeed;
  if (this.x+this.r>=width||this.x+this.r<=0 ){
    this.horizspeed=-this.horizspeed;
    this.vertspeed=-this.vertspeed;
  }else if(this.y+this.r>=height|| this.y+this.r<=0){
    this.horizspeed=-this.horizspeed;
    this.vertspeed=-this.vertspeed;
  }
}
bounce(){
  this.horizspeed=-this.horizspeed;
  this.vertspeed=-this.vertspeed;
}
rhymeCheck(otherBubble){
  if (RiTa.isRhyme(this.circleWord,otherBubble.circleWord)==true && this.circleWord!=otherBubble.circleWord){
    this.circleSize+=.05;
    this.textSize+=.01;
    this.circleColor=otherBubble.circleColor;
    //console.log(this.counter);
}
}
}
