//------------------------------------------------------
// Uhren
//------------------------------------------------------

function updateClocks() {

    const germanyTime =
        new Date().toLocaleTimeString(
            "de-DE",
            {
                timeZone: "Europe/Berlin"
            });

    const californiaTime =
        new Date().toLocaleTimeString(
            "de-DE",
            {
                timeZone: "America/Los_Angeles"
            });

    const germany =
        document.getElementById("germanyTime");

    const california =
        document.getElementById("californiaTime");

    if (germany) {
        germany.innerText = germanyTime;
    }

    if (california) {
        california.innerText = californiaTime;
    }

}

updateClocks();
setInterval(updateClocks, 1000);

//------------------------------------------------------
// Sprache
//------------------------------------------------------

function setLanguage(lang) {

    localStorage.setItem("language", lang);

    if (lang === "de") {

        if (document.getElementById("title")) {
            document.getElementById("title").innerText =
                "Zeitzonen Tool";
        }

        if (document.getElementById("calculatorBtn")) {
            document.getElementById("calculatorBtn").innerText =
                "Zeitrechner";
        }

        if (document.getElementById("dictionaryBtn")) {
            document.getElementById("dictionaryBtn").innerText =
                "Wörterbuch";
        }

    }

    if (lang === "en") {

        if (document.getElementById("title")) {
            document.getElementById("title").innerText =
                "Time Zone Tool";
        }

        if (document.getElementById("calculatorBtn")) {
            document.getElementById("calculatorBtn").innerText =
                "Time Converter";
        }

        if (document.getElementById("dictionaryBtn")) {
            document.getElementById("dictionaryBtn").innerText =
                "Translator";
        }

    }

}

window.onload = function () {

    const lang =
        localStorage.getItem("language") || "de";

    setLanguage(lang);

};

//------------------------------------------------------
// Zeitrechner
//------------------------------------------------------

function convertTime() {

    const input =
        document.getElementById("timeInput").value;

    if (!input) {
        return;
    }

    let [hours, minutes] =
        input.split(":").map(Number);

    const mode =
        document.getElementById("direction").value;

    if (mode === "deToUs") {
        hours -= 9;
    } else {
        hours += 9;
    }

    if (hours < 0) {
        hours += 24;
    }

    if (hours >= 24) {
        hours -= 24;
    }

    document.getElementById("result").innerText =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0");

}

//------------------------------------------------------
// Online Übersetzer
//------------------------------------------------------

async function translateWord() {

    const text =
        document
            .getElementById("wordInput")
            .value
            .trim();

    if (!text) {

        document.getElementById("translation")
            .innerText =
            "Bitte Text eingeben.";

        return;

    }

    const source =
        document.getElementById("sourceLanguage")
            .value;

    const target =
        document.getElementById("targetLanguage")
            .value;

    document.getElementById("loading")
        .innerText =
        "Übersetze...";

    try {

        const response =
            await fetch(
                "https://translate.argosopentech.com/translate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        q: text,
                        source: source,
                        target: target,
                        format: "text"
                    })
                }
            );

        const data =
            await response.json();

        document
            .getElementById("translation")
            .innerText =
            data.translatedText;

        document
            .getElementById("loading")
            .innerText = "";

    }

    catch (error) {

        console.error(error);

        document
            .getElementById("loading")
            .innerText = "";

        document
            .getElementById("translation")
            .innerText =
            "Übersetzungsdienst derzeit nicht erreichbar.";

    }

}
