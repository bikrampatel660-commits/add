const quizData = [
    { question: "Which language runs in the browser?", options: ["Python", "JavaScript", "C++", "Java"], answer: "JavaScript" },
    { question: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style System", "Code Styling Standard", "Color Style Sheet"], answer: "Cascading Style Sheets" },
    { question: "HTML is used for?", options: ["Programming", "Website Structure", "Database", "Hardware"], answer: "Website Structure" },
    { question: "Which tag is the largest heading in HTML?", options: ["<h6>", "<h1>", "<p>", "<title>"], answer: "<h1>" },
    { question: "Which is NOT a programming language?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML" },
    { question: "Which company developed Java?", options: ["Google", "Oracle", "Sun Microsystems", "Microsoft"], answer: "Sun Microsystems" },
    { question: "Which symbol is used for comments in JavaScript?", options: ["//", "<!-- >", "#", "**"], answer: "//" },
    { question: "Bootstrap is a framework for?", options: ["Cybersecurity", "Frontend Styling", "Networking", "Database"], answer: "Frontend Styling" }
];

let currentIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-box").style.display = "block";
    loadQuiz();
}

function loadQuiz() {
    document.getElementById("progress").innerText = `Question ${currentIndex + 1} of ${quizData.length}`;
    document.getElementById("question").innerText = quizData[currentIndex].question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    quizData[currentIndex].options.forEach(option => {
        optionsDiv.innerHTML += `
            <label class="option">
                <input type="radio" name="answer" value="${option}"> ${option}
            </label>
        `;
    });
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        alert("⛔ Please select an answer before continuing!");
        return;
    }

    if (selectedOption.value === quizData[currentIndex].answer) score++;

    currentIndex++;

    if (currentIndex < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("result-box").style.display = "block";
    document.getElementById("score").innerText = `You scored: ${score} / ${quizData.length}`;
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    document.getElementById("result-box").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}
