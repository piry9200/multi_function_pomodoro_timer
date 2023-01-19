const todo_input =  document.getElementById("todo_input");
const todo_add_button = document.getElementById("todo_add_button");
const content_box = document.getElementById("content_box");

function push_to_todo(event){ //inputに書かれた文をtodoリストに入れる
    if(event.type == "click" || event.keyCode == 13){ //追加ボタンまたはエンターキーが押されたときに実行
        const content = todo_input.value;
        // li要素を新しく作る
        const new_li = document.createElement("li");
        new_li.textContent = content;
        // 削除用のbuttonタグを新しく作る
        const delete_button = document.createElement("button");
        delete_button.textContent = "削除";
        delete_button.addEventListener("click",delete_content);
        //liの子要素に削除用ボタンを追加
        new_li.appendChild(delete_button);
        //ulの子要素の一番後ろに追加
        content_box.appendChild(new_li);
        todo_input.value = "";
    }
}

function delete_content(event){//li要素を削除する
    (event.currentTarget.parentElement.parentElement).removeChild(event.currentTarget.parentElement);
}


todo_add_button.addEventListener("click", push_to_todo);
todo_input.addEventListener("keypress", push_to_todo);