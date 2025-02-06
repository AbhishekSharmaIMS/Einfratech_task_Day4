let select = document.querySelector(".select-heading")
let arrow = document.querySelector(".select-heading img")
let options = document.querySelector(".options")
let option = document.querySelectorAll(".option")
let selecttext = document.querySelector(".select-heading span")

select.addEventListener("click", () => {
    options.classList.toggle("active-options")
    arrow.classList.toggle("rotate")

});
option.forEach((item) => {
    item.addEventListener("click", () => {
        selecttext.innerText = item.innerText;
    })
})

// chatbot
let prompt = document.querySelector(".prompt")
let chatbtn = document.querySelector(".input-area button")
let chatContainer = document.querySelector(".chat-container")
let h1 = document.querySelector(".h1")
let chatimg = document.querySelector("#chatbotimg")
let chatbox = document.querySelector(".chat-box")
let userMessage = "";

chatimg.addEventListener("click", () => {
    chatbox.classList.toggle("active-chat-box")
    if (chatbox.classList.contains("active-chat-box")) {
        chatimg.src = "image/cross.svg"
    } else {
        chatimg.src = "image/chatbot.svg"
    }
})


let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBlL_aD5lDgkM2u8ChVdVdGkgg420Qx8jo"
async function generateApiResponse(aiChatBox) {
    const textElement = aiChatBox.querySelector(".text")
    try {
        const response = await fetch(Api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    "role": "user",
                    "parts": [{ text: `${userMessage} in 10 words` }]
                }]
            })
        })
        const data = await response.json()
        const apiResponse = data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText = apiResponse

    }
    catch (error) {
        console.log(error)
    }
    finally {
        aiChatBox.querySelector(".loading").style.display = "none"
    }
}


function createChatBox(html, className) {
    const div = document.createElement("div")
    div.classList.add(className)
    div.innerHTML = html;
    return div
}
function showLoading() {
    const html = `<p class="text"></p>
    <img src="image/load.gif" class="loading" width="50px">`
    let aiChatBox = createChatBox(html, "ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    generateApiResponse(aiChatBox)

}
chatbtn.addEventListener(("click"), () => {
    h1.style.display = "none"
    userMessage = prompt.value;
    const html = `<p class="text"></p>`
    let userChatBox = createChatBox(html, "user-chat-box")
    userChatBox.querySelector(".text").innerText = userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value = ""
    setTimeout(showLoading, 500)
})
