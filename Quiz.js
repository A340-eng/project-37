class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){

    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    
    question.hide();
    this.title.hide();
    this.input1.hide();
    this.input2.hide();
    this.button.hide();

    textSize(30);
    text("My Quiz: ", 120, 100);
    contestant.getContestantInfo();
    
    if(allContestants !== undefined){

      background("yellow");
      var display_position = 30;
      fill("blue");
      textSize(20);
      text("NOTE: Contestant who answered correct are highlighted in green color", 130, 230);
   
      for(var plr in allContestants){
      
      var correctAns = "2";
      
      if(correctAns === allContestants[plr].answer)
      fill("Green")
      else{
        fill("red");

        /*display_position += 30;
        textSize(15);
        text(allContestants[plr].name + ": " + allContestants[plr].distance, 120,display_position)*/
      }
    }
    
    if(keyIsDown(UP_ARROW) && contestant.index !== null ){
      contestant.distance +=50
      contestant.update();
  }    
    }    
  }
}