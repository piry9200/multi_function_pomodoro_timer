const form_minute = document.getElementById("form_minute");
const form_second = document.getElementById("form_second");
const start_button = document.getElementById("start_button");
const stop_button = document.getElementById("stop_button");
const reset_button = document.getElementById("reset_button");
const minute_part =  document.getElementById("minute");
const second_part =  document.getElementById("second");

class Timer {
    constructor(min, sec){
        this.min = min;
        this.sec = sec;
    }

    countdown_Min(){
        this.min = this.min - 1;
    }

    countdown_Sec(){
        if(this.sec != 0){
            this.sec = this.sec - 1;
        }else{
            this.sec = 59;
        }
    }
}

let timerId = null; //カウントダウン処理のインターバル関数ID用のグローバル関数
let is_countdowning = false;
const init_min = Number(form_minute.value)
const init_sec = Number(form_second.value)
const timer = new Timer(init_min, init_sec);

function render_time(){ //引数に書き換えるDOM要素を渡す
        const timebox = document.getElementById("time");
        let date = new Date(); //Dateオブジェクトのインスタンスを作った時点での日時を取得できるのでインスタンス作成もIntervalに入れる
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        timebox.textContent = hour + ":" + minute + ":" + second;
}

function update_minute(){ //表示する分をフォームに合わせる
    if(!is_countdowning){
        minute_part.textContent = Number(form_minute.value);
    }
}

function update_second(){ //表示する秒をフォームに合わせる
    if(!is_countdowning){
        second_part.textContent = Number(form_second.value);
    }
}
function countdown(){
    is_countdowning = true;
    timerId = setInterval(() => {
        if(timer.sec != 0){
            timer.countdown_Sec()
            if(timer.sec < 10){
                second_part.textContent = "0" + timer.sec;
            } else{
                second_part.textContent = timer.sec;
            }
            console.log(timer.min + " " + timer.sec);
        }else{
            if(timer.min == 0){
                clearInterval(timerId);
                is_countdowning = false;
            }else{
                timer.countdown_Min();
                timer.countdown_Sec();
                if(timer.min > 10){
                    minute_part.textContent = timer.min;
                    second_part.textContent = timer.sec;
                }else{
                    minute_part.textContent = "0" + timer.min;
                    second_part.textContent = timer.sec;
                }
                
            }
        }
        console.log("Interval");
        console.log(timer.sec);
    },1000)
};

function handle_clicked_start_button(){
    if(!is_countdowning){
        timer.min = Number(form_minute.value);
        timer.sec = Number(form_second.value);
        countdown(timer);
    }
}

function handle_clicked_stop_button(){
    if(timerId != null){
        clearInterval(timerId);
        is_countdowning = false;
        timerId = null;
        console.log(timer);
        console.log(timer.min + " test " + timer.sec);
    }
    else{
        countdown(timer);    
    }
    console.log(timerId);
}

function handle_clicked_reset_button(){
    if(timerId != null){
        clearInterval(timerId);
        is_countdowning = false;
        timerId = null;
        timer.min = Number(form_minute.valu);
        timer.sec = Number(form_second.value);
        minute_part.textContent = form_minute.value;
        second_part.textContent = form_second.value;
    }else{
        timer.min = Number(form_minute.valu);
        timer.sec = Number(form_second.value);
        minute_part.textContent = form_minute.value;
        second_part.textContent = form_second.value;
    }
}

form_minute.addEventListener("input", update_minute);
form_second.addEventListener("input", update_second);
start_button.addEventListener("click", handle_clicked_start_button);
stop_button.addEventListener("click", handle_clicked_stop_button);
reset_button.addEventListener("click", handle_clicked_reset_button);

setInterval("render_time()", 1000);