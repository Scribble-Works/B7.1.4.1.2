document.addEventListener('DOMContentLoaded', () => {
    // Quiz questions data
    const quizData = [
        { 
            q: "1. A car travels 180 km in 3 hours. What is the unit rate of speed?", 
            a: '60 km/hour', 
            options: ['180 km/hour', '30 km/hour', '60 km/hour', '3 km/hour'], 
            r: 'Calculation: 180 km ÷ 3 hours = 60 km/hour. The unit rate compares distance to 1 unit of time.' 
        },
        { 
            q: "2. A bag of rice costs GHS 75 for 5 kg. What is the unit price?", 
            a: 'GHS 15/kg', 
            options: ['GHS 15/kg', 'GHS 75/kg', 'GHS 5/kg', 'GHS 375/kg'], 
            r: 'Calculation: GHS 75 ÷ 5 kg = GHS 15/kg. This is the cost for 1 kilogram.' 
        },
        { 
            q: "3. A typist types 600 words in 12 minutes. What is the typing rate?", 
            a: '50 words/minute', 
            options: ['12 words/minute', '60 words/minute', '50 words/minute', '7200 words/minute'], 
            r: 'Calculation: 600 words ÷ 12 minutes = 50 words/minute.' 
        },
        { 
            q: "4. 8 liters of fuel cost GHS 128. What is the cost per liter?", 
            a: 'GHS 16/liter', 
            options: ['GHS 128/liter', 'GHS 16/liter', 'GHS 8/liter', 'GHS 10/liter'], 
            r: 'Calculation: GHS 128 ÷ 8 liters = GHS 16/liter.' 
        },
        { 
            q: "5. A recipe uses 4 cups of water for every 2 cups of powder. What is the unit rate of water to powder?", 
            a: '2 cups water/cup powder', 
            options: ['1/2 cup water/cup powder', '4 cups water/cup powder', '2 cups water/cup powder', '8 cups water/cup powder'], 
            r: 'Calculation: 4 cups ÷ 2 cups = 2. The unit rate is 2 cups of water for every 1 cup of powder.' 
        },
        { 
            q: "6. The unit rate for mangoes is GHS 5 per mango. The cost of mangoes is GHS 5 ___ mango.", 
            a: 'per', 
            options: ['times', 'more than', 'per', 'in 5'], 
            r: 'The word **per** is standard rate language used to associate the rate with the second unit.' 
        },
        { 
            q: "7. A water tap leaks at a rate of 20 mL/minute. The tap loses 20 mL of water ___ minute.", 
            a: 'in every', 
            options: ['in every', 'at the beginning of', 'multiplied by', 'only in the first'], 
            r: 'The phrase **in every** minute is common rate language that defines the comparison to the single unit of time.' 
        },
        { 
            q: "8. A unit rate $a/b$ is defined as the comparison to ___ of the second quantity.", 
            a: 'one unit', 
            options: ['the total', 'one unit', 'the numerator', 'the difference'], 
            r: 'A unit rate (a/b) always defines the first quantity (a) in terms of **one unit** of the second quantity (b).' 
        },
        { 
            q: "9. Shop A's unit price is GHS 4.50/pack. Shop B's is GHS 4.00/pack. Shop B offers the ___ unit price.", 
            a: 'lower', 
            options: ['higher', 'same', 'lower', 'multiplied'], 
            r: 'Unit rates allow for direct comparison. GHS 4.00 is numerically smaller than GHS 4.50, so it is the lower price.' 
        },
        { 
            q: "10. A cocoa harvesting rate is 0.5 baskets/person. This means that ___ person harvests half a basket.", 
            a: 'for each', 
            options: ['total', 'half', 'for each', 'all of the'], 
            r: 'The phrase **for each** person is correct rate language to describe the quantity associated with a single unit (person).' 
        }
    ];

    // Game state
    let currentQuestionIndex = 0;
    let score = 0;
    const POINTS_PER_QUESTION = 10;

    // DOM elements
    const startScreen = document.getElementById('start-screen');
    const quizArea = document.getElementById('quiz-area');
    const gameOverScreen = document.getElementById('game-over-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const nextButton = document.getElementById('next-button');
    const questionText = document.getElementById('question-text');
    const qCounter = document.getElementById('q-counter');
    const currentScoreEl = document.getElementById('current-score');
    const finalScoreEl = document.getElementById('final-score');
    const optionsContainer = document.getElementById('options-container');
    const rationaleDisplay = document.getElementById('rationale-display');

    // Initialize game
    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        quizArea.style.display = 'block';
        loadQuestion();
    }

    // Load current question
    function loadQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            endGame();
            return;
        }

        const q = quizData[currentQuestionIndex];
        questionText.textContent = q.q;
        qCounter.textContent = currentQuestionIndex + 1;
        currentScoreEl.textContent = score;

        // Clear previous options
        optionsContainer.innerHTML = '';

        // Create answer buttons
        q.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'answer-button';
            btn.textContent = option;
            btn.onclick = () => handleAnswer(option, q.a, q.r);
            optionsContainer.appendChild(btn);
        });

        // Hide rationale and next button
        rationaleDisplay.style.display = 'none';
        nextButton.style.display = 'none';
    }

    // Handle user answer
    function handleAnswer(selected, correctAnswer, rationale) {
        const isCorrect = selected === correctAnswer;

        // Disable all buttons and highlight answers
        const buttons = optionsContainer.querySelectorAll('.answer-button');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.style.backgroundColor = '#28a745'; // green
            } else if (btn.textContent === selected && !isCorrect) {
                btn.style.backgroundColor = '#dc3545'; // red
            }
        });

        // Play sound safely
        if (isCorrect) {
            score += POINTS_PER_QUESTION;
            currentScoreEl.textContent = score;
            playSound('correct-sound');
        } else {
            playSound('wrong-sound');
        }

        // Show rationale
        rationaleDisplay.textContent = rationale;
        rationaleDisplay.className = `rationale-text ${isCorrect ? 'correct-rationale' : 'incorrect-rationale'}`;
        rationaleDisplay.style.display = 'block';

        // Show next button
        nextButton.style.display = 'inline-block';
    }

    // Safe audio playback
    function playSound(id) {
        const sound = document.getElementById(id);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.warn('Audio play prevented:', e));
        }
    }

    // Move to next question
    function nextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    // End game
    function endGame() {
        quizArea.style.display = 'none';
        gameOverScreen.style.display = 'block';
        finalScoreEl.textContent = score;
    }

    // Event listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', nextQuestion);
});