var timerIntervalId;
var timerRunning=false;
var timeElapsed=0;

function init(){
  var timeDiv=document.getElementById('time');
  var recordedTimesDiv=document.getElementById('recordedTimes');

  function stopTimer(){
    timerRunning=false;
    clearInterval(timerIntervalId);
  }

  function startTimer(){
    timerRunning=true;
    timerIntervalId=setInterval(function(){
      timeElapsed+=1;
      timeDiv.innerHTML=timeElapsed/100;
    },10);
  }

  function startStop(){
    if(timerRunning){
      stopTimer();
    }else{
      startTimer();
    }
  }

  function reset(){
    stopTimer();
    timeElapsed=0;
    timeDiv.innerHTML='0.00';
    recordedTimesDiv.innerHTML='Times:</br>'
  }

  function recordTime(){
    if(timeElapsed>0){
      recordedTimesDiv.innerHTML+=timeElapsed/100+'</br>';
    }
  }

  document.getElementById('startStop').onclick=startStop;
  console.dir(document.getElementById('startStop'));
  document.getElementById('reset').onclick=reset;
  document.getElementById('record').onclick=recordTime;

  window.addEventListener('keydown',function(){
    if(event.key=='s'||event.key=='S'){
      startStop();
    }else if(event.key=='t'||event.key=='T'){
      recordTime();
    }else if(event.key=='r'||event.key=='R'){
      reset();
    }
  });
}

window.addEventListener('load', init);