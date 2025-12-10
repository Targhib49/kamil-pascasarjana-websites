'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ScholarlyWordsGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // Sample academic words - in real app, this would come from database
  const wordBank = [
    'RESEARCH', 'ANALYSIS', 'THEORY', 'METHOD', 'STUDY',
    'THESIS', 'ABSTRACT', 'CITATION', 'JOURNAL', 'ACADEMIC'
  ];

  const grid = [
    ['R', 'E', 'S', 'E', 'A', 'R', 'C', 'H'],
    ['T', 'H', 'E', 'O', 'R', 'Y', 'M', 'E'],
    ['A', 'N', 'A', 'L', 'Y', 'S', 'I', 'S'],
    ['M', 'E', 'T', 'H', 'O', 'D', 'T', 'I'],
    ['S', 'T', 'U', 'D', 'Y', 'L', 'H', 'S'],
    ['C', 'I', 'T', 'A', 'T', 'I', 'O', 'N'],
    ['J', 'O', 'U', 'R', 'N', 'A', 'L', 'S'],
    ['A', 'B', 'S', 'T', 'R', 'A', 'C', 'T'],
  ];

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setFoundWords([]);
    setTimeLeft(120);
  };

  const checkWord = () => {
    if (wordBank.includes(currentWord.toUpperCase()) && !foundWords.includes(currentWord.toUpperCase())) {
      setFoundWords([...foundWords, currentWord.toUpperCase()]);
      setScore(score + currentWord.length * 10);
      setCurrentWord('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/games" className="text-white/80 hover:text-white text-sm font-semibold mb-2 inline-block">
                ← Back to Games
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Scholarly Words</h1>
              <p className="text-xl text-blue-100 mt-2">Find academic terms hidden in the grid</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Game Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                {!gameStarted ? (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-6">📝</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Play?</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Find all the academic words hidden in the grid. Click on letters to spell out words!
                    </p>
                    <button
                      onClick={startGame}
                      className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
                    >
                      Start Game
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Stats Bar */}
                    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <span className="text-sm text-gray-600">Score</span>
                        <div className="text-2xl font-bold text-blue-600">{score}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Time Left</span>
                        <div className={`text-2xl font-bold ${timeLeft < 30 ? 'text-red-600' : 'text-green-600'}`}>
                          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Words Found</span>
                        <div className="text-2xl font-bold text-purple-600">{foundWords.length}/{wordBank.length}</div>
                      </div>
                    </div>

                    {/* Word Grid */}
                    <div className="mb-6">
                      <div className="inline-block bg-gray-50 rounded-xl p-4">
                        {grid.map((row, i) => (
                          <div key={i} className="flex gap-2 mb-2 last:mb-0">
                            {row.map((letter, j) => (
                              <button
                                key={j}
                                onClick={() => setCurrentWord(currentWord + letter)}
                                className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg font-bold text-xl hover:bg-blue-100 hover:border-blue-600 transition"
                              >
                                {letter}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Word Input */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Current Word:</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={currentWord}
                            onChange={(e) => setCurrentWord(e.target.value.toUpperCase())}
                            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-bold text-xl text-center uppercase"
                            placeholder="Type or click letters"
                          />
                          <button
                            onClick={checkWord}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
                          >
                            Check
                          </button>
                          <button
                            onClick={() => setCurrentWord('')}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>Click letters in the grid or type to spell words</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>Click "Check" to submit your word</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>Find all academic terms before time runs out</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>Longer words = more points!</span>
                  </li>
                </ul>
              </div>

              {/* Found Words */}
              {gameStarted && (
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Found Words</h3>
                  {foundWords.length === 0 ? (
                    <p className="text-sm text-gray-600">No words found yet...</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {foundWords.map((word, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Leaderboard */}
              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Top Scores</h3>
                <div className="space-y-2">
                  {[
                    { name: "Ahmed K.", score: 850 },
                    { name: "Fatima R.", score: 720 },
                    { name: "You", score: score }
                  ].map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-gray-500">{index + 1}</span>
                        <span className="font-semibold">{player.name}</span>
                      </div>
                      <span className="font-bold text-purple-600">{player.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}