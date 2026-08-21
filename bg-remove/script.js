/* बेसिक सेटिंग */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

/* मुख्य कंटेनर और डिफ़ॉल्ट बैकग्राउंड */
.main-bg {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c3e50; /* डिफ़ॉल्ट डार्क रंग */
    background-size: cover;
    background-position: center;
    transition: background-image 0.5s ease-in-out; /* स्मूथ चेंज के लिए */
}

/* बॉक्स का स्टाइल */
.content-box {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px); /* ग्लास जैसा लुक */
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    color: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

h1 {
    margin-bottom: 20px;
    font-size: 24px;
}

/* बटन का स्टाइल */
.btn-group button {
    background: #fff;
    color: #333;
    border: none;
    padding: 12px 20px;
    margin: 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.3s;
}

.btn-group button:hover {
    background: #ff4757;
    color: white;
    transform: scale(1.05); /* हल्का सा बड़ा होगा */
}
<script>
    document.addEventListener("DOMContentLoaded", function () {
        // Elements Bindings
        const userInput = document.getElementById("userInput");
        const askBtn = document.getElementById("askBtn");
        const generateImgBtn = document.getElementById("generateImgBtn");
        const chatBox = document.getElementById("chatBox") || document.getElementById("chatResponse") || document.getElementById("outputBox");
        const aiImageResult = document.getElementById("aiImageResult") || document.getElementById("aiResultImg");
        const uploadTriggerBtn = document.getElementById("uploadTriggerBtn") || document.getElementById("customUploadBtn") || document.getElementById("uploadBtn");
        const fileInput = document.getElementById("fileInput");
        const userPreview = document.getElementById("userPreview") || document.getElementById("imagePreview") || document.getElementById("uploadedPreview");

        // 1. Preset Buttons Handler (कपड़े/लुक वाले बटन्स)
        window.applyPreset = window.usePreset = function (text) {
            if (userInput) {
                userInput.value = text;
                if (generateImgBtn) generateImgBtn.click();
            }
        };

        // 2. Photo Upload Handler
        if (uploadTriggerBtn && fileInput) {
            uploadTriggerBtn.onclick = function () {
                fileInput.click();
            };

            fileInput.onchange = function (e) {
                try {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (event) {
                            if (userPreview) {
                                userPreview.src = event.target.result;
                                userPreview.style.display = "block";
                            }
                            if (chatBox) chatBox.innerHTML = "✅ **फोटो सफलतापूर्वक लोड हो गई है!**";
                        };
                        reader.readAsDataURL(file);
                    }
                } catch (err) {
                    console.error("Upload error:", err);
                }
            };
        }

        // 3. Q&A / Text Response Engine (सवाल पूछें)
        if (askBtn) {
            askBtn.onclick = async function () {
                const query = userInput ? userInput.value.trim() : "";
                if (!query) {
                    if (chatBox) chatBox.innerHTML = "⚠️ कृपया पहले कोई सवाल या टेक्स्ट टाइप करें!";
                    return;
                }

                if (aiImageResult) aiImageResult.style.display = "none";
                if (chatBox) chatBox.innerHTML = "⏳ सोच रहा हूँ... कृपया रुकें...";

                try {
                    const response = await fetch("https://text.pollinations.ai/" + encodeURIComponent(query));
                    if (!response.ok) throw new Error("API Failed");

                    const textData = await response.text();
                    if (chatBox) chatBox.innerHTML = "🤖 **जवाब:**<br>" + textData.replace(/\n/g, "<br>");
                } catch (error) {
                    if (chatBox) chatBox.innerHTML = "🤖 भाई! नेटवर्क स्लो है, लेकिन आपका सवाल **'" + query + "'** मिल गया है। कृपया दोबारा दबाएं।";
                } finally {
                    if (userInput) userInput.value = "";
                }
            };
        }

        // 4. Pro AI Image Generation Engine (कपड़े/फोटो बनाएं)
        if (generateImgBtn) {
            generateImgBtn.onclick = function () {
                const promptText = userInput ? userInput.value.trim() : "";
                if (!promptText) {
                    if (chatBox) chatBox.innerHTML = "⚠️ फोटो या कपड़े चेंज करने के लिए टेक्स्ट में विवरण लिखें!";
                    return;
                }

                if (chatBox) chatBox.innerHTML = "🎨 **Pro HD फोटो जनरेट हो रही है...** 3-5 सेकंड रुकें।";
                if (aiImageResult) aiImageResult.style.display = "none";

                const seed = Math.floor(Math.random() * 999999);
                const imgUrl = "https://image.pollinations.ai/prompt/" + encodeURIComponent(promptText) + "?width=1024&height=1024&nologo=true&seed=" + seed;

                const img = new Image();
                img.onload = function () {
                    if (aiImageResult) {
                        aiImageResult.src = imgUrl;
                        aiImageResult.style.display = "block";
                    }
                    if (chatBox) chatBox.innerHTML = "✨ **फोटो तैयार है!**<br>विवरण: <em>\"" + promptText + "\"</em>";
                };
                img.onerror = function () {
                    if (chatBox) chatBox.innerHTML = "❌ फोटो जनरेट करने में समस्या आई। फिर कोशिश करें।";
                };
                img.src = imgUrl;
            };
        }

        // 5. Enter Key Support
        if (userInput) {
            userInput.onkeypress = function (e) {
                if (e.key === "Enter") {
                    if (askBtn) askBtn.click();
                }
            };
        }
    });
</script>function doPost(e) {
  try {
    var p = e.parameter;
    var body = "You have a new contact form submission:\n\n" +
               "Name: " + p.name + "\n" +
               "Email: " + p.email + "\n" +
               "Message: " + p.message;
               
    MailApp.sendEmail("kumarsantram077@gmail.com", "New Web Form Submission", body);
    
    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": error}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

