if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

 let deckId;
 let remainCards;
 let cardImageDiv="1";
 let playerCurrentValue=0;
 let robotCurrentValue=0;
 let robotDrawing=0;
 let aceCount=0;



window.onload = function() {
 closeLightBox();
 
} // window.onload


function startGame(data){
	let url="https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
	
	  playerCurrentValue=0;
	  robotCurrentValue=0;
	
	fetch(url)
	.then(response => response.json())
	.then(data => update(data) 
	);
}

function update(data){
	
	console.log(data);
	
	//Id of the currnt deck
	 deckId= data.deck_id;
	console.log(deckId);
	
	//Number of cards remaining
	remainCards=data.remaining;
	console.log("Remaining Cards:" + remainCards);
	
}

function drawCards(deck){
	
	let url2="https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1";
	console.log(url2);
	
	fetch(url2)
	.then(response => response.json())
	.then(deck => printCard(deck) 
	);
}

function printCard(deck){
	console.log(deck);
	
	document.getElementById("blackJackMain").innerHTML += "<img src=" + deck.cards[0].image + " alt='your cards'>";	
	
	if (deck.cards[0].value == "KING" || deck.cards[0].value == "QUEEN" || deck.cards[0].value == "JACK"){
	deck.cards[0].value=10;
}
    if (deck.cards[0].value == "ACE"){
		deck.cards[0].value=11;
		aceCount++;
	}
	
	if (deck.cards[0].value == "ACE" && aceCount==1){
		deck.cards[0].value=1;
	}



let value= parseInt(deck.cards[0].value);

 playerCurrentValue = playerCurrentValue + value;
 console.log("Player Current Value: " + playerCurrentValue);
 document.getElementById("playerScoreDisplay").innerHTML = "" + playerCurrentValue;

 
 if (playerCurrentValue > 21){
	 startRobot(deck);
	  
 }
 
}

function showInformation(){
	document.getElementById("information").style.display= "block";
}

function closeInformation(){
	document.getElementById("information").style.display= "none";
}


//Starts code to run robot

function startRobot(deck){
	 
	
	 document.getElementById("draw").style.display= "none";
	 document.getElementById("stand").style.display= "none";
     console.log("Player chose stand");
	 robotDrawing++;
	 theThing(deck);
	 
	
}

function theThing(deck){
	if(robotCurrentValue=>17){
		 
		setTimeout(() => { checkWin(); }, 1000);
	}
	
	 if(robotDrawing==1 && robotCurrentValue<17){
	drawRobotCards(deck);
	
	 }
	
}


 function drawRobotCards(deck){
	
	let url3="https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1";
	console.log(url3);
	
	fetch(url3)
	.then(response => response.json())
	.then(deck => printRobotCard(deck) 
	);
}

function printRobotCard(deck){
	
	console.log(deck);
	let backCard="images/card_back1.png";
	document.getElementById("blackJackRobot").innerHTML += "<img src=" + backCard + " alt='Robot Cards'>";	
	
	if (deck.cards[0].value == "KING" || deck.cards[0].value == "QUEEN" || deck.cards[0].value == "JACK"){
	deck.cards[0].value=10;
}
    if (deck.cards[0].value == "ACE"){
		deck.cards[0].value=11;
		aceCount++;
	}
	
	if (deck.cards[0].value == "ACE" && aceCount==1){
		deck.cards[0].value=1;
	}



let value= parseInt(deck.cards[0].value);

 robotCurrentValue = robotCurrentValue + value;
 console.log("Robot Current Value: " + robotCurrentValue);
 document.getElementById("robotScoreDisplay").innerHTML = "" + robotCurrentValue;

 theThing(deck);
}



function checkWin(){
	console.log("Checking Win");
	 
	let player1= playerCurrentValue;
	let robot2= robotCurrentValue;
	
	if (player1==robot2){
		showTieBox();
		
	}else{
	let arr = [player1, robot2]
    let goal = 21
    let close1 = arr.reduce((prev, curr) => {
    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
  console.log("Close1 is " + close1);

 close1= parseInt( close1);
 console.log("Player Current Value: " + playerCurrentValue);
console.log("Robot Current Value: " + robotCurrentValue);
if(close1===playerCurrentValue){
	showWinBox();
}

if(close1===robotCurrentValue){
	showLoseBox();
}
	}
	
}



function showWinBox(){
	document.getElementById("lightBoxWin").style.display="block";
	document.getElementById("playerScoreWin").innerHTML = playerCurrentValue;
	document.getElementById("robotScoreWin").innerHTML = robotCurrentValue;
	console.log("Win");
}


function showLoseBox(){
	document.getElementById("lightBoxLose").style.display="block";
	document.getElementById("playerScoreLose").innerHTML = playerCurrentValue;
	document.getElementById("robotScoreLose").innerHTML = robotCurrentValue;
	console.log("Lose");
}

function showTieBox(){
	document.getElementById("lightBoxTie").style.display="block";
	document.getElementById("playerScoreTie").innerHTML = playerCurrentValue;
	document.getElementById("robotScoreTie").innerHTML = robotCurrentValue;
	console.log("Tie");
}



function closeLightBox(){
     document.getElementById("lightBoxLose").style.display="none";
	 document.getElementById("lightBoxWin").style.display="none";
	 document.getElementById("lightBoxTie").style.display="none";
	 
	 
	  document.getElementById("blackJackMain").innerHTML="";
	  document.getElementById("blackJackRobot").innerHTML="";
	  
	  document.getElementById("draw").style.display= "block";
	document.getElementById("stand").style.display= "block";
	  
	  document.getElementById("playerScoreDisplay").innerHTML = "";
	  document.getElementById("robotScoreDisplay").innerHTML = "";
	  playerCurrentValue=0;
	  robotCurrentValue=0;
	   robotDrawing=0;
	   player1=0;
	   robot2=0;
	   aceCount=0;
	   startGame();
	   
	   //close1=0;
 } // closeLightBox 


















