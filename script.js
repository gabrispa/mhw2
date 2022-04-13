/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function isCompleted(dict)
{
    for (const obj in dict) {
        if(dict[obj] === ''){
            return false
        }
    }
    return true;
}

function addListeners(){
    const boxes = document.querySelectorAll('.choice-grid div');
    for (const box of boxes)
    {
        box.addEventListener('click', answerClicked);
    }
}

function removeListeners(){
    const boxes = document.querySelectorAll('.choice-grid div');
    for (const box of boxes)
    {
        box.removeEventListener('click', answerClicked);
    }
}

function calcResult()
{
    let count;
    let max = 0;
    let result;

    for(obj in answers)
    {
        count = 0;
        for(o in answers)
            if(answers[o] === answers[obj])
                count++;
    
        if(count > max)
        {
            max = count;
            result = answers[obj];
        }
    }
    
    return result;
}

function displayAnswer(result)
{
    const answerBlock = document.querySelector('#answer');
    
    const button = answerBlock.querySelector('button')
    button.textContent = 'Ricomincia il Quiz';
    button.classList.remove('hidden');
    button.addEventListener('click', buttonClicked);

    const title = answerBlock.querySelector('h1');
    title.textContent = RESULTS_MAP[result].title;
    title.classList.remove('hidden');
    const paragraph = answerBlock.querySelector('p');
    paragraph.textContent = RESULTS_MAP[result].contents;
    paragraph.classList.remove('hidden');
}

function reset()
{
    const answerBlock = document.querySelector('#answer');
    
    const button = answerBlock.querySelector('button')
    button.classList.add('hidden');
    const title = answerBlock.querySelector('h1');
    title.classList.add('hidden');
    const paragraph = answerBlock.querySelector('p');
    paragraph.classList.add('hidden');

    addListeners();

    const boxes = document.querySelectorAll('.choice-grid div');
    for(const box of boxes)
    {
        box.classList.remove('checked');
        box.classList.remove('unchecked');
        box.querySelector('.checkbox').src = 'images/unchecked.png';
    }
}

function buttonClicked(event)
{
    for(obj in answers)
        answers[obj] = '';

    reset();
    
}

function answerClicked(event)
{
    const selected = event.currentTarget;

    selected.classList.add('checked');
    selected.classList.remove('unchecked');
    selected.querySelector('.checkbox').src = 'images/checked.png';

    const otherContainers = document.querySelectorAll('div[data-question-id=' + selected.dataset.questionId + ']');
    for (const container of otherContainers)
    {
        if (container.dataset.choiceId !== selected.dataset.choiceId) {
            container.classList.add('unchecked');
            container.querySelector('.checkbox').src = 'images/unchecked.png';
        }       
    }

    answers[selected.dataset.questionId] = selected.dataset.choiceId;
    console.log(answers)

    if(isCompleted(answers)){
        console.log("Completato");
        displayAnswer(calcResult());
        removeListeners();
    }

}


const answers = {
    'one': '',
    'two':'',
    'three':''
};

reset();



