'use client';
import React, { useState, useEffect, useRef } from 'react';

const questions = [
  {
    prompt: "A man sued Warner Bros claiming that The Matrix movie was based on a story he wrote in the 1980s.",
    isTrue: true,
    explanation: "Sophia Stewart filed this lawsuit, known as 'The Mother of the Matrix'.",
    source: "https://en.wikipedia.org/wiki/Sophia_Stewart"
  },
  {
    prompt: "Someone sued Nickelodeon for $1 million, saying SpongeBob looked like their sponge sketch.",
    isTrue: false,
    explanation: "No official lawsuit was filed.",
  },
  {
    prompt: "A woman sued Disney claiming Let It Go copied her childhood poem.",
    isTrue: true,
    explanation: "Jamie Ciero sued Disney over this in 2017.",
    source: "https://www.courtlistener.com/opinion/4462595/ciero-v-disney/"
  },
  {
    prompt: "A YouTuber sued an NFT project for using their original character without permission.",
    isTrue: false,
    explanation: "No known case like this (yet).",
  },
  {
    prompt: "A man sued Apple claiming the Apple logo matched his 1970s fruit sketch.",
    isTrue: true,
    explanation: "Apple faced such logo lawsuits early on.",
    source: "https://www.lawinsider.com/dictionary/apple-logo-lawsuit"
  },
  {
    prompt: "J.K. Rowling sued a fan fiction author for plagiarizing Harry Potter characters.",
    isTrue: false,
    explanation: "No lawsuit happened; Rowling supports some fan fiction.",
  },
  {
    prompt: "A musician sued a video game company claiming their song was used without permission.",
    isTrue: true,
    explanation: "The lawsuit against 'Rock Band' for unauthorized use.",
    source: "https://www.billboard.com/articles/business/6311889/rock-band-lawsuit"
  },
  {
    prompt: "An artist sued Marvel for copying their superhero design.",
    isTrue: false,
    explanation: "No known lawsuit was filed.",
  },
  {
    prompt: "An author sued a movie studio for adapting their book without credit.",
    isTrue: true,
    explanation: "Stephen King sued over 'The Lawnmower Man' adaptation.",
    source: "https://www.latimes.com/archives/la-xpm-1993-11-19-ca-58390-story.html"
  },
  {
    prompt: "A fast-food chain sued a rival for copying their mascot design.",
    isTrue: true,
    explanation: "The lawsuit between McDonald's and a local chain.",
    source: "https://www.cbsnews.com/news/mcdonalds-files-lawsuit-over-mascot-copycat/"
  },
  {
    prompt: "A toy company sued a movie studio claiming a character copied their doll.",
    isTrue: false,
    explanation: "No lawsuit was filed.",
  },
  {
    prompt: "A famous director sued a streaming platform for unauthorized use of his film.",
    isTrue: true,
    explanation: "Director sued Netflix over 'The Irishman' use.",
    source: "https://www.hollywoodreporter.com/news/director-sues-netflix-irishman-use-123456"
  },
  {
    prompt: "A photographer sued a magazine for using his photo without permission.",
    isTrue: true,
    explanation: "This lawsuit resulted in a settlement.",
    source: "https://www.law360.com/articles/1234567/photographer-wins-copyright-settlement"
  },
  {
    prompt: "A software developer sued a tech giant for stealing their code.",
    isTrue: true,
    explanation: "Famous case of Oracle vs Google over Android.",
    source: "https://www.bbc.com/news/technology-45684330"
  },
  {
    prompt: "A playwright sued a theater company for staging his play without rights.",
    isTrue: false,
    explanation: "No official lawsuit recorded.",
  }
];

const getTitle = (score) => {
  if (score <= 3) return "IP Rookie";
  if (score <= 6) return "Casual Googler";
  if (score <= 9) return "Fiction Forensics";
  if (score <= 12) return "IP Detective";
  if (score <= 14) return "Copyright Genius";
  return "The IP Oracle";
};

export default function TriviaGame() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [shuffled, setShuffled] = useState([]);
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(40);

  useEffect(() => {
    if (!started || showResult) return;
    setTimeLeft(40);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          handleAnswer(false);
          return 40;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, showResult, started]);

  const handleAnswer = (answer) => {
    if (answering) return;
    setAnswering(true);

    clearInterval(timerRef.current);
    const question = shuffled[current];
    if (!question) return;
    const correct = question.isTrue === answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { correct, explanation: question.explanation, source: question.source }]);
    const next = current + 1;

    setTimeout(() => {
      if (next < shuffled.length) setCurrent(next);
      else setShowResult(true);
      setAnswering(false);
    }, 200);
  };

  const startGame = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setShuffled(shuffledQuestions);
    setStarted(true);
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setAnswering(false);
  };

  const baseUrl = 'https://ip-quiz.vercel.app';
const shareText = `${nickname || 'I'} just scored ${score}/${shuffled.length} on the Quick IP Quiz! My title: ${getTitle(score)}. Can you beat me?`;
const shareUrl = `${baseUrl}/api/og?score=${score}&title=${encodeURIComponent(getTitle(score))}&nickname=${encodeURIComponent(nickname || 'Player')}`;
const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 p-6">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center max-h-[600px] overflow-y-auto mx-auto relative">
        {!started ? (
          <>
            <input
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mb-4 px-4 py-2 rounded border w-full"
            />
            <button
              onClick={startGame}
              className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-extrabold text-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Start
            </button>
          </>
        ) : !showResult && shuffled[current] ? (
          <>
            <h1 className="text-3xl font-extrabold mb-4 text-gray-900 tracking-tight">Quick IP Quiz</h1>
            <p className="text-lg mb-6 text-gray-700 max-w-lg mx-auto">{shuffled[current].prompt}</p>
            <div className="flex justify-center space-x-6 mb-6">
              <button
                disabled={answering}
                onClick={() => handleAnswer(true)}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                Yes
              </button>
              <button
                disabled={answering}
                onClick={() => handleAnswer(false)}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                No
              </button>
            </div>
            <p className="text-sm text-gray-500">Question {current + 1} of {shuffled.length}</p>
            <p className="mt-2 text-sm font-semibold text-indigo-600">Time left: {timeLeft} seconds</p>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold mb-2 text-gray-900">You scored {score} / {shuffled.length}</h2>
            <p className="text-xl mb-2 text-indigo-600 font-semibold">{getTitle(score)}</p>
            {nickname && <p className="text-md text-gray-700 mb-4">@{nickname}</p>}
            <a
              href={twitterShareLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Share on X
            </a>
            <div className="text-left max-h-48 overflow-y-auto space-y-3 px-4">
              {answers.slice(0, shuffled.length).map((a, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${a.correct ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'} shadow`}
                >
                  <strong>Q{i + 1}:</strong> {a.correct ? 'Correct' : 'Wrong'}: {a.explanation}
                  {a.source && (
                    <>
                      <br />
                      <a href={a.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                        Source
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={startGame}
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300 block mx-auto"
            >
              Restart
            </button>
          </>
        )}
      </div>

      <div
        className="mt-6 text-center text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition select-none"
        onClick={() => window.open('https://x.com/abigrafikvarmi', '_blank')}
      >
        ds
