const questions = [
  {
        question: "How Many Soilders surrendered to India during Indo-Pak war in 1971?",
        options: ["87,000", "90,000", "93,000", "1,00,000"],
        correctIndex: 2
  },
  {
      question: "Which programming language is known as the language of the web?",
      options: ["Java", "Python", "JavaScript", "C++"],
      correctIndex: 2
  },
  {
      question: "Which was the first Asian city to get Electricity?",
      options: ["Delhi", "Mysore", "Beijing", "Tokyo"],
      correctIndex: 1
  },
  {
    question: "Which event has the Largest Gathering in the world?",
    options: ["Hanukkah", "Kumbh Mela", "Haj", "Vatican Christmas"],
    correctIndex: 1
  },
  {
    question: "Who invented Zero?",
    options: ["Baudhayana", "Aryabhata", "Pingala", "Brahmagupta"],
    correctIndex: 3
  },
  {
    question: "How many runs has Virat Kohli scored in List A Career?",
    options: ["13,800", "15,300", "10,500", "18,900"],
    correctIndex: 1
  },
  {
    question: "What tradition is now annually followed in tribute to Mastan?",
    options: ["Banglore Eidiga", "Bangalore Karga", "St.Mary's Procession", "Datta Petha"],
    correctIndex: 1
  }
];
const contentContainer = document.getElementById("quizcomp-container");
const ScoreContainer = document.getElementById("score-container");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextbtn = document.getElementById("next-btn");
const lifelinebtn = document.getElementById("lifeline-btn");
const restartbtn = document.getElementById("restart-btn");
const startbtn = document.getElementById("start-btn");
const messageContainer = document.getElementById("message-container");
function startQuiz() {
    startbtn.style.display = "none";
    ScoreContainer.style.display = "block";
    contentContainer.style.display = "block";
}
let score = 0;
let earnings = 0;
let currentQuestionIndex = 0;
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
        lifelinebtn.disabled = false;
        restartbtn.style.display = "none";
        contentContainer.innerHTML = `
            <div id="question-container">
                <h3 id="question">${currentQuestion.question}</h3>
            </div>
            <div id="options-container">
                ${currentQuestion.options.map((option, index) => `<button class="option" onclick="checkAnswer(${index})">${option}</button>`).join('')}
            </div>
            <button id="next-btn" onclick="nextQuestion()">Next Question</button>
            <button id="lifeline-btn" onclick="useLifeline()">50-50 Lifeline</button>`;
        const optionButtons = document.querySelectorAll(".option");
        optionButtons.forEach(button => {
            button.style.display = "inline-block";
        });
        ScoreContainer.style.display = "block";
    } else {
        contentContainer.innerHTML = `
        <div id="quizcomp-container">
        <h3><strong>Quiz completed!</strong><strong>Your earning: <span id="final-earning">${earnings}</span></strong></h3>
        </div>
        `;
    }
}
function useLifeline() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("lifeline-btn").disabled = true;
    const correctOptionIndex = currentQuestion.correctIndex;
    const incorrectOptions = Array.from({ length: currentQuestion.options.length }, (_, index) => index)
        .filter(index => index !== correctOptionIndex);
    const indexToKeep = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
    const indicesToRemove = Array.from({ length: currentQuestion.options.length }, (_, index) => index)
        .filter(index => index !== correctOptionIndex && index !== indexToKeep);
    const optionButtons = document.querySelectorAll(".option");
     indicesToRemove.forEach(index => {
        optionButtons[index].style.display = "none";
    });
}
function checkAnswer(optionIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach(button => button.disabled = true);
  if (optionIndex === currentQuestion.correctIndex) {
      optionButtons[optionIndex].classList.add("correct");
      score++;
      earnings += 1000;
      document.getElementById("earnings").innerText = earnings;
  } else {
      optionButtons[optionIndex].classList.add("wrong");
      optionButtons[currentQuestion.correctIndex].classList.add("correct");
      const messageContainer = document.getElementById("message-container");
      messageContainer.style.display="block";
  }
  document.getElementById("score").innerText = score;
}
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    earnings = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("earnings").innerText = earnings;
    loadQuestion();
}
function nextQuestion() {
  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove("correct", "wrong");
    });
  currentQuestionIndex++;
  messageContainer.style.display="none";
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        const completionContainer = document.getElementById("quizcomp-container");
        ScoreContainer.style.display = "none";
        const star = score === questions.length ? '⭐' : '⭐';
        completionContainer.innerHTML = `
            <p><strong>Quiz completed!</strong></p>
            <p>${star}<strong>Your earning: $${earnings}</strong> ${star}</p>
            <button id="restart-btn" onclick="restartQuiz()">Restart Quiz</button>
            `;
    }
}
loadQuestion();