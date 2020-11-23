var jsonData;
var url = "https://my-json-server.typicode.com/kakaopay-fe/resources/words";

document.addEventListener("DOMContentLoaded", function() {
	getData();
});
  
function getData(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                jsonData = JSON.parse(xhr.response);
            }
        }
    };
    xhr.open('GET', url);
    xhr.send();
}

export { jsonData };