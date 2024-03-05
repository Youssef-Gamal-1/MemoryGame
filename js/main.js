const controlBtn = document.querySelector('.control button');
const uName = document.querySelector('.control input');
if(window.localStorage.getItem('username')){
    document.querySelector('.name span').textContent = window.localStorage.getItem('username');
    document.querySelector('.control').remove();
} 

controlBtn.addEventListener('click',function(){
    if(uName.value.trim() === '' || uName.value === null) {
        document.querySelector('.name span').textContent = 'Unknown';
    } else {
        document.querySelector('.name span').textContent = uName.value;
        window.localStorage.setItem('username',uName.value);
    }
    document.querySelector('.control').remove();
})

const duration = 1000;
const blocksContainer = document.querySelector('.blocks-container');
const blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);


blocks.forEach((block,index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', () => flipBlock(block))
    // block.addEventListener('mouseleave', () => {
    //     block.classList.remove('is-flibbed');
    // })
})

function flipBlock(flibbedElement) {
    flibbedElement.classList.add('is-flibbed');

    let allFlipped = blocks.filter((block) => block.classList.contains('is-flibbed'));
    if(allFlipped.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlipped[0],allFlipped[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add('no-click');

    setTimeout(() => {
        blocksContainer.classList.remove('no-click');
    }, duration);
}

function checkMatchedBlocks(firstBlock,secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flibbed');
        secondBlock.classList.remove('is-flibbed');
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    } else {
        triesElement.textContent = parseInt(triesElement.textContent) + 1;
        
        setTimeout(() => {
            firstBlock.classList.remove('is-flibbed');
            secondBlock.classList.remove('is-flibbed');
        },duration);

        document.getElementById('fail').play();
    }
}

function shuffle(array){
    let current = array.length , temp , random;

    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        // 1- Save current element in the stash (temp)
        temp = array[current];

        // 2- current element = random element
        array[current] = array[random];

        // 3- Random element = get element from stash
        array[random] = temp;
    }

    return array;
}