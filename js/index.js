const work_form_minute = document.getElementById("work_form_minute");
const work_form_second = document.getElementById("work_form_second");
const rest_form_minute = document.getElementById("rest_form_minute");
const rest_form_second = document.getElementById("rest_form_second");
const start_stop_button = document.getElementById("start_stop_button");
const reset_button = document.getElementById("reset_button");
const display_minute =  document.getElementById("display_minute");
const display_second =  document.getElementById("display_second");
const display_status =  document.getElementById("display_status");
const apply_form_buttons = document.getElementsByClassName("apply_form");

class Timer {
    constructor(min, sec, status, timerId, posing, must_change){
        this.min = min;
        this.sec = sec;
        this.status = status; //集中: status > 0, 休憩: status < 0
        this.timerId = timerId;
        this.posing = posing; //カウントダウン中はtrue
        this.must_change = must_change
    }

    countdown(){ //00:00になるまでカウントダウンする。00:00になったらmust_changeをtrueにして、Intervalを止め、statusを0にする.
        if(this.sec != 0){ //秒が0でないときに実行
            this.sec = this.sec - 1;
        }else{ //秒が0のときに実行
            if(this.min == 0){//00:00のときの処理
                if(timer.status == 10){ //次のモード(休憩モード)の値をフォームから取得し表示を変える
                    timer.status = -10; //休憩モードの時間を取得するためにstatusを-10にする
                    confirm_form();
                    display_status.textContent = "休憩";
                    display_minute.textContent = timer.min;
                    display_second.textContent = timer.sec;
                    start_stop_button.textContent = "スタート";
                    console.log("休憩モードにする");
                }else if(timer.status == -10){ //次のモード(集中モード)の値をフォームから取得し表示を変える
                    timer.status = 10; //集中モードの時間を取得するためにstatusを10にする
                    confirm_form();
                    display_status.textContent = "集中";
                    display_minute.textContent = timer.min;
                    display_second.textContent = timer.sec;
                    start_stop_button.textContent = "スタート";
                    console.log("集中モードにする");
                }
                this.must_change = true;
                clearInterval(this.timerId);
            }else{
                this.min = this.min - 1;
                this.sec = 59;
            }
        }
    }
}

function render_time(){
        const timebox = document.getElementById("time");
        let date = new Date(); //Dateオブジェクトのインスタンスを作った時点での日時を取得できるのでインスタンス作成もIntervalに入れる
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        timebox.textContent = hour + ":" + minute + ":" + second;
        console.log("timer.status: " + timer.status);
        console.log("timer.posing: " + timer.posing);
        console.log("timer.must_change: " + timer.must_change);
        console.log("");
}

function confirm_form(){ //timerのメンバ変数をフォームに合わせる
    if(timer.status == 10){//集中モード中の時は「集中」のフォームから値を取得
        timer.min = Number(work_form_minute.value);
        timer.sec = Number(work_form_second.value);
    }else if(timer.status == -10){//休憩モード中の時は「休憩」のフォームから値を取得
        timer.min = Number(rest_form_minute.value);
        timer.sec = Number(rest_form_second.value);
    }
    console.log("confirm");
}

function handleTimer(){
    if((timer.status == 10 && !timer.posing && !timer.must_change) || (timer.status == -10 && !timer.posing && !timer.must_change)){ //集中モード中 休憩モード中
        timer.countdown();
        //タイマー表示を書き換える
        display_minute.textContent = timer.min;
        display_second.textContent = timer.sec;
        console.log("min:sec " + timer.min + ":" + timer.sec);
    }
    //console.log("handletimer");

}

function handle_clicked_start_stop_button(){
    if(timer.status == 10 && !timer.posing && timer.must_change){ //集中開始前に押された場合
        timer.status = 10; //statusを集中モードに
        timer.must_change = false;
        confirm_form(); //timerにformの時間をセット
        timer.timerId = setInterval("handleTimer()", 1000);
        start_stop_button.textContent = "ストップ";
    }else if(timer.status == 10 && !timer.posing && !timer.must_change){ //集中モード中に押された場合
        clearInterval(timer.timerId);
        timer.posing = true;
        start_stop_button.textContent = "スタート";
    }else if(timer.status == 10 && timer.posing && !timer.must_change){ //集中モード中の一時停止中に押された場合
        timer.posing = false;
        timer.timerId = setInterval("handleTimer()", 1000);
        start_stop_button.textContent = "ストップ";
    }else if(timer.status == -10 && !timer.posing && timer.must_change){ //休憩モード開始前に押された場合
        timer.status = -10; //statusを休憩モードに
        timer.must_change = false;
        confirm_form(); //timerにformの時間をセット
        timer.timerId = setInterval("handleTimer()", 1000);
        start_stop_button.textContent = "ストップ";
    }else if(timer.status == -10 && !timer.posing && !timer.must_change){ //休憩モード中に押された場合
        clearInterval(timer.timerId);
        timer.posing = true;
        start_stop_button.textContent = "スタート";
    }else if(timer.status == -10 && timer.posing && !timer.must_change){ //休憩モード中の一時停止中に押された場合
        timer.posing = false;
        timer.timerId = setInterval("handleTimer()", 1000);
        start_stop_button.textContent = "ストップ";
    }
}

function handle_clicked_reset_button(){
    
}

function handle_clicked_apply_button(){ // 集中モード、休憩モードの開始時または、一時停止中に実行できる
    if( (timer.status == 10 && !timer.posing && timer.must_change) || (timer.status == -10 && !timer.posing && timer.must_change) || (timer.status == 10 && timer.posing && !timer.must_change) || (timer.status == -10 && timer.posing && !timer.must_change) ){
        confirm_form();
        display_minute.textContent = timer.min;
        display_second.textContent = timer.sec;
    }
}

start_stop_button.addEventListener("click", handle_clicked_start_stop_button);
reset_button.addEventListener("click", handle_clicked_reset_button);
for(let i=0; i<2; i++){
    apply_form_buttons[i].addEventListener("click", handle_clicked_apply_button);
}

// timerの初期設定
const init_min = Number(work_form_minute.value)
const init_sec = Number(work_form_second.value)
const timer = new Timer(init_min, init_sec, 10, null, false, true);
//タイマー表示の初期設定
display_minute.textContent = timer.min;
display_second.textContent = timer.sec;

setInterval("render_time()", 1000);