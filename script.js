<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart AI Assistant & Background Changer</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #0f111a;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .ai-card {
            background: rgba(26, 29, 45, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 25px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .card-header {
            font-size: 1.3rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
            color: #00d2ff;
        }

        .chat-box {
            background: #141724;
            border-radius: 12px;
            padding: 15px;
            min-height: 80px;
            max-height: 150px;
            overflow-y: auto;
            margin-bottom: 20px;
            font-size: 0.95rem;
            line-height: 1.5;
            border-left: 4px solid #ff007f;
        }

        .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }

        .input-group input[type="text"] {
            flex: 1;
            padding: 12px 16px;
            border-radius: 25px;
            border: 1px solid #333952;
            background: #0f111a;
            color: #fff;
            outline: none;
            font-size: 0.95rem;
        }

        .input-group input[type="text"]:focus {
            border-color: #00d2ff;
        }

        .btn-ask {
            background: linear-gradient(135deg, #a812ef 0%, #ff007f 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            transition: opacity 0.2s ease;
        }

        .btn-ask:hover {
            opacity: 0.9;
        }

        .upload-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #141724;
            padding: 12px 15px;
            border-radius: 12px;
            border: 1px dashed #333952;
        }

        .upload-section span {
            font-size: 0.85rem;
            color: #a0a5b5;
        }

        .btn-upload {
            background: #00d2ff;
            color: #0f111a;
            border: none;
            padding: 10px 16px;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        #fileInput {
            display: none;
        }

        .preview-area {
            margin-top: 15px;
            text-align: center;
        }

        .preview-area img {
            max-width: 100%;
            border-radius: 10px;
            display: none;
            margin-top: 10px;
        }
    </style>
</head>
<body>

<div class="ai-card">
    <div class="card-header">स्मार्ट एआई दोस्त (A to Z काम) 🤖💬</div>
    
    <div class="chat-box" id="chatResponse">
        अरे भाई! मैं एक्टिव हो चुका हूँ। मुझसे कुछ भी पूछो या नीचे बटन दबाकर अपनी फोटो अपलोड करो! 😜🔥
    </div>

    <div class="input-group">
        <input type="text" id="userInput" placeholder="कुछ भी पूछें या फोटो के बारे में लिखें..." />
        <button class="btn-ask" id="askBtn">पूछें 🚀</button>
    </div>

    <div class="upload-section">
        <span>अपनी गैलरी से फोटो लगाएं:</span>
        <button class="btn-upload" id="customUploadBtn">📁 फोटो अपलोड करें</button>
        <input type="file" id="fileInput" accept="image/*" />
    </div>

    <div class="preview-area">
        <img id="imagePreview" alt="Image Preview" />
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const askBtn = document.getElementById("askBtn");
        const userInput = document.getElementById("userInput");
        const chatResponse = document.getElementById("chatResponse");
        const customUploadBtn = document.getElementById("customUploadBtn");
        const fileInput = document.getElementById("fileInput");
        const imagePreview = document.getElementById("imagePreview");

        // 1. फोटो अपलोड ट्रिगर
        customUploadBtn.addEventListener("click", function () {
            fileInput.click();
        });

        // 2. फ़ाइल चुनने पर प्रीव्यू दिखाना
        fileInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                    chatResponse.innerHTML = "✅ फोटो लोड हो गई है! अब आप इसका बैकग्राउंड बदलने या सवाल पूछने के लिए तैयार हैं।";
                };
                reader.readAsDataURL(file);
            }
        });

        // 3. AI Chat functionality (Error-Free Async Handling)
        askBtn.addEventListener("click", async function () {
            const query = userInput.value.trim();
            if (!query) {
                chatResponse.innerHTML = "⚠️ कृपया पहले कुछ टाइप करें!";
                return;
            }

            chatResponse.innerHTML = "⏳ सोच रहा हूँ, कृपया रुकें...";

            try {
                // Free AI Processing API Call
                const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(query)}`);
                if (!response.ok) throw new Error("API Response Failed");

                const resultText = await response.text();
                chatResponse.innerHTML = resultText;
            } catch (error) {
                console.error("AI Fetch Error:", error);
                chatResponse.innerHTML = "🤖 भाई! नेटवर्क में कोई समस्या आई है। कृपया दोबारा कोशिश करें।";
            } finally {
                userInput.value = "";
            }
        });

        // 4. Enter की दबाने पर भी रिस्पॉन्स भेजना
        userInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                askBtn.click();
            }
        });
    });
</script>

</body>
</html>
function changeBg(type) {
    const bgContainer = document.getElementById('bg-container');

    if (type === 'manali') {
        bgContainer.style.backgroundImage = "url('https://unsplash.com')";
    } 
    else if (type === 'beach') {
        bgContainer.style.backgroundImage = "url('https://unsplash.com')";
    } 
    else if (type === 'clothes') {
        bgContainer.style.backgroundImage = "url('https://unsplash.com')";
    } 
    else if (type === 'reset') {
        bgContainer.style.backgroundImage = "none";
    }
}
