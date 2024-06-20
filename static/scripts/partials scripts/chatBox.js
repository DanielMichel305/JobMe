const chatBoxToggle = document.querySelector('#chatbox-toggle');
const chatBoxMessage = document.querySelector('#chatbox-message');

chatBoxToggle.addEventListener('click', function(){

    chatBoxMessage.classList.toggle('show');

})

// 34an tkbr seka bs m4 l infinty 
const textArea =  document.querySelector('#message-input');

textArea.addEventListener('input' , function(){

    let lineNum = textArea.value.split('\n').length;

    if(textArea < 6 || lineNum < 6){
        textArea.rows = lineNum;
    }

})




// chat 3mtn 

const chatBoxForm = document.querySelector('#chatbox-form');

chatBoxForm.addEventListener('submit' , function(e){

    e.preventDefault();
    if(isValid(textArea.value)){
    writeMessage();
    setTimeout(autoReply , 1000);
    }
})


function addZero(num){
return num < 10 ? '0' + num : num;
}
const chatBoxContainer = document.querySelector('#chatbox-content');
const chatBoxNoMessage = document.querySelector('#chatbox-no-message');

function writeMessage(){
    const time = new Date();
    let message = `
    <div class="chatbox-message-item sent">
        <span class="chatbox-message-item-text">
            ${textArea.value.trim().replace(/\n/g, '<br>\n')}
        </span>
        <span class="chatbox-message-item-time">${addZero(time.getHours() - 12 )} : ${addZero(time.getMinutes())}</span>
    </div>
     `;

     chatBoxContainer.insertAdjacentHTML('beforeend' , message);
     chatBoxForm.computedStyleMap.alignitems = 'center';
     textArea.rows = 1;
     textArea.focus();
     textArea.value='';
     chatBoxNoMessage.style.display = 'none';
     startBottomScroll();
}

//ll test l7d ma nl2y alyrod
function autoReply(){
    const time = new Date();
    let message = `
    <div class="chatbox-message-item received">
        <span class="chatbox-message-item-text">
            tslm l atsalk ya 7ag abdo sytem al twasol fe akrb w2t m3 al backend ya 
        </span>
        <span class="chatbox-message-item-time">${addZero(time.getHours() - 12 )} : ${addZero(time.getMinutes())}</span>
    </div>
     `;

     chatBoxContainer.insertAdjacentHTML('beforeend' , message);
     startBottomScroll()
}

function startBottomScroll(){
    chatBoxContainer.scrollTo(0,chatBoxContainer.scrollHeight);
}

function isValid(value){
    let text = value;

    return text.length > 0;
}


    
const namz = document.getElementById('profile-name');
    
namz.innerHTML = 'The freelancer';
