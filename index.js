let pokemonArray = ["", "", "", "", "", "", "", "", "", ""];
let pokemonNameArray = ["", "", "", "", "", "", "", "", "", ""];
let correctArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
let pokemonImg = document.getElementById("pokemonImg");
let previous = document.getElementById("previous")
let next = document.getElementById("next");
let container = document.getElementById("container");
let table = document.getElementById("table");
let images = document.querySelector(".image");
let timer = document.getElementById("timer");
let scoreDisplay = document.getElementById("score");
let pokedex = document.getElementById("pokedexDiv");
let results = document.getElementById("results");
let finalScore = document.getElementById("finalScore");
let finalTime = document.getElementById("finalTime");
let restart = document.getElementById("restart");
let score = 0;
let counter = 0;
let time = 60;

userinput.focus();

//pokemons with exceptions
// 32- nidoran m, 29 - nidoran f, 122 mr. mime
let nidoranM = ["nidoran", "nidoran m", "nidoran-male", "nidoran male", "nidoran-m"];
let nidoranF = ["nidoran", "nidoran f", "nidoran-female", "nidoran female", "nidoran-f"];
let mrMime = ["mr. mime", "mr mime", "mr-mime"];

window.addEventListener("keydown", () => {
    if(event.key == "ArrowLeft"){
        previousPic();
    }
    if(event.key == "ArrowRight"){
        nextPic();
    }
    if(event.key == "Enter"){
        submitAnswer();
    }
})



createList();
async function createList(){  
    
    for(let i = 1; i <= 10; i+=1){
        let randNumber = Math.floor(Math.random() * 151 + 1);
        if(pokemonArray.includes(randNumber)){
            while(pokemonArray.includes(randNumber)){
                randNumber = Math.floor(Math.random() * 151 + 1);
            }
        }

        pokemonArray[i - 1] = randNumber;
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randNumber}`);
        let data = await response.json();
        console.log(data.name);
        pokemonNameArray[i - 1] = data.name;

        let pokemonSprite = data.sprites.front_default;
        let pokemonImg = document.getElementById(`row${i}`).querySelector(".image");

        pokemonImg.src = pokemonSprite;

        let pokemonName = document.getElementById(`row${i}`).querySelector(".pokemon");
        pokemonName.textContent = `${data.name}`;
        
    }
}


showPicture();
async function showPicture(){
    let position = pokemonArray[counter];
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${position}`);
    let data = await response.json();

    let pokemonSprite = data.sprites.front_default;

    pokemonImg.src = pokemonSprite;
    pokemonImg.style.visibility = "visible";

}


function submitAnswer(){
    let userinput = document.getElementById("userinput").value.toLowerCase();

    if (userinput == pokemonNameArray[counter] || nidoranM.includes(userinput) || nidoranF.includes(userinput) || mrMime.includes(userinput)){
        p.style.color = "rgb(47, 161, 47)";
        p.textContent = "RIGHT"
        setTimeout(nextPic, 400);
        correctArray[counter] += 1;
        score += 1;
        if(score == 10){
            scoreDisplay.textContent = "10"
        }
        else{
            scoreDisplay.textContent = `0${score}`;
        }

    }
    else{
        p.style.color = "rgb(196, 12, 12)"
        p.textContent = "WRONG";
        setTimeout(deleteContent, 400);
    }
}

function deleteContent(){
    p.textContent = "";
    userinput.value = "";
}

next.addEventListener("click", nextPic)

function nextPic(){
    if (!correctArray.includes(0)){
        finishGame();
    }
    else{
        if (counter == 9) {
            counter = 0;
            if (correctArray[counter] == 1){
                while (correctArray[counter] == 1){
                    if(counter == 9){
                        counter = 0;
                    }
                    else{
                        counter += 1;
                    }
                }
            }
        }
        else {
            counter += 1;
            if (correctArray[counter] == 1){
                while (correctArray[counter] == 1){
                    if(counter == 9){
                        counter = 0;
                    }
                    else{
                        counter += 1;
                    }
                }
            }
        }
        p.textContent = "";
        userinput.value = "";
        showPicture();
    }
}

previous.addEventListener("click", previousPic)

function previousPic(){
    if (!correctArray.includes(0)){
        finishGame();
    }
    else{
        if (counter == 0) {
            counter = 9;
            if (correctArray[counter] == 1){
                while (correctArray[counter] == 1){
                    if(counter == 0){
                        counter = 9;
                    }
                    else{
                        counter -= 1;
                    }
                }
            }
        }
        else {
            counter -= 1;
            if (correctArray[counter] == 1){
                while (correctArray[counter] == 1){
                    if(counter == 0){
                        counter = 9;
                    }
                    else{
                        counter -= 1;
                    }
                }
            }
        }
        p.textContent = "";
        userinput.value = "";
        showPicture();
    }
}

function finishGame(){
    clearInterval(myTimer);
    pokedex.style.display = "none";
    table.style.display = "flex";
    for (let i = 1; i <= 10; i += 1){
        let image = document.getElementById(`row${i}`).querySelector(".image");
        image.style.display = "block";

        let correct = document.getElementById(`row${i}`).querySelector(".correct");
        if (correctArray[i - 1] == 1){
            correct.textContent = `✔️correct`;
            correct.style.color = "yellowgreen";
        }
        else{
            correct.textContent = '❌incorrect'
            correct.style.color = "red";
        }
    }
    finalScore.textContent = `Score: ${score}/10`;
    if (time >= 10){
        finalTime.textContent = `Time left: 00:${time}`;
    }
    else{
        finalTime.textContent = `Time left: 00:0${time}`;
    }
    results.style.visibility = "visible";
    restart.style.display = "block";
}


let myTimer = setInterval(countdown, 1000);
function countdown(){
    time -= 1;
    if(time < 10){
        timer.textContent = `00:0${time}`;
    }
    else{
        timer.textContent = `00:${time}`;
    }
    if (time == 0){
        clearInterval(myTimer);
        setTimeout(finishGame, 400);
    }
    
}


restart.addEventListener("click", restartGame);

async function restartGame() {
        clearInterval(myTimer); // Clear the previous interval
        pokemonImg.src = "";
        // Reset pokemon arrays
        pokemonArray = ["", "", "", "", "", "", "", "", "", ""];
        pokemonNameArray = ["", "", "", "", "", "", "", "", "", ""];
        correctArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        table.style.display = "none";

        await createList();

        // Reset variables and elements
        results.style.visibility = "hidden";
        restart.style.display = "none";
        score = 0;
        counter = 0;
        time = 60;
        userinput.value = "";
        pokedex.style.display = "flex";
        timer.textContent = "01:00";
        scoreDisplay.textContent = "00";
        p.textContent = "";
    
        // Show first pokemon image
        showPicture();
    
        // Start a new timer interval
        myTimer = setInterval(countdown, 1000);
        userinput.focus();

}


