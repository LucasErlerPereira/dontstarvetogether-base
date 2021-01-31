/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import db from '../../db.json';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Widget from '../../src/components/Widget';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import Button from '../../src/components/Button';

function LoadingWidget() {
  // const externalGif = db.external[0].gif_load;
  return (
    <Widget>
      <Widget.Header>
        <h3>Carregando Quiz...aguarde</h3>
      </Widget.Header>
      <Image
        src="/assets/images/dst_loading.gif"
        alt="gif de loading"
        width={350}
        height={200}
        layout="responsive"
      />
    </Widget>
  );
}

function ResultWidget({ results }) {
  // const externalImageResult = db.external[0].image_result;
  const router = useRouter();
  return (
    <Widget>
      <Widget.Header>
        <div>
          <BackLinkArrow href="/" />
          <span>voltar a home</span>
        </div>
        <h2>{`Parabéns ${router.query.name} por terminar o quiz!`}</h2>
      </Widget.Header>
      <Image
        src="/assets/images/end_quiz.gif"
        alt="gif de loading"
        width={250}
        height={200}
        layout="responsive"
      />
      <Widget.Content>
        <Widget.Header>
          <h3>
            Sua pontuação final é
            {' '}
            {results.reduce((currentSum, currentResult) => {
              const isRight = currentResult === true;

              if (isRight) {
                return currentSum + 1;
              }
              if (currentSum === false) {
                return 0;
              }
              return currentSum;
            })}
          </h3>
        </Widget.Header>

        <ul id="userAnswersList">
          {results.map((result, index) => {
            const resultId = `result__${index}`;

            return (
              <li
                key={resultId}
                className={result === true
                  ? 'success_result'
                  : 'error_result'}
              >
                #
                {index + 1}
                {' '}
                {result === true
                  ? 'Acertou'
                  : 'Errou'}

              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  totalQuestions,
  questionIndex,
  question,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorret = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${questionIndex + 1} de `}
          {` ${totalQuestions} `}
        </h1>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorret);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorret ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            confirmar
          </Button>
          {/* {isQuestionSubmited && isCorret && <p>Acertooou!</p>}
          {isQuestionSubmited && !isCorret && <p>Erroouu!</p>} */}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            question={question}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
