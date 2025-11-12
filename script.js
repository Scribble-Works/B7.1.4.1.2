document.addEventListener('DOMContentLoaded', () => {

    const quizData = [
        // 1. Calculation: 180 km in 3 hours. Rate = 60 km/hour.
        { q: "1. A car travels 180 km in 3 hours. What is the unit rate of speed?", 
          a: '60 km/hour', 
          options: ['180 km/hour', '30 km/hour', '60 km/hour', '3 km/hour'], 
          r: 'Calculation: 180 km ÷ 3 hours = 60 km/hour. The unit rate compares distance to 1 unit of time.' },
        
        // 2. Calculation: 75 GHS for 5 kg. Rate = 15 GHS/kg.
        { q: "2. A bag of rice costs GHS 75 for 5 kg. What is the unit price?", 
          a: 'GHS 15/kg', 
          options: ['GHS 15/kg', 'GHS 75/kg', 'GHS 5/kg', 'GHS 375/kg'], 
          r: 'Calculation: GHS 75 ÷ 5 kg = GHS 15/kg. This is the cost for 1 kilogram.' },
        
        // 3. Calculation: 600 words in 12 minutes. Rate = 50 words/minute.
        { q: "3. A typist types 600 words in 12 minutes. What is the typing rate?", 
          a: '50 words/minute', 
          options: ['12 words/minute', '60 words/minute', '50 words/minute', '7200 words/minute'], 
          r: 'Calculation: 600 words ÷ 12 minutes = 50 words/minute.' },

        // 4. Calculation: 128 GHS for 8 liters. Rate = 16 GHS/liter.
        { q: "4. 8 liters of fuel cost GHS 128. What is the cost per liter?", 
          a: 'GHS 16/liter', 
          options: ['GHS 128/liter', 'GHS 16/liter', 'GHS 8/liter', 'GHS 10/liter'], 
          r: 'Calculation: GHS 128 ÷ 8 liters = GHS 16/liter.' },
        
        // 5. Calculation: 4 cups water for 2 cups powder. Rate = 2 cups water/cup powder.
        { q: "5. A recipe uses 4 cups of water for every 2 cups of powder. What is the unit rate of water to powder?", 
          a: '2 cups water/cup powder', 
          options: ['1/2 cup water/cup powder', '4 cups water/cup powder', '2 cups water/cup powder', '8 cups water/cup powder'], 
          r: 'Calculation: 4 cups ÷ 2 cups = 2. The unit rate is 2 cups of water for every 1 cup of powder.' },
        
        // 6. Language: GHS 5 per mango.
        { q: "6. The unit rate for mangoes is GHS 5 per mango. The cost of mangoes is GHS 5 ___ mango.", 
          a: 'per', 
          options: ['times', 'more than', 'per', 'in 5'], 
          r: 'The word ' + "**per**" + ' is standard rate language used to associate the rate with the second unit.' },
        
        // 7. Language: 20 mL/minute.
        { q: "7. A water tap leaks at a rate of 20 mL/minute. The tap loses 20 mL of water ___ minute.", 
          a: 'in every', 
          options: ['in every', 'at the beginning of', 'multiplied by', 'only in the first'], 
          r: 'The phrase ' + "**in every**" + ' minute is common rate language that defines the comparison to the single unit of time.' },
        
        // 8. Concept: Rate definition.
        { q: "8. A unit rate $a/b$ is defined as the comparison to ___ of the second quantity.", 
          a: 'one unit', 
          options: ['the total', 'one unit', 'the numerator', 'the difference'], 
          r: 'A unit rate (a/b) always defines the first quantity (a) in terms of **one unit** of the second quantity (b).' },
        
        // 9. Concept: Comparing unit prices.
        { q: "9. Shop A's unit price is GHS 4.50/pack. Shop B's is GHS 4.00/pack. Shop B offers the ___ unit price.", 
          a: 'lower', 
          options: ['higher', 'same', 'lower', 'multiplied'], 
          r: 'Unit rates allow for direct comparison. GHS 4.00 is numerically smaller than GHS 4.50, so it is the lower price.' },
        
        // 10. Language: 0.5 baskets/person.
        { q: "10. A cocoa harvesting rate is 0.5 baskets/person. This means that ___ person harvests half a basket.", 
          a: 'for each', 
          options: ['total', 'half', 'for each', 'all of the'], 
          r: 'The phrase ' + "**for each**" + ' person is correct rate language to describe the quantity associated with a single unit (person).' }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    const pointsPerQuestion = 10;

    const elements = {
        startScreen: document.getElementById('start-screen'),
        quizArea: document.getElementById('quiz-area'),
        gameOverScreen: document.getElementById('game-over-screen'),
        startButton: document.getElementById('start-button'),
        restartButton: document.getElementById('restart-button'),
        questionText: document.getElementById('question-text'),
        qCounter: document.getElementById('q-counter'),
        currentScore: document.getElementById('current-score'),
        finalScore: document.getElementById('final-score'),
        optionsContainer: document.getElementById('options-container'),
        rationaleDisplay: document.getElementById('rationale-display'),
        nextButton: document.getElementById('next-button')
    };

    function displayQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            endGame();
            return;
        }

        const qData = quizData[currentQuestionIndex];
        
        // Update display elements
        elements.questionText.textContent = qData.q;
        elements.qCounter.textContent = currentQuestionIndex + 1;
        elements.currentScore.textContent = score;

        // Populate options
        elements.optionsContainer.innerHTML = '';
        qData.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'answer-button';
            button.dataset.answer = option;
            button.addEventListener('click', handleAnswerClick);
            elements.optionsContainer.appendChild(button);
        });

        // Reset elements for the new question
        elements.rationaleDisplay.style.display = 'none';
        elements.nextButton.style.display = 'none';
    }

    function handleAnswerClick(event) {
        const userAnswer = event.target.dataset.answer;
        checkAnswer(userAnswer);
    }

    function checkAnswer(userAnswer) {
        const qData = quizData[currentQuestionIndex];
        const isCorrect = userAnswer === qData.a;

        // Disable all buttons once an answer is chosen
        document.querySelectorAll('.answer-button').forEach(button => {
            button.disabled = true;
            // Highlight the correct and chosen answers
            if (button.dataset.answer === qData.a) {
                button.style.backgroundColor = '#28a745'; // Green for correct answer
            } else if (button.dataset.answer === userAnswer) {
                button.style.backgroundColor = '#cc0000'; // Red for wrong answer
            }
        });

        // Update score and show rationale
        elements.rationaleDisplay.textContent = qData.r;
        elements.rationaleDisplay.className = isCorrect ? 'rationale-text correct-rationale' : 'rationale-text incorrect-rationale';
        elements.rationaleDisplay.style.display = 'block';

        if (isCorrect) {
            score += pointsPerQuestion;
            elements.currentScore.textContent = score;
        }
        
        // Show Next button
        elements.nextButton.style.display = 'block';
    }

    function startGame() {
        // Reset state
        currentQuestionIndex = 0;
        score = 0;
        
        // Switch screens
        elements.startScreen.style.display = 'none';
        elements.gameOverScreen.style.display = 'none';
        elements.quizArea.style.display = 'block';

        displayQuestion();
    }

    function nextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    function endGame() {
        // Switch screens
        elements.quizArea.style.display = 'none';
        elements.gameOverScreen.style.display = 'block';
        
        // Display final score
        elements.finalScore.textContent = score;
    }

    // --- Event Listeners ---
    elements.startButton.addEventListener('click', startGame);
    elements.restartButton.addEventListener('click', startGame);
    elements.nextButton.addEventListener('click', nextQuestion);
});