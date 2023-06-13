import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface Question {
  question: string;
  answers: string[];
}

interface Diagnose {
  diagnose: string;
}

type CurrentQuestion = Question | Diagnose;

const initialQuestion: Question = {
  question: 'Pacjentem jest kot czy pies ?',
  answers: ['kot', 'pies'],
};

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(initialQuestion);
  const previousAnswerRef = useRef<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [klik, setKlik] = useState<number>(0)
  const [czasStart, setCzasStart] = useState(new Date().getTime())
  useEffect(() => {
    setIsButtonDisabled(false);
  }, [currentQuestion]);

  const handleAnswerClick = rules(setIsButtonDisabled, previousAnswerRef, currentQuestion, setCurrentQuestion, klik, setKlik, czasStart, setCzasStart);

  const handleFinishClick = () => {
    setCurrentQuestion(initialQuestion);
    setKlik(klik + 1);

    // Oblicz czas trwania
    let czasTrwania: number = new Date().getTime() - czasStart;
    console.log('Liczba kliknięć: ' + klik);
    console.log('Czas trwania: ' + czasTrwania + ' ms');
  };

  return (
    <div className="container">
      <h1>VetAdvice</h1>
      <div className="question-container">
        {'question' in currentQuestion ? (
          <div className="question-box">
            <div className="question-text">{currentQuestion.question}</div>
            <div className="answers">
              {currentQuestion.answers.map((answer) => (
                <button
                  key={answer}
                  className="answer"
                  disabled={isButtonDisabled}
                  onClick={() => handleAnswerClick(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="diagnose-box">
            <p className="diagnose">{currentQuestion.diagnose}</p>
            <button className="finish-button" disabled={isButtonDisabled} onClick={handleFinishClick}>
              Zakończ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;


function rules(setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>, previousAnswerRef: React.MutableRefObject<string>,
  currentQuestion: CurrentQuestion, setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>, klik: number, setKlik: React.Dispatch<React.SetStateAction<number>>, czasStart: any, setCzasStart: React.Dispatch<React.SetStateAction<any>>) {
  setKlik(klik + 1);
  if (klik === 1) {
    let startTime = new Date().getTime();
    setCzasStart(startTime)
  }
  return (selectedAnswer: string) => {
    setIsButtonDisabled(true);
    previousAnswerRef.current = selectedAnswer;

    if (
      previousAnswerRef.current === "kot" &&
      (currentQuestion as Question).question === "Pacjentem jest kot czy pies ?"
    ) {
      setCurrentQuestion({
        question: "Czy kot ma napady padaczkowe?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy kot ma napady padaczkowe?"
    ) {
      setCurrentQuestion({

        question: "Czy mozesz stwierdzić u kota stan padaczkowy?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy kot ma napady padaczkowe?"
    ) {
      setCurrentQuestion({
        question: "Czy kot ma powiększenie obrysu jamy brzusznej?",
        answers: ["tak", "nie"],
      })
    }

    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy kot ma powiększenie obrysu jamy brzusznej?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: wykonaj dalszą diagnostykę" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy kot ma powiększenie obrysu jamy brzusznej?"
    ) {
      setCurrentQuestion({
        question: "Czy w okolicy żołądka jest wypuk bębękowy?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy w okolicy żołądka jest wypuk bębękowy?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Skręt żołądka" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy w okolicy żołądka jest wypuk bębękowy?"
    ) {
      setCurrentQuestion({
        question: "Czy występuje bladość błon śluzowych i ostry brzuch?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy występuje bladość błon śluzowych i ostry brzuch?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: Wykonaj dalszą diagnostykę" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy występuje bladość błon śluzowych i ostry brzuch?"
    ) {
      setCurrentQuestion({
        question: "Czy zwierzę miało kontakt z trucizną?",
        answers: ["tak", "nie"],
      })
    }

    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy zwierzę miało kontakt z trucizną?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Zatrucie trucizną" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy zwierzę miało kontakt z trucizną?"
    ) {
      setCurrentQuestion({
        question: "Czy zwierzę jest płuci żeńskiej?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy zwierzę jest płuci żeńskiej?"
    ) {
      setCurrentQuestion({
        question: "Czy w badaniu RTG/USG widać zmiany w prostacie?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy w badaniu RTG/USG widać zmiany w prostacie?"
    ) {
      setCurrentQuestion({
        question: "Czy zminay występują w pęcherzu moczowym?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy zminay występują w pęcherzu moczowym?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Rozrost nowotworowy" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy zminay występują w pęcherzu moczowym?"
    ) {
      setCurrentQuestion({
        question: "Czy zwierzę ma jakieś zmiany rozrostowe w innych narządach?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy zwierzę ma jakieś zmiany rozrostowe w innych narządach?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Otyłość" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy zwierzę ma jakieś zmiany rozrostowe w innych narządach?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: Wykonaj badanie krwi!" })
    }

    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy w badaniu RTG/USG widać zmiany w prostacie?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Przerost/torbiele prostaty" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy zwierzę jest płuci żeńskiej?"
    ) {
      setCurrentQuestion({
        question: "Czy w badaniu RTG/USG widać zmiany w macicy/jajnikach?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy w badaniu RTG/USG widać zmiany w macicy/jajnikach?"
    ) {
      setCurrentQuestion({
        question: "Czy zminay występują w pęcherzu moczowym?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy w badaniu RTG/USG widać zmiany w macicy/jajnikach?"
    ) {

      setCurrentQuestion({
        question: "Czy w macicy widać sympomy ciąży?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy w macicy widać sympomy ciąży?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Ciąza" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy w macicy widać sympomy ciąży?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: rozrost endometrium" })
    }

    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy mozesz stwierdzić u kota stan padaczkowy?"
    ) {
      setCurrentQuestion({
        question:
          "Czy kot zjadł coś podejrzeanego lub mógł mieć kontakt z substancją trującą?",
        answers: ["tak", "nie"],
      })
    }
    if (

      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Czy kot zjadł coś podejrzeanego lub mógł mieć kontakt z substancją trującą?"
    ) {
      setCurrentQuestion({
        question:
          "Czy u kota w momencie wystąpienia problemów atak pojawił się po raz pierwszy?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Czy u kota w momencie wystąpienia problemów atak pojawił się po raz pierwszy?"
    ) {
      setCurrentQuestion({
        question: "Czy poziom insuliny jest podwyższony lub prawidłowy?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy poziom insuliny jest podwyższony lub prawidłowy?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Wyspiak trzustkowy!" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy poziom insuliny jest podwyższony lub prawidłowy?"
    ) {

      setCurrentQuestion({
        question: "Czy poziom insuliny jest obniżony?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy poziom insuliny jest obniżony?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: Proszę wykonać USG narządów wewnętrznych" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy poziom insuliny jest obniżony?"
    ) {
      setCurrentQuestion({
        question:
          "Czy poziom mocznika jest obnoiony a parametry wątrobowe są podwyższone?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Czy poziom mocznika jest obnoiony a parametry wątrobowe są podwyższone?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Hepatopatia." })
    }
    if (
      previousAnswerRef.current === "nie" &&

      (currentQuestion as Question).question ===
      "Czy poziom mocznika jest obnoiony a parametry wątrobowe są podwyższone?"
    ) {
      setCurrentQuestion({
        question:
          "Czy wynik MR, TK, badanie płynu mózgowo-rdzeniowego są nie prawidłowe?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Czy wynik MR, TK, badanie płynu mózgowo-rdzeniowego są nie prawidłowe?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Nowotwór" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Czy wynik MR, TK, badanie płynu mózgowo-rdzeniowego są nie prawidłowe?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Choroba idiopatyczna" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Czy u kota w momencie wystąpienia problemów atak pojawił się po raz pierwszy?"
    ) {
      setCurrentQuestion({ diagnose: "Postepowanie: Wykonaj badania krwi i zleć konsultację neurologiczną" })
    }

    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Czy kot zjadł coś podejrzeanego lub mógł mieć kontakt z substancją trującą?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Podejrzenie zatrucia. Ewentualne wykazanie toksyn w organiźmie" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy mozesz stwierdzić u kota stan padaczkowy?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: Lecz doraźnie, pobierz krew do badań." })
    }
    if (
      previousAnswerRef.current === "pies" &&
      (currentQuestion as Question).question === "Pacjentem jest kot czy pies ?"
    ) {
      setCurrentQuestion({ question: "Czy pies jest po urazie?", answers: ["tak", "nie"] })
    }
    if (previousAnswerRef.current === "tak" && (currentQuestion as Question).question === "Czy pies jest po urazie?") {
      setCurrentQuestion({
        question: "Czy wszedł o własnych siłach?",
        answers: ["tak", "nie"],
      })
    }
    if (previousAnswerRef.current === "nie" && (currentQuestion as Question).question === "Czy pies jest po urazie?") {
      setCurrentQuestion({
        question: "Czy u psa występuje biegunka?",
        answers: ["tak", "nie"],
      })

    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy u psa występuje biegunka?"
    ) {
      setCurrentQuestion({
        question: "Czy u psa wystpuje świąd?",
        answers: ["tak", "nie"],
      })
    }
    if (previousAnswerRef.current === "tak" && (currentQuestion as Question).question === "Czy u psa wystpuje świąd?") {
      setCurrentQuestion({
        question: "Czy znaleziono pasożyty?",
        answers: ["nie", "tak"],
      })
    }
    if (previousAnswerRef.current === "tak" && (currentQuestion as Question).question === "Czy znaleziono pasożyty?") {
      setCurrentQuestion({ diagnose: "Diagnoza: Pasożyty. Postępowanie: Zweryfikować pasożyty i zastosować odpowiednie leczenie przeciwpasożytnicze" })
    }
    if (previousAnswerRef.current === "nie" && (currentQuestion as Question).question === "Czy znaleziono pasożyty?") {
      setCurrentQuestion({
        question:
          "Postępowanie: zastosowanie profilaktycznego zwalczania pcheł. Czy świąd ustał?",
        answers: ["nie", "tak"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===

      "Postępowanie: Zastosowanie profilaktycznego zwalczania pcheł. Czy świąd ustał?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Pchły. Postępowanie: Zastosowanć odpowiednie leczenie" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Zastosowanie profilaktycznego zwalczania pcheł. Czy świąd ustał?"
    ) {
      setCurrentQuestion({
        question:
          "Postępowanie: Wykonać badanie poznawcze na obecność świerzbu. Czy znaleziono objawy świerzbu",
        answers: ["nie", "tak"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Wykonać badanie poznawcze na obecność świerzbu. Czy znaleziono objawy świerzbu"
    ) {
      setCurrentQuestion({
        question:
          "Diagnoza: świerzb. Postępowanie: Proszę zastosować leczenie przeciwświerzbowe",
        answers: ["nie", "tak"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Wykonać badanie poznawcze na obecność świerzbu. Czy znaleziono objawy świerzbu?"

    ) {
      setCurrentQuestion({
        question:
          "Postępowanie: Wykonać cytologię. Czy cytologia wykazała brak mikroorganizmów?",
        answers: ["nie", "tak"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Wykonać cytologię. Czy cytologia wykazała brak mikroorganizmów?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: alergia. Postępowanie: proszę zastosować dietę eliminacyjną" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Wykonać cytologię. Czy cytologia wykazała brak mikroorganizmów?"
    ) {
      setCurrentQuestion({
        question: "Czy cytologia wykazała bakterie?",
        answers: ["nie", "tak"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy cytologia wykazała bakterie?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: Proszę podać właściwe antybiotyki" })
    }

    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy cytologia wykazała bakterie?"
    ) {
      setCurrentQuestion({ diagnose: "Brak rozwiniętego modułu diagnostyki dla danego przypadku." })
    }
    if (previousAnswerRef.current === "nie" && (currentQuestion as Question).question === "Czy u psa wystpuje świąd?") {
      setCurrentQuestion({
        question: "Czy występują wyłysienia?",
        answers: ["występują", "nie występują"],
      })
    }
    if (
      previousAnswerRef.current === "nie występują" &&
      (currentQuestion as Question).question === "Czy występują wyłysienia?"
    ) {
      setCurrentQuestion({
        question: "Czy znaleziono na ciele jakieś guzy?",
        answers: ["Znaleziono", "Nie znaleziono"],
      })
    }
    if (
      previousAnswerRef.current === "Znaleziono" &&
      (currentQuestion as Question).question === "Czy znaleziono na ciele jakieś guz?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: proszę zlecić biopsję. Prawdopodobna diagnoza: nowotwór" })
    }
    if (
      previousAnswerRef.current === "Nie znaleziono" &&
      (currentQuestion as Question).question === "Czy znaleziono na ciele jakieś guzy?"

    ) {
      setCurrentQuestion({
        question: "Czy znaleziono owrzodzenia?",
        answers: ["Tak", "Nie"],
      })
    }
    if (previousAnswerRef.current === "Tak" && (currentQuestion as Question).question === "Czy znaleziono owrzodzenia?") {
      setCurrentQuestion({ diagnose: "Postępowanie:Wykonać cytologię. Prawdopodobna diagnoza:ropowica połączeń śluzowo-skórnych" })
    }
    if (previousAnswerRef.current === "Nie" && (currentQuestion as Question).question === "Czy znaleziono owrzodzenia?") {
      setCurrentQuestion({
        question: "Czy znaleziono zmiany barwnikowe?",
        answers: ["Tak", "Nie"],
      })
    }
    if (
      previousAnswerRef.current === "Tak" &&
      (currentQuestion as Question).question === "Czy znaleziono zmiany barwnikowe?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: proszę wykonać biopsję" })
    }
    if (
      previousAnswerRef.current === "Nie" &&
      (currentQuestion as Question).question === "Czy znaleziono zmiany barwnikowe?"
    ) {
      setCurrentQuestion({ diagnose: "Potencjalna diagnoza: Leiszmanioza" })
    }
    if (
      previousAnswerRef.current === "występują" &&
      (currentQuestion as Question).question === "Czy występują wyłysienia?"

    ) {
      setCurrentQuestion({
        question:
          "Postępowanie: proszę zlecić posiew i cytologię. Czy badania zostały wykonane?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Postępowanie: proszę zlecić posiew i cytologię. Czy badania zostały wykonane?"
    ) {
      setCurrentQuestion({
        question:
          "Postępowanie: proszę zlecić posiew i cytologię. Czy badania zostały wykonane?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Postępowanie: proszę zlecić posiew i cytologię. Czy badania zostały wykonane?"
    ) {
      setCurrentQuestion({
        question: "Czy badania wskazały na obecność pasozytów?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&

      (currentQuestion as Question).question === "Czy badania wskazały na obecność pasozytów?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza:Pasoyty. Postępowanie: Proszę wykonać dermatolofizę" })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy badania wskazały na obecność pasozytów?"
    ) {
      setCurrentQuestion({
        question: "Czy łysienie jest symetrycznie rozsiane?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy łysienie jest symetrycznie rozsiane?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: proszę wykonać biopsję i zinterpretować wyniki" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy łysienie jest symetrycznie rozsiane?"
    ) {
      setCurrentQuestion({
        question:
          "Postępowanie: Proszę wykonać hematologię i trichogram. Czy wyniki były prawidłowe?",
        answers: ["tak", "nie"],
      })
    }
    if (

      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Proszę wykonać hematologię i trichogram. Czy wyniki były prawidłowe?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: niedoczynność tarczycy. Postępowanie: Proszę podjąć leczenie." })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Proszę wykonać hematologię i trichogram. Czy wyniki były prawidłowe?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Choroby wrodzone lub łysienie rozjaśnienie." })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy u psa występuje biegunka?"
    ) {
      setCurrentQuestion({
        question: "Czy występują równiez wymioty?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy występują równiez wymioty?"
    ) {
      setCurrentQuestion({
        question: "Czy objawy są przewlekłe?",
        answers: ["tak", "nie"],
      })

    }
    if (previousAnswerRef.current === "tak" && (currentQuestion as Question).question === "Czy objawy są przewlekłe?") {
      setCurrentQuestion({
        question:
          "Czy zlecono badanie morfologiczne krwi,biochemiczne surowicy i badanie kału?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question ===
      "Czy zlecono badanie morfologiczne krwi,biochemiczne surowicy i badanie kału?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: Proszę zlecić wymagane badania w celu dalszej diagnozy" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question ===
      "Czy zlecono badanie morfologiczne krwi,biochemiczne surowicy i badanie kału?"
    ) {
      setCurrentQuestion({
        question: "Czy badanie morfologiczne lub biochemiczne nie było w normie?",
        answers: ["tak, nie było", "nie, były prawidłowe"],
      })
    }
    if (
      previousAnswerRef.current === "nie, były prawidłowe" &&
      (currentQuestion as Question).question === "Czy badanie morfologiczne lub biochemiczne nie było w normie?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: choroba ogólnoustrojowa, zastosuj leczeinie antybiotykowe" })

    }
    if (
      previousAnswerRef.current === "tak, nie było" &&
      (currentQuestion as Question).question === "Czy badanie morfologiczne lub biochemiczne nie było w normie?"
    ) {
      setCurrentQuestion({
        question: "Czy badanie kału równiez było poza normą?",
        answers: ["Tak było poza normą", " Nie, było w normie "],
      })
    }
    if (
      previousAnswerRef.current === "Tak było poza normą" &&
      (currentQuestion as Question).question === "Czy badanie kału równiez było poza normą?"
    ) {
      setCurrentQuestion({
        question:
          "Postępowanie: Proszę wykonać badanie USG, Czy wykonano badanie?",
        answers: ["Wynonano", "Nie wykonano"],
      })
    }
    if (
      previousAnswerRef.current === "Nie wykonano" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Proszę wykonać badanie USG, Czy wykonano badanie?"
    ) {
      setCurrentQuestion({
        question:
          "Postępowanie: Proszę wykonać badanie USG, Czy wykonano badanie?",
        answers: ["Wynonano", "Nie wykonano"],
      })

    }
    if (
      previousAnswerRef.current === "Wynonano" &&
      (currentQuestion as Question).question ===
      "Postępowanie: Proszę wykonać badanie USG, Czy wykonano badanie?"
    ) {
      setCurrentQuestion({
        question: "Czy znaleziono coś niepokojącego podczas badania USG?",
        answers: ["Tak", "Nie"],
      })
    }
    if (
      previousAnswerRef.current === "Nie" &&
      (currentQuestion as Question).question === "Czy znaleziono coś niepokojącego podczas badania USG?"
    ) {
      setCurrentQuestion({
        question:
          "Proszę wykonać laparotomię. Czy badanie wykazało jakieś nieprawidłości?",
        answers: ["Tak", "Nie"],
      })
    }
    if (
      previousAnswerRef.current === "Nie" &&
      (currentQuestion as Question).question ===
      "Proszę wykonać laparotomię. Czy badanie wykazało jakieś nieprawidłości?"
    ) {
      setCurrentQuestion({ diagnose: "Brak 100% diagnozy, proszę wykonać dodatkowe badania" })
    }
    if (
      previousAnswerRef.current === "Tak" &&

      (currentQuestion as Question).question ===
      "Proszę wykonać laparotomię. Czy badanie wykazało jakieś nieprawidłości?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: proszę przystąpić do działań chirurgicznych" })
    }
    if (
      previousAnswerRef.current === "Tak" &&
      (currentQuestion as Question).question === "Czy znaleziono coś niepokojącego podczas badania USG?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: proszę zinterpretować nieprawidłowośc i podjąc działanie chirurgiczne" })
    }
    if (
      previousAnswerRef.current === "Nie, było w normie" &&
      (currentQuestion as Question).question === "Czy badanie kału równiez było poza normą?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza:Podejrzenie choroby ogólnoustrojowej" })
    }
    if (previousAnswerRef.current === "nie" && (currentQuestion as Question).question === "Czy objawy są przewlekłe?") {
      setCurrentQuestion({
        question: "Czy pies jadł coś nowego?",
        answers: ["tak", "nie"],
      })
    }
    if (previousAnswerRef.current === "nie" && (currentQuestion as Question).question === "Czy pies jadł coś nowego?") {
      setCurrentQuestion({ diagnose: "Postępowanie: zlecenie badań bakteryjnych. Potencjalna diagnoza: Zatrucie bakteryjne układu pokarmowego" })
    }
    if (previousAnswerRef.current === "tak" && (currentQuestion as Question).question === "Czy pies jadł coś nowego?") {
      setCurrentQuestion({ diagnose: "Diagnoza: Zatrucie pokarmowe. Dodatkowe postępowanie: Zrobienie testów alergicznych " })
    }
    if (

      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy występują równiez wymioty?"
    ) {
      setCurrentQuestion({
        question: "Czy objawy pojawiły się nagle?",
        answers: ["tak", "nie"],
      })
    }

    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy objawy pojawiły się nagle?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: zlecić badania kału. Podać kroplówkę " })
    }

    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy objawy pojawiły się nagle?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Zatrucie pokarmowe lub niestrawność, zalecana obserwacja " })
    }

    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy wszedł o własnych siłach?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: Wykonaj RTG i opatrz rany" })

    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy wszedł o własnych siłach?"
    ) {
      setCurrentQuestion({ question: "Czy oddycha?", answers: ["tak", "nie"] })
    }
    if (previousAnswerRef.current === "tak" && (currentQuestion as Question).question === "Czy oddycha?") {
      setCurrentQuestion({
        question: "Czy liczba oddechów jest prawidłowa?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy liczba oddechów jest prawidłowa?"
    ) {
      setCurrentQuestion({
        question: "Czy widać krwawienia?",
        answers: ["tak", "nie"],
      })
    }
    if (previousAnswerRef.current === "nie" && (currentQuestion as Question).question === "Czy widać krwawienia?") {
      setCurrentQuestion({ diagnose: "Postępowanie: Wykonaj prześwietlenia i zaleć obserwację psa." })
    }
    if (previousAnswerRef.current === "tak" && (currentQuestion as Question).question === "Czy widać krwawienia?") {
      setCurrentQuestion({ diagnose: "Postępowanie: Zatamuj krwawienie i podaj leki na zwiękrzenie krzepliwości krwi" })
    }
    if (
      previousAnswerRef.current === "nie" &&

      (currentQuestion as Question).question === "Czy liczba oddechów jest prawidłowa?"
    ) {
      setCurrentQuestion({ diagnose: "Postępowanie: podepnij zestaw do monitorowania pracy serca i podaj odpowiednie leki " })
    }
    if (previousAnswerRef.current === "nie" && (currentQuestion as Question).question === "Czy oddycha?") {
      setCurrentQuestion({
        question: "Przystąpiono do podstawowej rescucytacji?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Przystąpiono do podstawowej rescucytacji?"
    ) {
      setCurrentQuestion({ diagnose: "Przystąp do resuscytacji" })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Przystąpiono do podstawowej rescucytacji?"
    ) {
      setCurrentQuestion({
        question: "Czy zwierzę odzyskało oddech?",
        answers: ["tak", "nie"],
      })
    }
    if (
      previousAnswerRef.current === "tak" &&
      (currentQuestion as Question).question === "Czy zwierzę odzyskało oddech?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza:Przeprowadź badanie mające na celu znalezienie złamań" })

    }
    if (
      previousAnswerRef.current === "nie" &&
      (currentQuestion as Question).question === "Czy zwierzę odzyskało oddech?"
    ) {
      setCurrentQuestion({ diagnose: "Diagnoza: Zwierzę nie zyje" })
    }

  };

}

