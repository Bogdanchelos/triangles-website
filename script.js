document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');

    const questions = [
        {
            question: "Який трикутник має всі сторони рівні?",
            options: ["Рівнобедрений", "Різносторонній", "Рівносторонній"],
            answer: "Рівносторонній"
        },
        {
            question: "Скільки кутів у прямокутному трикутнику дорівнює 90°?",
            options: ["Один", "Два", "Три"],
            answer: "Один"
        },
        {
            question: "Який трикутник має дві сторони рівні?",
            options: ["Різносторонній", "Рівнобедрений", "Рівносторонній"],
            answer: "Рівнобедрений"
        }
    ];

    function loadQuiz() {
        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            const questionTitle = document.createElement('h3');
            questionTitle.textContent = q.question;
            questionElement.appendChild(questionTitle);

            q.options.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question-${index}`;
                input.value = option;

                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                questionElement.appendChild(label);
            });

            quizContainer.appendChild(questionElement);
        });

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Перевірити відповіді';
        submitButton.addEventListener('click', checkAnswers);
        quizContainer.appendChild(submitButton);
    }

    function checkAnswers() {
        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });

        alert(`Ваш результат: ${score} з ${questions.length}`);
    }

    loadQuiz();

    const canvas = document.getElementById('triangle-canvas');
    const ctx = canvas.getContext('2d');
    const checkButton = document.getElementById('check-triangle');

    let points = [
        { x: 50, y: 350 },
        { x: 200, y: 50 },
        { x: 350, y: 350 }
    ];

    let draggingPoint = null;

    function drawTriangle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.closePath();
        ctx.fillStyle = '#e0e4e5';
        ctx.fill();
        ctx.stroke();

        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#336699';
            ctx.fill();
        });
    }

    function isMouseInPoint(mouseX, mouseY, point) {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        return Math.sqrt(dx * dx + dy * dy) < 8;
    }

    function onMouseDown(e) {
        const rect = canvas.getBoundingClient
