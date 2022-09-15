//all required elements
const start = document.querySelector(".start button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

var max_time = 30;
var cinterval;

function countdown_timer(){
    max_time--;
    document.getElementById('timer_sec').innerHTML = max_time;
    if(max_time == 0){
        clearInterval(cinterval);
    }
}

cinterval = setInterval('countdown_timer()', 1000);
start.onclick = () => {
    info_box.classList.add("activeInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
    startTimer(10);
    startTimerLine(0);
}
let timeValue = 10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}
// getting questions and options from array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if (userAns == correcAns) {
        userScore += 1;
        answer.classList.add("correct");
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        console.log("Wrong Answer");
        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");

    function showResult() {
        info_box.classList.remove("activeInfo");
        quiz_box.classList.remove("activeQuiz");
        result_box.classList.add("activeResult");
        const scoreText = result_box.querySelector(".score_text");
        if (userScore > 3) {
            let scoreTag = '<span>Congrats! , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        else if (userScore > 1) {
            let scoreTag = '<span>Nice , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        else {
            let scoreTag = '<span>Unfortunately you only got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
    }
    function startTimer(time) {
        counter = setInterval(timer, 1000);
        function timer() {
            timeCount.textContent = time;
            time--;
            if (time < 9) {
                let addZero = timeCount.textContent;
                timeCount.textContent = "0" + addZero;
            }
            //if time runs out on a question
            if (time < 0) {
                clearInterval(counter);
                const allOptions = option_list.children.length;
                let correcAns = questions[que_count].answer;
                for (i = 0; i < allOptions; i++) {
                    if (option_list.children[i].textContent == correcAns) {
                        option_list.children[i].setAttribute("class", "option correct");
                        console.log("Time Off: Auto selected correct answer.");
                    }
                }
                for (i = 0; i < allOptions; i++) {
                    option_list.children[i].classList.add("disabled");
                }
                next_btn.classList.add("show");
            }
        }
    }
    function startTimerLine(time) {
        counterLine = setInterval(timer, 29);
        function timer() {
            time += 1;
            if (time > 549) {
                clearInterval(counterLine);
            }
        }
    }
    function queCounter(index) {
        let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
        bottom_ques_counter.innerHTML = totalQueCounTag;
    }
}
