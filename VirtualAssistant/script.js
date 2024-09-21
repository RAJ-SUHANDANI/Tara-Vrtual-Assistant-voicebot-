let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-GB";
  speech.volume = 1; // 0 to 1
  speech.rate = 1; // 0.1 to 10
  speech.pitch = 1; // 0 to 2
  window.speechSynthesis.speak(speech);
}

function wishMe() {
  let day = new Date();
  let hour = day.getHours();
  if (hour > 0 && hour < 12) {
    speak("Good Morning!");
  } else if (hour >= 12 && hour < 16) {
    speak("Good Afternoon!");
  } else {
    speak("Good Evening!");
  }
}

// window.addEventListener('load',() => {
//   wishMe();
// })

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(command) {
  btn.style.display = "flex";
  voice.style.display = "none";
  if (
    command.includes("hello") ||
    command.includes("hi") ||
    command.includes("bhai") ||
    command.includes("hey")
  ) {
    speak("Hello! How can I help you today?");
  } else if (command.includes("what is your name")) {
    speak("My name is Tara. I am here to help you.");
  } else if (command.includes("what is the date")) {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    speak(`The current date is ${day}/${month}/${year}`);
  } else if (command.includes("who are you")) {
    speak(
      "I am a virtual assistant created by Raj. I can help you with various tasks, such as greeting you, asking about my name, checking the date, and time."
    );
  } else if (command.includes("time")) {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    speak(`The current time is ${hours}isto${minutes}minutes`);
  } else if (command.includes("weather")) {
    speak(
      "I am unable to provide real-time weather updates. However, you can check the weather website for the current location."
    );
  } else if (command.includes("search")) {
    let searchTerm = command.split("search ")[1];
    window.open(`https://www.google.com/search?q=${searchTerm}`);
    speak(
      `I have opened a new tab with the search results for '${searchTerm}'.`
    );
  } else if (command.includes("open youtube")) {
    speak("Opening YouTube in a new tab.");
    window.open("https://www.youtube.com");
  } else if (command.includes("open google")) {
    speak("Opening Google in a new tab.");
    window.open("https://www.google.com");
  } else if (command.includes("open stack overflow")) {
    speak("Opening Stack Overflow in a new tab.");
    window.open("https://stackoverflow.com");
  } else if (command.includes("open instagram")) {
    speak("Opening Instagram in a new tab.");
    window.open("https://www.instagram.com");
  } else if (command.includes("open facebook")) {
    speak("Opening Facebook in a new tab.");
    window.open("https://www.facebook.com");
  } else if (command.includes("open twitter") || command.includes("open x")) {
    speak("Opening in a new tab.");
    window.open("https://www.twitter.com");
  } else if (command.includes("open netflix")) {
    speak("Opening in a new tab.");
    window.open("https://www.netflix.com");
  } else if (command.includes("open")) {
    speak("Opening in a new tab.");
    const website = command.replace("open", "").trim();
    window.open(`https://${website}.com`);
  } else if (command.includes("open gmail")) {
    speak("Opening in a new tab.");
    window.open("https://mail.google.com", "_blank");
  } else if (command.includes("open linkedin")) {
    speak("Opening in a new tab.");
    window.open("https://www.linkedin.com", "_blank");
  } else if (command.includes("tell me a joke")) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "I told my computer I needed a break, and now it won't stop sending me Kit-Kat ads!",
    ];
    speak(jokes[Math.floor(Math.random() * jokes.length)]);
  } else if (command.includes("what is")) {
    const topic = command.replace("what is", "").trim();
    speak("Opening in a new tab.");
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(topic)}`,
      "_blank"
    );
  } else if (command.includes("calculate")) {
    let expression = command.replace("calculate", "").trim();
    expression = expression.replace(/x|times|multiplied by/gi, '*');
    expression = expression.replace(/divided by/gi, '/');
    expression = expression.replace(/plus/gi, '+');
    expression = expression.replace(/minus/gi, '-');
    try {
      const result = eval(expression);
      if (isNaN(result) || !isFinite(result)) {
        speak("I'm sorry, that calculation resulted in an invalid number.");
      } else {
        speak(`The result is: ${result}`);
      }
    } catch (e) {
      speak("I'm sorry, I couldn't perform that calculation. Please try again with a valid arithmetic expression.");
    }
  } else if (command.includes("open spotify")) {
    speak("Opening in a new tab.");
    window.open("https://www.spotify.com", "_blank");
  } else if (command.includes("find a recipe for")) {
    const dish = command.replace("find a recipe for", "").trim();
    speak("Opening in a new tab.");
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(dish + " recipe")}`,
      "_blank"
    );
  } else {
    speak("I didn't understand that command. Please try again.");
  }
}
