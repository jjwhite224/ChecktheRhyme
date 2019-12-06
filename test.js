let lyrics;
let wordList;
let stanzaList;
let rhymeList;
function preload(){
lyricData=loadJSON("https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=18928339&apikey=828251934ab71bde5ddf79419d12a713");
}
function setup(){
    lyrics=lyricData.message.body.lyrics.lyrics_body;
    wordList=dataSplit(lyrics)[0];
    stanzaList=dataSplit(lyrics)[1];
    rhymeList=dataSplit(lyrics)[2];
    console.log(wordList);
    console.log(stanzaList);
    console.log(rhymeList);
}
function draw(){
rhymeCheck(wordList,stanzaList,rhymeList);
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
      if (wordList[i][j]!='')
        append(rhymeChecklist,wordList[i][j]);

        }
      }
      return [wordList,stanzaList,rhymeChecklist];

}

function rhymeCheck(wordList,stanzaList,rhymeChecklist){
  for (let i=0;i<rhymeChecklist.length;i++){
    for (let j=0;i<wordList.length;j++){
      for (let k=0;k<wordList[i].length;k++){
        text(rhymeChecklist[i],0,0,500,750);
      }
    }

}
}
