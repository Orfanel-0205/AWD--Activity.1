const questions = [
    {
        question: "Who invented the Computer?",
        answers: [
            { text: "Warlito", correct: false },
            { text: "Rudy Baldwin", correct: false },
            { text: "Charles Babbage", correct: true },
            { text: "Lebron James", correct: false },
        ]
    },
    {
        question: "Who is the greatest basketball player of all time?",
        answers: [
            { text: "Arwind Santos", correct: false },
            { text: "Haring Manggi", correct: true },
            { text: "Aklas", correct: false },
            { text: "Lebron James", correct: false },
        ]
    },
    {
        question: "Who is the first President of the Philippines?",
        answers: [
            { text: "Manuel Quezon", correct: false },
            { text: "Emilio Aguinaldo", correct: true },
            { text: "Jose Rizal", correct: false },
            { text: "Andres Bonifacio", correct: false },
        ]
    },
    {
        question: "Who quoted this 学而不思则罔，思而不学则殆 ?",
        answers: [
            { text: "Confucius", correct: true},
            { text: "Loonie", correct: false},
            { text: "Lin Zexu", correct: false},
            { text: "Ma Pang Hee", correct: false},
        ] 
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again?") {
        startQuiz(); // Restart the quiz
    } else {
        handleNextButton(); // Move to the next question
    }
});

startQuiz();
