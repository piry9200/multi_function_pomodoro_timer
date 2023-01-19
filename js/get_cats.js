const img_cats = document.getElementById("img_cats");

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
get_cats(); //初期表示
setInterval("get_cats()", 60000);