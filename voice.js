if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    let recognizer = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    let voiceInput = document.querySelector("#textId");
    let submitButton = document.querySelector("#btn");
    let voiceButton = document.querySelector("#voiceButton");
    let addedItems = document.querySelector(".added_items");
    let itemDeletion = document.querySelector("#item_deletion");

    // Configure recognizer settings
    recognizer.continuous = false;
    recognizer.lang = 'en-US';
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;

    // Replace focus event with button click
    voiceButton.addEventListener("click", () => {
        if (voiceButton.classList.contains("recording")) {
            // If already recording, stop
            recognizer.stop();
        } else {
            // Start recording
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => {
                    recognizer.start();
                    voiceInput.focus();
                    voiceButton.classList.add("recording");
                })
                .catch(err => {
                    console.error("Error accessing microphone:", err);
                    alert("Please enable microphone access to use voice input");
                });
        }
    });

    recognizer.onresult = (event) => {
        let voiceToTextConverter = event.results[0][0].transcript;
        voiceInput.value = voiceToTextConverter;
        voiceButton.classList.remove("recording");
    };

    recognizer.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        voiceButton.classList.remove("recording");
    };

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        addTask();
    });

    recognizer.onend = () => {
        console.log("Speech recognition ended");
        voiceButton.classList.remove("recording");
    };

    function addTask() {
        let todoInput = voiceInput.value.trim();
        if (todoInput !== "") {
            let everyTodoItem = document.createElement("li");
            everyTodoItem.className = "item";
            everyTodoItem.innerHTML = `
                <span>${todoInput}</span><a href="#"><i class="fa-solid fa-trash-can"></i></a>
            `;
            addedItems.appendChild(everyTodoItem);
            voiceInput.value = "";
        }
    }

    addedItems.addEventListener("click",(e) => {
        if(e.target.classList.contains("fa-trash-can")){
            const targetedLi = e.target.closest("li.item");
            if (targetedLi) targetedLi.remove();
        }
    });
} else {
    alert("Your browser does not support Speech Recognition");
}
