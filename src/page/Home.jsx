import { useState, useEffect, useRef } from "react";
// import { languages } from "../data/languages";
import heroImg from "../assets/hero_img.jpg";
import copyImg from "../assets/Copy.svg";
import volumeImg from "../assets/sound_max_fill.svg";
import logo from "../assets/logo.svg";
import btnLogo from "../assets/Sort_alfa.svg";
import change from "../assets/Horizontal_top_left_main.svg";

const Home = () => {
  const [text, setText] = useState("Hello, how are you" ?? null);
  const [translation, setTranslation] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [langFrom, setLangFrom] = useState("en");
  const [langTo, setLangTo] = useState("fr-FR");
  const [wordCount,setWordCount] = useState(0);

  const [translate, setTranslate] = useState(false);

  const utteranceRef = useRef(null);

  //   param is text
  const speak = (words) => {
    const utterance = new SpeechSynthesisUtterance(words ?? "Write some text");
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const submitFunction = () => {
    if (langFrom === null) {
      alert("Please select the language");
    }
  };

  const detectLanguage = () => {};

  // const languageEnglishName = languages.find(
  //   (language) => language.code == data.matches[0].target
  // );
  // const { englishName } = languageEnglishName;
  // setLanguage(englishName);

  // THE API Povided cannot detect it is mandatory to set the language
  const api = () => {
    const response = fetch(
      // it is mandatory for the api to have the language set
      `https://api.mymemory.translated.net/get?q=${text}!&langpair=${langFrom}|${langTo}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data?.responseData.translatedText);
        // console.log("selectd language ",data.matches[0].target)
        setText(data?.responseData.translatedText)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(langTo);

    setTimeout(() => {
      api();
    }, 3000);
  }, [text, langTo, langFrom]);

  return (
    <div className="hero">
      <img className="hero-logo" src={logo} alt="logo" />
      <img className="hero-img" src={heroImg} />
      <div className="translate-box translate-box-left">
        <div className="translate-box--menu">
          <button className="detect-btn" onClick={detectLanguage}>
            Select language
          </button>
          <ul className="languages">
            <li
              style={{
                backgroundColor: langFrom === "en" ? "#4d5562" : "#394150",
              }}
              onClick={() => setLangFrom("en")}
            >
              English
            </li>
            <li
              style={{
                backgroundColor: langFrom === "fr-FR" ? "#4d5562" : "#394150",
              }}
              onClick={() => setLangFrom("fr-FR")}
            >
              French
            </li>
            <li
              style={{
                backgroundColor: langFrom === "es" ? "#4d5562" : "#394150",
              }}
              onClick={() => setLangFrom("es")}
            >
              Spanish
            </li>
          </ul>
        </div>
        <div className="translate-box-input">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          ></textarea>
        </div>
        <div className="translate-box-input--translate">
          <div className="icons">
            <div className="icon">
              <img
                className="svg"
                src={volumeImg}
                alt="volume icon"
                onClick={() => speak(text)}
              />
            </div>
            <div className="icon">
              <img
                className="svg"
                src={copyImg}
                alt="copy icon"
                onClick={() => alert(text)}
              />
            </div>
          </div>
          <div className="translate-btn" onClick={submitFunction}>
            <img src={btnLogo} alt="" />
            <span>Translate</span>
          </div>
        </div>
      </div>
      <div className="translate-box translate-box-right">
        <div className="translate-box--menu">
          <button className="detect-btn" onClick={detectLanguage}>
            Choose translation
          </button>
          <ul className="languages">
            <li
              style={{
                backgroundColor: langTo === "en-GB" ? "#4d5562" : "#121826cc",
              }}
              onClick={() => setLangTo("en-GB")}
            >
              English
            </li>
            <li
              style={{
                backgroundColor: langTo === "fr-FR" ? "#4d5562" : "#121826cc",
              }}
              onClick={() => setLangTo("fr-FR")}
            >
              French

            </li>
            <li
              style={{
                backgroundColor: langTo === "es" ? "#4d5562" : "#121826cc",
              }}
              onClick={() => setLangTo("es")}
            >
              Spanish
            </li>
            <li>
              <img src={change} alt="" />
            </li>
          </ul>
        </div>
        <div className="translate-box-input">
          <div className="translate-box-translation">{text}</div>
        </div>
        <div className="translate-box-input--translate">
          <div className="icons icons-right">
            <div className="icon">
              <img
                className="svg"
                src={volumeImg}
                alt="volume icon"
                onClick={() => speak(translation)}
              />
            </div>
            <div className="icon">
              <img
                className="svg"
                src={copyImg}
                alt="copy icon"
                onClick={() => alert(translation)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
