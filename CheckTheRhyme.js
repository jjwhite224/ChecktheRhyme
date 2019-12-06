let lyricData;
let artData;
let imgData;
let dictData;
let artAPI;
let rhymeAPI;
let lyrics;

function preload(){
  lyricData=loadJSON("https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=18928339&apikey=828251934ab71bde5ddf79419d12a713");
  artAPI='https://collectionapi.metmuseum.org/public/collection/v1/'
  artData=loadJSON(artAPI+'search?isHighlight=true&q=woke&medium=Paintings&hasImages=true');







}
function setup(){
  console.log(lyricData);
  console.log(artData);
  let objectId=str(artData.objectIDs[0]);
  imgData=loadJSON(artAPI+'objects/'+ objectId);
  console.log(imgData);
  classicImage=loadImage(str(imgData.primaryImage));
  rhymeAPI='https://rhymebrain.com/talk?function=getWordInfo&word='
  lyrics=lyricData.message.body.lyrics.lyrics_body;
  createCanvas(displayWidth,displayHeight);
  activeLyrics=new Lyrics;
  activeLyrics.dataSplit();





}
function draw(){
background(255);
activeLyrics.display();
//console.log(mouseX,mouseY)


}

class Lyrics{
  constructor(){
    this.x=displayWidth/2;
    this.y=0;
    this.lyrics=lyrics
    this.wordList=[];
    this.stanzaList=[];
    this.rhymeList=[];
    this.show=''
    this.r=random(255);
    this.g=random(255);
    this.b=random(255);


  }
  display(){
    let tSize=30;
    textAlign(CENTER,TOP);
    textSize(tSize);
    rectMode(CORNER);
    //rect(0,0,500,750);
    let counter=1;
    for (let i=0;i<this.wordList.length;i++){
      for (let j=0;j<this.wordList[i].length;j++){
        if (counter<this.wordList[i].length){
          if(RiTa.isRhyme(this.wordList[i][counter],this.wordList[i][j])==true){
            if (counter>this.wordList[i].length){
              counter=0;
            }
            this.show=this.show+' '+this.wordList[i][j]
            push();
            fill(0,200,0);
            text(this.show,0,0,500,750);
            pop();


            }
            else{
              this.show=this.show+' '+this.wordList[i][j]
              fill(200,0,0);
              text(this.show,0,0,500,750)

            }
          }
        }
counter++;
this.y++;
      }


}
  /*scroll(){
    this.y=this.y+100;
    print(this.y);

  }*/
  dataSplit(){
    let wordCollector;
    let stanzaCollector='';

    for (let i=0;i<this.lyrics.length;i++){
      if (this.lyrics[i]!=','){
        stanzaCollector=stanzaCollector+this.lyrics[i];
      }


      if (str(this.lyrics[i])=='\n'){
        append(this.stanzaList,stanzaCollector);
        stanzaCollector=' ';
    }

    }
    for (let i=0;i<this.stanzaList.length;i++){
        wordCollector=split(this.stanzaList[i],' ');
        append(this.wordList,wordCollector)
        }

console.log(this.wordList);
}
}
