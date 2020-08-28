const containerToFill = document.getElementById('containerToFill');
let filters = document.querySelectorAll('#filter');
console.log(filters);
let familie = false;

fetch('/entries.json')
  .then(res => res.json())
  .then((data) => {
    console.log(data.items);
    for(content of data.items){
        containerToFill.insertAdjacentHTML('afterbegin', 
        `<div id="voorstelling">
        <h3>${undefinedFilter(content['name'])}</h3>
            <p>${undefinedFilter(content['excerpt'])}</p>
            <p>${undefinedFilter(content['recorded-at'])}</p>
            <p>${undefinedFilter(content['video-length'])}</p>
        </div>`);        
    }
    
});

console.log(containerToFill);


let undefinedFilter = (data)  =>  {
    if(data == undefined){
        let emptyString = '<br>';
        return emptyString;
    }else{
        return data;
    };
};


for(button of filters){
    button.onclick= function(){
        eval(this.textContent) = true;
        console.log(eval(this.textContent));
    };
};