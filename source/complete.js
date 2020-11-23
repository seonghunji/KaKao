import css from './style.css';

const sumScore = document.querySelector('#sumScore');
const avgScore = document.querySelector('#avgScore');
const reBtn = document.querySelector('#reBtn');

sumScore.innerHTML = getParam("problemScore");
avgScore.innerHTML = getParam("avgTime");

reBtn.addEventListener('click', function(){
    page_move("main.html");
});

function page_move(url) {
    location.href=url;
}

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";

    params = params.split("&");

    for (var i = 0; i < params.length; i++) {
       var temp = params[i].split("=");

        if ([temp[0]] == sname) { sval = temp[1]; }
    }

    return sval;
}