const jeopardycategories =[
    {
        genre: "WHO",
        questions: [
            {
                question: "Who wrote harry potter?",
                answers:["Harry Potter","JK Rowling"],
                correct:"JK Rowling",
                level:"easy"
            },
            {
                question: "Who was born on Krypton?",
                answers:["Aquaman","Superman"],
                correct:"Superman",
                level:"medium"
            },
            {
                question: "Who designed the first car?",
                answers:["Karl Benz","Henry Ford"],
                correct:"Karl Benz",
                level:"hard"
            }
        ]
    },
    {
        genre: "WHERE",
        questions: [
            {
                question: "Where is Buckingham palace?",
                answers:["Richmond","London"],
                correct:"London",
                level:"easy"
            },
            {
                question: "Where is colossuem?",
                answers:["Rome","Milen"],
                correct:"Rome",
                level:"medium"
            },
            {
                question: "Where is mount kilimanjaro?",
                answers:["Zimbabwe","Tanzania"],
                correct:"Tanzania",
                level:"hard"
            }
        ]
    },
    {
        genre: "WHEN",
        questions: [
            {
                question: "When is christmas?",
                answers:["30th DEc","25th Dec"],
                correct:"JK Rowling",
                level:"easy"
            },
            {
                question: "When was JFK shot?",
                answers:["1963","1961"],
                correct:"1963",
                level:"hard"
            },
            {
                question: "When was WW2?",
                answers:["1932","1941"],
                correct:"1941",
                level:"hard"
            }
        ]
    },
    {
        genre: "WHAT",
        questions: [
            {
                question: "What is the capital of India?",
                answers:["Delhi","Mumbai"],
                correct:"Delhi",
                level:"easy"
            },
            {
                question: "What do cats eat?",
                answers:["Milk","banana"],
                correct:"Milk",
                level:"easy"
            },
            {
                question: "What is kg short for?",
                answers:["kilojoule","kilogram"],
                correct:"kilogram",
                level:"hard"
            }
        ]
    },
    {
        genre: "HOW MANY",
        questions: [
            {
                question: "How many players ina cricket team?",
                answers:["9","11"],
                correct:"11",
                level:"easy"
            },
            {
                question: "How many people in china?",
                answers:["1.1 bil","1.4 bil"],
                correct:"1.4 bil",
                level:"medium"
            },
            {
                question: "How many seconds in an hour?",
                answers:["36000","3600"],
                correct:"3600",
                level:"hard"
            }
        ]
    },
]


function addCategory(category){
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question=>{
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if(question.level==='easy'){
            card.innerHTML = 100;
        }
        if(question.level==='medium'){
            card.innerHTML = 200;
        }
        if(question.level==='hard'){
            card.innerHTML = 300;
        }

        card.setAttribute('data-question',question.question);
        card.setAttribute('data-answer-1',question.answers[0]);
        card.setAttribute('data-answer-2',question.answers[1]);
        card.setAttribute('data-correct',question.correct);
        card.setAttribute('data-value',card.getInnerHTML());

        card.addEventListener('click',flipCard);
    })

}

jeopardycategories.forEach(cat=>addCategory(cat))

function flipCard(){
    this.innerHTML = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"

    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text') 
    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')

    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')

    firstButton.addEventListener('click', getResult);
    secondButton.addEventListener('click', getResult);

    firstButton.innerHTML = this.getAttribute('data-answer-1');
    secondButton.innerHTML = this.getAttribute('data-answer-2');

    this.append(textDisplay,firstButton,secondButton);
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click',flipCard))
}

let score = 0;
function getResult(){
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card=>card.addEventListener('click',flipcard));

    const cardOfButton = this.parentElement;

    if(cardOfButton.getAttribute('data-correct') === this.innerHTML){
        score = score + parseInt(cardOfButton.getAttribute('data-value'));
        cardOfButton.classList.add('correct-answer');
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        },100)
    }else{
        cardOfButton.classList.add('wrong-answer');
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0;
        },100)
    }


    cardOfButton.removeChild('click',flipCard);
}

