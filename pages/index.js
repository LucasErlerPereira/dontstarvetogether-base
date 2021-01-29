import React from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Link from '../src/components/Link';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Teste seus conhecimentos sobre o Don't Starve Together</p>
            <form onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name=""
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="coloque seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                começar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
