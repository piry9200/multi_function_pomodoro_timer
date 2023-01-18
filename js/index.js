const form_minute = document.getElementById("form_minute");
const form_second = document.getElementById("form_second");
const start_button = document.getElementById("start_button");
const stop_button = document.getElementById("stop_button");
const reset_button = document.getElementById("reset_button");
const minute_part =  document.getElementById("minute");
const second_part =  document.getElementById("second");

let timerId = null; //カウントダウン処理のインターバル関数ID用のグローバル関数
var min; //カウントダウン処理の分をいれるグローバル変数
var sec; //カウントダウン処理の秒をいれるグローバル変数

function render_time(){ //引数に書き換えるDOM要素を渡す
    const timebox = document.getElementById("time");
    let date = new Date(); //Dateオブジェクトのインスタンスを作った時点での日時を取得できるのでインスタンス作成もIntervalに入れる
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    timebox.textContent = hour + ":" + minute + ":" + second;
}

function update_minute(){
    minute_part.textContent = Number(form_minute.value)
}

function update_second(){
    second_part.textContent = Number(form_second.value)
}
function countdown(min, sec){
    timerId = setInterval(() => {
        if(sec != 0){
            sec = sec - 1;
            if(sec < 10){
                second_part.textContent = "0" + sec;
            } else{
                second_part.textContent = sec;
            }
            
        }else{
            if(min == 0){
                clearInterval(timeId);
            }else{
                console.log("koko");
                min = min - 1;
                sec = 59;
                if(min > 10){
                    minute_part.textContent = min;
                    second_part.textContent = sec;
                }else{
                    minute_part.textContent = "0" + min;
                    second_part.textContent = sec;
                }
                
            }
        }
        console.log("Interval");
        console.log(sec);
    },1000)
};

function handle_cliked_start_button(){
    min = Number(form_minute.value);
    sec = Number(form_second.value);
    countdown(min,sec);
}

function handle_cliked_stop_button(){
    if(timerId != null){
        clearInterval(timerId);
        timerId = null;
        console.log(min + "test " + sec);
    }
    else{
        countdown(min,sec)    
    }
    console.log(timerId);
}

form_minute.addEventListener("input", update_minute);
form_second.addEventListener("input", update_second);
start_button.addEventListener("click", handle_cliked_start_button);
stop_button.addEventListener("click", handle_cliked_stop_button);
//reset_button.addEventListener("click", handle_cliked_reset_button);

setInterval("render_time()", 1000);