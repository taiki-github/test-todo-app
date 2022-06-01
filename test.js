
const form = document.getElementById("form");
const input =document.getElementById("input");
const ul =document.getElementById("ul");
const todos = JSON.parse( localStorage.getItem("todos"));



//let,varは再代入可能 constは再代入不可
//document.getElementById("ul")はhtmlのulの値をもらう




if(todos){
    todos.forEach(todo=>{
      
        add(todo);
    });
}

form.addEventListener("submit",function(event)
{
    event.preventDefault();

add();
});





function add(todo){

    let text = input.value;
    //後で引数のaもつかうことになるからinputは直接使わない
   
 if(todo){
     text=todo.text;
 }

    if(text){
 //if(text)でもいい。空文字＝falseだから

 const li = document.createElement("li");
 //liタグを生成する
 li.innerText = text;
 // liタグのテキストの内容を変える
   li.classList.add("list-group-item");

   if(todo&&todo.line){
       //ここで&&を入れないとエラーになる。なぜか

       li.classList.add("text-decoration-line-through");
   }

 li.addEventListener("contextmenu",function(event){
    event.preventDefault();
    li.remove();
    save();
    });
//生成したliタグにeventを追加する。ここでないと新しいものに反映されない
 

li.addEventListener("click",function(event){
    
    li.classList.toggle("text-decoration-line-through");
   //classlist.でタグのクラスにアクセス
   //toggleは反対にする。追加はadd
   save();
});


 ul.appendChild(li);
 //appendChild で　liタグを一番下に追加する
 //createElementでは作っているだけここで初めてサイトに追加される

 input.value  ="";
 save();
    }
}




function save(){
    const lists = document.querySelectorAll("li");
    let todos=[];
    lists.forEach(list=>{
        
     let todo ={
         text: list.innerText,
         line: list.classList.contains("text-decoration-line-through")
     };
        //ここでのlistは新しい配列の入れ物みたいな感じ
        todos.push(todo);
      //データを保存するときは一度配列に入れなおしたほうがいいっぽい
    });

      localStorage.setItem("todos",JSON.stringify(todos));
    //("保存のファイルの名前",保存したいもの)
    //aaaのところは名前　JSONにしたほうが都合がいい

}





