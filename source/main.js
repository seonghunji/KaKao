import { jsonData } from './data.js';
import css from './style.css';

const button = document.querySelector('#BtnStart');
const timeDisplay = document.querySelector('#time');
const scoreDisplay = document.querySelector('#score');
const wordDisplay = document.querySelector('#word');
const inputWord = document.querySelector('input');

var timeLeft = 0; // 남은시간
var btnTP = 0; // 시작하기(0), 초기화(1) 버튼 구분 값
var timerID;
var problemScore = 10; // 문제 맞춘 첨수, Default:10점
var problemText;
var step = 0;
var enterTP = false;
var spendTime = 0;
var time = 0;
var avgTime = 0;

button.addEventListener('click',Timer);
inputWord.addEventListener('keydown', function(e){
    if(window.event.keyCode == 13){
        if(inputWord.value.toLocaleLowerCase() === problemText.toLocaleLowerCase()){
            enterTP = true;
        }else{
            inputWord.value = "";
            enterTP = false;
        } 
    }
});

function Timer(){
    if(btnTP == 0){
        button.textContent = "초기화";
        btnTP = 1;
        nextProblem(0);
    }else{
        button.textContent = "시작하기";
        init();
        clearInterval(timerID);
    }
}

function init(){
    timeDisplay.innerHTML = "";
    scoreDisplay.innerHTML = "";
    wordDisplay.innerHTML = "문제단어";
    inputWord.value = ""
    btnTP = 0;
    timeLeft = 0;
    problemScore = 10;
    step = 0;
    enterTP = false;
}

function nextProblem(step){
    console.log("nextProblem() step : " + step);
    time = 0;
    timeLeft = jsonData[step].second;
    problemText = jsonData[step].text;
    enterTP = false;
    
    inputWord.value = ""
    timeDisplay.innerHTML = timeLeft;
    wordDisplay.innerHTML = problemText;
    scoreDisplay.innerHTML = problemScore;

    if(step >= 0 && step < jsonData.length){
        timerID = setInterval(function(){
            time++; 
            console.log("시간 time: "+time);
            timeLeft--;

            timeDisplay.innerHTML = timeLeft;
        
            if(timeLeft == 0 || enterTP == true){
                timeDisplay.innerHTML = timeLeft;
                scoreDisplay.innerHTML = problemScore;
                if(enterTP == true){
                    spendTime = spendTime + time;
                    if(step == jsonData.length-1){
                        avgTime = Math.floor(spendTime / jsonData.length);
                        console.log("평균점수 : "+ avgTime);
                    }
                }else{
                    problemScore--;
                }

                if(step == jsonData.length-1){
                    avgTime = Math.floor(spendTime / jsonData.length);
                }
                clearInterval(timerID);
                if(step != jsonData.length-1)
                    nextProblem(++step);
                else{
                    page_move('complete.html');
                }
            }
        }, 1000); 
    }
}

function page_move(url) {
    location.href=url+"?avgTime="+avgTime+"&problemScore="+problemScore;
}