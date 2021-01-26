import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1>Don't Starve Together Quiz</h1>
          </Widget.Header>

          <Widget.Content>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Teste seus conhecimentos sobre o Don't Starve Together</p>
          </Widget.Content>

          <Widget.Form>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <input 
                onChange={function (infosDoEvento) {
                  setName(infosDoEvento.target.value);
                }}
                placeholder="Fala seu nome"
              />
              <button type="submit" disabled={name.length === 0}>
                COMEÇAR
              </button>
            </form>
          </Widget.Form>

        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <p>links em breve</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
