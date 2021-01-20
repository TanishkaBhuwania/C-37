class Game {
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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200)
    car2 = createSprite(300,200)
    car3 = createSprite(500,200)
    car4 = createSprite(700,200)
    //store all the cars in the cars array
    cars = [car1,car2,car3,car4]
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index of the array for players ,
      var index = 0;
      //x and y are the positions of the car
      var x = 0,y;
      for(var plr in allPlayers){
        //for every players index will be increased by one
        index = index + 1
        //car is placed at a distance of 200 in the x direction 
        x = x + 200
        //calculate the cars y position getting the players distance from the data base
        y = displayHeight - allPlayers[plr].distance
        //assign the x an y position to the car
        //index = 1 for the first player who needs to be assinged the 0th position of the car in the cars array,so index - 1
        cars[index - 1].x = x
        cars[index - 1].y = y
        
        if (plr === "player" + player.index){
            //display the active sprite in the red colour
          cars[index - 1].shapeColor = "red"
          //place the camera along with the y position of the car
          camera.position.x = displayWidth/2 
          camera.position.y = cars[index - 1].y 
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
