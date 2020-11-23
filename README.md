GitHub URL : https://github.com/seonghunji/KaKao/

# 해결전략
* 파일구성
1. main.html(+js) : 게임 시작 화면
2. complete.html(+js) : 게임 완료 화면
3. data.js : 단어 받아오는 파일
4. style.css : 스타일시트
5. package.json : script 수정(build, start)
6. webpack.config.js : webpack dev server 설정파일

***

* webpack을 이용한 번들링(/public)

[bundling files]
1. main.html (./source/main.js, ./source/data.js, style.css) -> main_bundle.js
2. complete.html (./source/complete.js, style.css) -> complete_bundle.js

[loader]
1. style-loader : 스타일 적용
2. css-loader : *.css 번들링

[plugins]
1. HtmlWebpackPlugin : HTML 파일 번들링

***

* 로직설명

[main.html - 게임시작]
1. 게임시작하기 버튼을 누르면 addEventListener click  이벤트를 사용하여 Timer 함수 실행
2. 시작하기, 초기화 버튼을 누를때마다 btnTP 값을 구분하여 저장 후 분기처리
3. 시작하기 문구가 있는 버튼을 누르면 nextProblem(0)함수 수행
4. nextProblem 함수에서 data.js에서 받아온 jsonData의 시간, 단어 저장(step은 json객체의 index번호)
5. setInteval 함수를 사용하여 각 문제가 주어진 timeLeft(시간) 만큼 1초씩 감소하고, 각각의 문제가 걸리는 시간을 위해 time(소요시간)을 +1씩 증가
6. (마지막 단계가 아닌 경우) timeLeft 값이 0이면(시간 초과) problemScore(점수) 1점 감소, setInterval 중지, nextProblem(++step) 으로 다음문제 수행
7. (마지막 단계인 경우) avgTime 변수를 이용하여 정답 맞춘 평균 시간 계산, 완료화면으로 이동
8. (문제가 맞는 경우) 문제를 맞추면 spendTime 변수를 이용하여 누적 합산(spendTime + step)

[complete.html - 완료화면]
1. getParam()함수를 이용하여 URL을 읽어오고 파라미터로 전달받은 problemScore(점수), avgTime(평균시간) 변수를 화면에 표시
2. 다시시작 버튼을 누르면 main.html 화면으로 이동

***

* 화면이동 - location.href 사용
1. location.href를 사용하여 화면 전환 수행
2. location.search를 사용하여 URL의 파라미터값을 파싱

***
 
   
