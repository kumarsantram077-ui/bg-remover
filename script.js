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
}import pandas as pd
import os

temples_data = [
    {"Name": "Brihadisvara Temple", "State": "Tamil Nadu", "Builder": "Raja Raja Chola I", "Significance": "UNESCO World Heritage Site; built entirely of granite; features a massive 66-meter high vimana."},
    {"Name": "Sun Temple, Konark", "State": "Odisha", "Builder": "King Narasimhadeva I (Eastern Ganga Dynasty)", "Significance": "UNESCO Site designed as a monumental chariot of the Sun God with 24 intricately carved wheels."},
    {"Name": "Kailash Temple, Ellora", "State": "Maharashtra", "Builder": "King Krishna I (Rashtrakuta Dynasty)", "Significance": "Largest monolithic rock-cut structure in the world, carved vertically down from a single rock cliff."},
    {"Name": "Khajuraho Temples", "State": "Madhya Pradesh", "Builder": "Chandela Dynasty rulers", "Significance": "UNESCO Site famous for its Nagara-style architecture and expressive, intricately detailed erotic sculptures."},
    {"Name": "Shore Temple", "State": "Tamil Nadu", "Builder": "Narasimhavarman II (Pallava Dynasty)", "Significance": "One of the oldest structural stone temples in South India, overlooking the Bay of Bengal."},
    {"Name": "Meenakshi Amman Temple", "State": "Tamil Nadu", "Builder": "King Kulasekhara Pandya (Rebuilt by Nayaks)", "Significance": "Massive complex known for its 14 towering gopurams decorated with thousands of colorful stone figures."},
    {"Name": "Somnath Temple", "State": "Gujarat", "Builder": "Traditional / Rebuilt by Vallabhbhai Patel", "Significance": "The first of the twelve sacred Jyotirlinga shrines dedicated to Lord Shiva; repeatedly destroyed and rebuilt."},
    {"Name": "Jagannath Temple, Puri", "State": "Odisha", "Builder": "King Anantavarman Chodaganga Deva", "Significance": "Famous for its annual Ratha Yatra (Chariot Festival); its main dome's shadow is said to never fall on the ground."},
    {"Name": "Kedarnath Temple", "State": "Uttarakhand", "Builder": "Adi Shankaracharya (Traditional / Rebuilt)", "Significance": "One of the highest Chota Char Dham sites; located in the Himalayas; highly revered Jyotirlinga."},
    {"Name": "Badrinath Temple", "State": "Uttarakhand", "Builder": "Adi Shankaracharya", "Significance": "Part of both the main Char Dham and Chota Char Dham; dedicated to Lord Vishnu in the Garhwal hills."},
    {"Name": "Kashi Vishwanath Temple", "State": "Uttar Pradesh", "Builder": "Ahilyabai Holkar", "Significance": "One of the most famous Jyotirlingas, situated on the western bank of the holy river Ganges in Varanasi."},
    {"Name": "Lingaraj Temple", "State": "Odisha", "Builder": "King Jajati Keshari (Soma Vanshi Dynasty)", "Significance": "The largest temple in Bhubaneswar; an architectural marvel representing the Kalinga style at its peak."},
    {"Name": "Chennakeshava Temple, Belur", "State": "Karnataka", "Builder": "King Vishnuvardhana (Hoysala Dynasty)", "Significance": "Renowned for its breathtakingly intricate soapstone carvings, portraying celestial dancers and epics."},
    {"Name": "Hoysaleswara Temple", "State": "Karnataka", "Builder": "King Vishnuvardhana", "Significance": "A twin-temple complex dedicated to Shiva; features massive star-shaped platforms and elaborate friezes."},
    {"Name": "Virupaksha Temple, Hampi", "State": "Karnataka", "Builder": "Lakkan Dandesha (Under Deva Raya II)", "Significance": "UNESCO World Heritage Site; functions continuously since the 7th century through the Vijayanagara Empire."},
    {"Name": "Vittala Temple, Hampi", "State": "Karnataka", "Builder": "King Deva Raya II / Krishna Deva Raya", "Significance": "Famous for its iconic stone chariot structure and musical pillars that emit musical notes when tapped."},
    {"Name": "Mahabodhi Temple", "State": "Bihar", "Builder": "Emperor Ashoka (Later expansions)", "Significance": "UNESCO Site marking the exact location where Siddhartha Gautama (Lord Buddha) attained enlightenment."},
    {"Name": "Ramanathaswamy Temple", "State": "Tamil Nadu", "Builder": "Pandya & Jaffna Kings (Expanded over time)", "Significance": "Features the longest temple corridor in the world, stretching over 1,200 meters with carved pillars."},
    {"Name": "Venkateswara Temple", "State": "Andhra Pradesh", "Builder": "King Thondaiman (Expanded by Cholas/Vijayanagara)", "Significance": "Located on Tirumala hills; often cited as the richest temple in the world by donations received."},
    {"Name": "Padmanabhaswamy Temple", "State": "Kerala", "Builder": "King Marthanda Varma (Travancore Royal Family)", "Significance": "Known globally for its sealed underground vaults containing immense treasures of gold and gems."},
    {"Name": "Akshardham Temple, Delhi", "State": "Delhi", "Builder": "BAPS Swaminarayan Sanstha", "Significance": "A massive modern spiritual campus showcasing centuries of traditional Indian culture and architecture."},
    {"Name": "Golden Temple (Harmandir Sahib)", "State": "Punjab", "Builder": "Guru Arjan Dev (Gold foil by Maharaja Ranjit Singh)", "Significance": "The holiest shrine in Sikhism, surrounded by the Amrit Sarovar lake and coated in pure gold foil."},
    {"Name": "Dilwara Temples", "State": "Rajasthan", "Builder": "Vimal Shah and Vastupal-Tejpal", "Significance": "Group of Jain temples located at Mount Abu; world-famous for incredibly delicate white marble carvings."},
    {"Name": "Ranakpur Jain Temple", "State": "Rajasthan", "Builder": "Darna Shah (Under Rana Kumbha)", "Significance": "Dedicated to Tirthankara Adinatha; features over 1,444 uniquely carved marble pillars support the structure."},
    {"Name": "Kamakhya Temple", "State": "Assam", "Builder": "Chila Rai (Koch Dynasty / Rebuilt)", "Significance": "A premier seat of Tantric Shaktism dedicated to Goddess Kamakhya; celebrates Ambubachi Mela."},
    {"Name": "Amarnath Cave Temple", "State": "Jammu & Kashmir", "Builder": "Natural Formation (Mentioned in ancient texts)", "Significance": "A sacred cave located at 3,888m altitude containing a naturally forming ice stalagmite Shiva Lingam."},
    {"Name": "Vaishno Devi Temple", "State": "Jammu & Kashmir", "Builder": "Traditional / Pandavas (According to folklore)", "Significance": "A highly revered hillside cave shrine tracking millions of pilgrims hiking up Trikuta Mountains annually."},
    {"Name": "Dwarkadhish Temple", "State": "Gujarat", "Builder": "Vajranabha (Grandson of Krishna) / Expanded later", "Significance": "Part of the Char Dham pilgrimage; five-storied structure supported by 72 limestone pillars."},
    {"Name": "Tanjore Airavatesvara Temple", "State": "Tamil Nadu", "Builder": "Rajaraja Chola II", "Significance": "Part of the Great Living Chola Temples UNESCO site; features a chariot structure pulled by elephants."},
    {"Name": "Gangaikonda Cholapuram Temple", "State": "Tamil Nadu", "Builder": "Rajendra Chola I", "Significance": "Built to celebrate his victory over northern kingdoms; similar in grandeur to Brihadisvara Temple."},
    {"Name": "Lad Khan Temple, Aihole", "State": "Karnataka", "Builder": "Chalukya Dynasty", "Significance": "One of the earliest experimental Hindu temple structures, showcasing experimental cave-to-structural designs."},
    {"Name": "Durga Temple, Aihole", "State": "Karnataka", "Builder": "Chalukya Dynasty", "Significance": "Famous for its unique apsidal (semi-circular) layout, resembling a Buddhist Chaitya architecture."},
    {"Name": "Pattadakal Virupaksha Temple", "State": "Karnataka", "Builder": "Queen Lokamahadevi", "Significance": "UNESCO Site built to commemorate King Vikramaditya II's victory over the Pallavas of Kanchipuram."},
    {"Name": "Badami Cave Temples", "State": "Karnataka", "Builder": "Mangalesha (Chalukya Dynasty)", "Significance": "Four structural rock-cut caves representing Vedic, Jain, and Buddhist traditions carved out of sandstone."},
    {"Name": "Kanchipuram Kailasanathar Temple", "State": "Tamil Nadu", "Builder": "Narasimhavarman II (Pallava Dynasty)", "Significance": "The oldest structural temple in Kanchipuram, showcasing early Dravidian style architecture and frescoes."},
    {"Name": "Varadharaja Perumal Temple", "State": "Tamil Nadu", "Builder": "Chola Dynasty (Expanded by Vijayanagara)", "Significance": "Massive Vishnu temple featuring a famous 100-pillared hall carved extensively with chain links."},
    {"Name": "Ekambareswarar Temple", "State": "Tamil Nadu", "Builder": "Pallava Dynasty (Rebuilt by Cholas/Nayaks)", "Significance": "Represents the element of Earth (Prithvi) among Pancha Bhoota Stalam; has a 3500-year-old mango tree."},
    {"Name": "Srirangam Ranganathaswamy", "State": "Tamil Nadu", "Builder": "Chola & Pandya Dynasties", "Significance": "Often considered the largest functioning Hindu temple complex globally, spans 156 acres with 21 gopurams."},
    {"Name": "Thillai Nataraja Temple, Chidambaram", "State": "Tamil Nadu", "Builder": "Chola Dynasty", "Significance": "Represents the element of Sky/Ether (Akasha); depicts Lord Shiva in his cosmic dance form (Nataraja)."},
    {"Name": "Jambukeswarar Temple, Thiruvanaikaval", "State": "Tamil Nadu", "Builder": "Kocengannan (Early Chola)", "Significance": "Represents the element of Water (Appu); the sanctum houses an underground water spring under the Lingam."},
    {"Name": "Arunachaleswarar Temple, Tiruvannamalai", "State": "Tamil Nadu", "Builder": "Chola Dynasty", "Significance": "Represents the element of Fire (Agni); sits at the base of the sacred, volcanic Arunachala Hill."},
    {"Name": "Srikalahasteeswara Temple", "State": "Andhra Pradesh", "Builder": "Pallava & Chola Kings", "Significance": "Represents the element of Wind (Vayu); the lamp inside the closed inner sanctum constantly flickers."},
    {"Name": "Mallikarjuna Jyotirlinga", "State": "Andhra Pradesh", "Builder": "King Harihara I (Vijayanagara Dynasty expansions)", "Significance": "Unique shrine counted as both a primary twelve Jyotirlinga and one of the eighteen Shakti Peethas."},
    {"Name": "Mahakaleshwar Temple", "State": "Madhya Pradesh", "Builder": "Traditional / Maratha general Ranoji Shinde", "Significance": "A highly sacred Dakshinamurti (south-facing) Jyotirlinga in Ujjain; famous for Bhasma Arti."},
    {"Name": "Omkareshwar Temple", "State": "Madhya Pradesh", "Builder": "Traditional", "Significance": "Jyotirlinga shrine located on a Mandhata island in the Narmada River; shape resembles the 'Om' symbol."},
    {"Name": "Bhimashankar Temple", "State": "Maharashtra", "Builder": "Nana Phadnavis (Expanded in Maratha style)", "Significance": "Jyotirlinga located in the Western Ghats; surrounded by a dense, rich biodiversity reserve."},
    {"Name": "Trimbakeshwar Temple", "State": "Maharashtra", "Builder": "Peshwa Balaji Baji Rao", "Significance": "Jyotirlinga featuring a unique three-faced lingam representing Brahma, Vishnu, and Shiva."},
    {"Name": "Grishneshwar Temple", "State": "Maharashtra", "Builder": "Ahilyabai Holkar", "Significance": "Believed to be the last or 12th Jyotirlinga temple; located near the Ellora Caves complex."},
    {"Name": "Nageshwar Jyotirlinga", "State": "Gujarat", "Builder": "Traditional", "Significance": "An ancient Jyotirlinga near Dwarka; features a prominent, massive 25-meter tall seated Lord Shiva statue."},
    {"Name": "Baidyanath Temple", "State": "Jharkhand", "Builder": "King Puran Mal (Gidhaur Dynasty)", "Significance": "Revered Jyotirlinga site where devotees carry holy water from the Ganges river on foot across 100km."},
    {"Name": "Ramanathaswamy Temple", "State": "Tamil Nadu", "Builder": "Setupati Rulers / Pandya Dynasty", "Significance": "Southernmost Jyotirlinga shrine; linked to the epic Ramayana where Rama worshipped Shiva."},
    {"Name": "Ghashneshwar / Tarakeswar", "State": "West Bengal", "Builder": "Raja Bharamalla", "Significance": "Major center of Shiva worship in Bengal; focal point for millions during the Shravan month."},
    {"Name": "Dakshineswar Kali Temple", "State": "West Bengal", "Builder": "Rani Rashmoni", "Significance": "Famous shrine on Hooghly riverbank closely linked with mystic saint Sri Ramakrishna Paramahamsa."},
    {"Name": "Kalighat Kali Temple", "State": "West Bengal", "Builder": "Sabarna Roy Choudhury family", "Significance": "One of the prominent 51 Shakti Peethas; gives the city of Kolkata its historical name context."},
    {"Name": "Tarapith Temple", "State": "West Bengal", "Builder": "Jagannath Ray", "Significance": "Famous Tantric temple dedicated to Goddess Tara, located next to a major crematorium ground."},
    {"Name": "Kamakhya Temple", "State": "Assam", "Builder": "King Nara Narayan (Koch Dynasty)", "Significance": "Celebrated Tantric temple tracking the menstruation cycle of the earth during June rains."},
    {"Name": "Malini Than Temple", "State": "Arunachal Pradesh", "Builder": "Chutiya Dynasty Kings", "Significance": "An ancient structural granite temple site featuring gorgeous relics of Durga and Krishna ruins."},
    {"Name": "Govindajee Temple", "State": "Manipur", "Builder": "Maharaja Nara Singh", "Significance": "Elegant royal temple located next to Palace grounds featuring gold-domed structures and large courts."},
    {"Name": "Tripura Sundari Temple", "State": "Tripura", "Builder": "King Dhanya Manikya", "Significance": "Considered one of the 51 Shakti Peethas; structurally designed resembling a typical Bengali hut shape."},
    {"Name": "Kanak Durga Temple", "State": "Andhra Pradesh", "Builder": "Arjuna (According to mythology) / Kings later", "Significance": "Set atop Indrakeeladri hills overlooking the Krishna River; famous during Navaratri festivals."},
    {"Name": "Simhachalam Temple", "State": "Andhra Pradesh", "Builder": "Chola King Kulottunga I / Eastern Gangas", "Significance": "Dedicated to Varaha Lakshmi Narasimha; deity is kept covered in sandalwood paste year-round."},
    {"Name": "Srisailam Bhramaramba Temple", "State": "Andhra Pradesh", "Builder": "Satavahana Dynasty / Vijayanagara Kings", "Significance": "Houses both a Jyotirlinga and Shakti Peetha together inside a fort-like massive stone wall complex."},
    {"Name": "Suryanar Kovil", "State": "Tamil Nadu", "Builder": "Kulottunga Chola I", "Significance": "A unique Sun temple in South India featuring separate shrines for all nine planetary deities (Navagrahas)."},
    {"Name": "Martand Sun Temple", "State": "Jammu & Kashmir", "Builder": "King Lalitaditya Muktapida (Karkota Dynasty)", "Significance": "Spectacular ruins of an ancient Kashmiri style sun temple standing tall in Anantnag valley."},
    {"Name": "Modhera Sun Temple", "State": "Gujarat", "Builder": "King Bhima I (Chaulukya / Solanki Dynasty)", "Significance": "Features an exquisite stepped holy water tank (Surya Kund) and a pillar-less assembly hall."},
    {"Name": "Kandariya Mahadeva Temple", "State": "Madhya Pradesh", "Builder": "King Vidyadhara (Chandela Dynasty)", "Significance": "The largest and most ornate temple within the western group of Khajuraho monuments."},
    {"Name": "Lakshmana Temple, Khajuraho", "State": "Madhya Pradesh", "Builder": "Yashovarman (Chandela Dynasty)", "Significance": "The earliest built Panchayatana style temple preserved completely intact within Khajuraho."},
    {"Name": "Chaturbhuj Temple, Orchha", "State": "Madhya Pradesh", "Builder": "Bundela Rajput Rulers (Madhukar Shah)", "Significance": "Features unique cathedral-like high vaults, cross layouts, and massive fort-like towering spires."},
    {"Name": "Sas-Bahu Temple, Gwalior", "State": "Madhya Pradesh", "Builder": "King Mahipala (Kachchhapaghata Dynasty)", "Significance": "Twin 11th-century structures boasting rich geometric carvings without using mortar joints."},
    {"Name": "Bhojeshwar Temple, Bhojpur", "State": "Madhya Pradesh", "Builder": "King Bhoja (Paramara Dynasty)", "Significance": "Unfinished architectural masterpiece housing one of the tallest single-stone Shiva Lingams (7.5 feet)."},
    {"Name": "Kalaram Temple", "State": "Maharashtra", "Builder": "Sardar Rangarao Odhekar", "Significance": "Built using black stones; historically significant site for Dr. B.R. Ambedkar's temple entry movement."}
]

df = pd.DataFrame(temples_data)
# Save directly to current workspace or ensure a simple path
df.to_csv("indian_temples_list.csv", index=False)
print("Count:", len(df))

