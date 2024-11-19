import speech_recognition as sr
import pyttsx3
import webbrowser
import wikipedia
import datetime


engine = pyttsx3.init()

def speak(text):
    
    engine.say(text)
    engine.runAndWait()

def listen():
    
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

        try:
            command = recognizer.recognize_google(audio)
            print(f"You said: {command}")
            return command.lower()
        except sr.UnknownValueError:
            print("Sorry, I did not understand that.")
            return ""
        except sr.RequestError:
            print("Could not request results from Google Speech Recognition service.")
            return ""

def respond_to_command(command):
    """Respond to the recognized command."""
    if "time" in command:
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        speak(f"The current time is {current_time}.")
    elif "open website" in command:
        webbrowser.open("https://vtop.vit.ac.in/vtop/login")  
        speak("Opening website.")
    elif "search" in command:
        query = command.replace("search", "Cloud Computing").strip()
        results = wikipedia.summary(query, sentences=1)
        speak(results)
    elif "exit" in command or "stop" in command:
        speak("Goodbye!")
        return False
    else:
        speak("Sorry, I can't help with that.")
    return True

def main():
    speak("Hello! I am your virtual assistant.")
    while True:
        command = listen()
        if command:
            if not respond_to_command(command):
                break

if __name__ == "__main__":
    main()
