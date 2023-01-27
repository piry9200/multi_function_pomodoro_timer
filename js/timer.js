const work_form_minute = document.getElementById("work_form_minute");
const work_form_second = document.getElementById("work_form_second");
const rest_form_minute = document.getElementById("rest_form_minute");
const rest_form_second = document.getElementById("rest_form_second");
const start_stop_button = document.getElementById("start_stop_button");
const reset_button = document.getElementById("reset_button");
const mode_change_button = document.getElementById("mode_change_button");
const display_minute =  document.getElementById("display_minute");
const display_second =  document.getElementById("display_second");
const display_status =  document.getElementById("display_status");
const apply_form_buttons = document.getElementsByClassName("apply_form");
const sound = new Audio("../sounds/チーン.mp3");

class Timer {
    constructor(min, sec, status, timerId, posing, must_change){
        this.min = min; //分を保持するメンバ変数
        this.sec = sec; //秒を保持するメンバ変数
        this.status = status; //状態を保持する( =10: 集中,  =-10: 休憩)
        this.timerId = timerId; //countdownに使っているIntervalのIDを保持
        this.posing = posing; //一時停止中かどうかをブーリアン値で保持 
        this.must_change = must_change //モードチェンジすべきかどうかをブーリアン値で保持 また集中モード、休憩モード開始前もtrue
    }

    countdown(){ //メンバ変数 min==0, sec=0になるまでカウントダウンする。00:00になったらモードをチェンジする
        if(this.sec != 0){ //秒が0でないときに実行
            this.sec = this.sec - 1;
        }else{ //秒が0のときに実行
            if(this.min == 0){ //00:00のときの処理
                sound.play(); //ベルを鳴らす
                this.mode_change();
            }else{
                this.min = this.min - 1;
                this.sec = 59;
            }
        }
    }

    inquire_form(){ //timerのメンバ変数 min, secをフォームの数値に合わせる
        if(this.status == 10){//集中モード中の時は「集中」のフォームから値を取得
            this.min = work_form_minute.value;
            this.sec = work_form_second.value;
        }else if(this.status == -10){//休憩モード中の時は「休憩」のフォームから値を取得
            this.min = rest_form_minute.value;
            this.sec = rest_form_second.value;
        }
    }

    display_timer(){ //timerをhtmlに表示させる
        if(this.status == 10){
            display_status.textContent = "WORKING";
            display_minute.textContent = this.min;
            display_second.textContent = this.sec;
        }else if(this.status == -10){
            display_status.textContent = "RESTING";
            display_minute.textContent = this.min;
            display_second.textContent = this.sec;
        }
    }

    mode_change(){ //モードを切り替える
        if(this.status == 10){ //集中モードのとき
            this.status = -10; //休憩モードへ移行
        }else if(this.status == -10){ //休憩モードのとき
            this.status = 10; //集中モードへ移行
        }
        change_background_color(); //背景色を変更
        this.inquire_form(); //時間を取得
        this.display_timer(); //時間をhtmlに表示
        start_stop_button.textContent = "スタート";
        this.must_change = true;
        this.posing = false;
        clearInterval(this.timerId);
    }
}

function render_time(){
        const timebox = document.getElementById("time");
        let date = new Date(); //Dateオブジェクトのインスタンスを作った時点での日時を取得できるのでインスタンス作成もIntervalに入れる
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        timebox.textContent = hour + ":" + minute + ":" + second;
}

function handleTimer(){
    if((timer.status == 10 && !timer.posing && !timer.must_change) || (timer.status == -10 && !timer.posing && !timer.must_change)){ //集中モード中 休憩モード中
        timer.countdown();
        //タイマー表示を書き換える
        timer.display_timer();
    }

}

function handle_clicked_start_stop_button(){
    if(timer.status == 10 && !timer.posing && timer.must_change){ //集中開始前に押された場合
        timer.status = 10; //statusを集中モードに
        timer.must_change = false;
        timer.inquire_form(); //timerにformの時間をセット
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
        timer.inquire_form(); //timerにformの時間をセット
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
    timer.must_change = true;
    timer.posing = false;
    start_stop_button.textContent = "スタート";
    clearInterval(timer.timerId);
    timer.inquire_form();
    timer.display_timer()
}

function handle_clicked_mode_change_button(){ // 集中モード、休憩モードの開始時または、一時停止中に実行できる
    if( (timer.status == 10 && !timer.posing && timer.must_change) || (timer.status == -10 && !timer.posing && timer.must_change) || (timer.status == 10 && timer.posing && !timer.must_change) || (timer.status == -10 && timer.posing && !timer.must_change) ){
        timer.mode_change();

    }
}

function handle_clicked_apply_button(){ // 集中モード、休憩モードの開始時または、一時停止中に実行できる
    if( (timer.status == 10 && !timer.posing && timer.must_change) || (timer.status == -10 && !timer.posing && timer.must_change) || (timer.status == 10 && timer.posing && !timer.must_change) || (timer.status == -10 && timer.posing && !timer.must_change) ){
        timer.inquire_form();
        timer.display_timer();
    }
}

function change_background_color(){
    if(timer.status == 10){ //集中モード中のとき,背景を赤に変える
        document.body.style.backgroundColor = "rgb(211, 165, 170)";
        document.getElementById("translator").style.backgroundColor = "rgb(223, 177, 182)";
        document.getElementById("todo").style.backgroundColor = "rgb(223, 177, 182)";
        document.getElementById("cats").style.backgroundColor = "rgb(223, 177, 182)";
    } else if(timer.status == -10){ //集中モード中のとき,背景を赤に変える
        document.body.style.backgroundColor = "rgb(165, 203, 211)";
        document.getElementById("translator").style.backgroundColor = "rgb(178, 218, 226)";
        document.getElementById("todo").style.backgroundColor = "rgb(178, 218, 226)";
        document.getElementById("cats").style.backgroundColor = "rgb(178, 218, 226)";
    }
}

//　イベントを仕込む
start_stop_button.addEventListener("click", handle_clicked_start_stop_button);
reset_button.addEventListener("click", handle_clicked_reset_button);
mode_change_button.addEventListener("click", handle_clicked_mode_change_button);
for(let i=0; i<2; i++){
    apply_form_buttons[i].addEventListener("click", handle_clicked_apply_button);
}

// timerの初期設定
const init_min = work_form_minute.value
const init_sec = work_form_second.value
const timer = new Timer(init_min, init_sec, 10, null, false, true);
//タイマー表示の初期設定
timer.display_timer()

setInterval("render_time()", 1000);