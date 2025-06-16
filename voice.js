if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    let recognizer = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    let voiceInput = document.querySelector("#textId");
    let submitButton = document.querySelector("#btn");
    let addedItems = document.querySelector(".added_items");
    let itemDeletion = document.querySelector("#item_deletion");

    voiceInput.addEventListener("focus", () => {
        recognizer.start();
    }); 

    recognizer.onresult = (event) => {
        let voiceToTextConverter = event.results[0][0].transcript;
        voiceInput.value = voiceToTextConverter;
        addTask();
    };

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        addTask();
    });

    recognizer.onend = () => {
        recognizer.stop();
    };

    function addTask() {
        let todoInput = voiceInput.value.trim();
        if (todoInput !== "") {
            let everyTodoItem = document.createElement("li");
            everyTodoItem.innerHTML = `
                <li class="item"><span>${todoInput}</span><a  href="#"><i class="fa-solid fa-trash-can"></i></a></li>
            `;
            addedItems.appendChild(everyTodoItem);
            voiceInput.value = "";
        }
    }

    addedItems.addEventListener("click",(e) => {
        if(e.target.classList.contains("fa-trash-can")){
            const targetedLi = e.target.parentNode.parentNode;
            targetedLi.remove();
        }
    })
} else {
    alert("Your browser does not support Speech Recognition");
}
