const img_cats = document.getElementById("img_cats");
const neko_button = document.getElementById("neko_button");

async function get_cats(){
    console.log("neko");
    const response = await fetch("https://aws.random.cat/meow");
    let json;
    if(response.ok){
        json = await response.json();
    }else{
        console.log("猫画像取得に失敗しました");
    }
    try{
        img_cats.src = json["file"];
    } catch(e){
        console.log(e.message);
    }
}

function control_neko(event){
    console.log(event);
    if(event.target.textContent == "猫非表示"){
        img_cats.style.display = "none";
        event.target.textContent = "猫表示"
    } else if(event.target.textContent == "猫表示"){
        img_cats.style.display = "block";
        event.target.textContent = "猫非表示"
    }
}

neko_button.addEventListener("click", control_neko);

get_cats(); //初期表示
setInterval("get_cats()", 60000 * 10);