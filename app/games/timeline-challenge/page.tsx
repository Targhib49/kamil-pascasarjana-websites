'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

type Event = {
  id: number;
  title: string;
  year: number;
  description: string;
  category: 'islamic' | 'modern';
};

export default function TimelineChallengeGame() {
  const events: Event[] = [
    { id: 1, title: 'Algebra Founded', year: 820, description: 'Al-Khwarizmi writes the first algebra book', category: 'islamic' },
    { id: 2, title: 'First University', year: 859, description: 'University of Al Quaraouiyine founded', category: 'islamic' },
    { id: 3, title: 'Optics Revolution', year: 1021, description: 'Ibn al-Haytham publishes Book of Optics', category: 'islamic' },
    { id: 4, title: 'Canon of Medicine', year: 1025, description: 'Ibn Sina completes medical encyclopedia', category: 'islamic' },
    { id: 5, title: 'Theory of Relativity', year: 1905, description: 'Einstein publishes special relativity', category: 'modern' },
    { id: 6, title: 'DNA Structure', year: 1953, description: 'Watson and Crick discover DNA double helix', category: 'modern' },
  ];

  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [shuffledEvents, setShuffledEvents] = useState<Event[]>([]);
  const [userOrder, setUserOrder] = useState<Event[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = () => {
    const shuffled = [...events].sort(() => Math.random() - 0.5).slice(0, 4);
    setShuffledEvents(shuffled);
    setUserOrder([]);
    setGameStarted(true);
    setShowResult(false);
    setCurrentRound(1);
    setScore(0);
  };

  const addToTimeline = (event: Event) => {
    if (!userOrder.find(e => e.id === event.id)) {
      setUserOrder([...userOrder, event]);
    }
  };

  const removeFromTimeline = (eventId: number) => {
    setUserOrder(userOrder.filter(e => e.id !== eventId));
  };

  const checkAnswer = () => {
    const correctOrder = [...userOrder].sort((a, b) => a.year - b.year);
    const correct = JSON.stringify(userOrder.map(e => e.id)) === JSON.stringify(correctOrder.map(e => e.id));
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 100);
    }
  };

  const nextRound = () => {
    const shuffled = [...events].sort(() => Math.random() - 0.5).slice(0, 4);
    setShuffledEvents(shuffled);
    setUserOrder([]);
    setShowResult(false);
    setCurrentRound(currentRound + 1);
  };

  const getCategoryColor = (category: string) => {
    return category === 'islamic' ? 'from-green-500 to-emerald-600' : 'from-blue-500 to-cyan-600';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-orange-600 to-red-600 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/games" className="text-white/80 hover:text-white text-sm font-semibold mb-2 inline-block">
                ← Back to Games
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Timeline Challenge</h1>
              <p className="text-xl text-orange-100 mt-2">Arrange historical events in chronological order</p>
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
                    <div className="text-6xl mb-6">⏳</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for the Challenge?</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Test your knowledge of history by arranging events from oldest to most recent!
                    </p>
                    <button
                      onClick={startGame}
                      className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition shadow-lg"
                    >
                      Start Challenge
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Stats Bar */}
                    <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <span className="text-sm text-gray-600">Score</span>
                        <div className="text-2xl font-bold text-orange-600">{score}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Round</span>
                        <div className="text-2xl font-bold text-purple-600">{currentRound}</div>
                      </div>
                    </div>

                    {!showResult ? (
                      <>
                        {/* Available Events */}
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Events to Arrange:</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {shuffledEvents.filter(e => !userOrder.find(u => u.id === e.id)).map((event) => (
                              <button
                                key={event.id}
                                onClick={() => addToTimeline(event)}
                                className={`p-4 rounded-xl text-left bg-gradient-to-br ${getCategoryColor(event.category)} text-white hover:scale-105 transition shadow-lg`}
                              >
                                <h4 className="font-bold mb-1">{event.title}</h4>
                                <p className="text-sm opacity-90">{event.description}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">⏰ Your Timeline (Oldest → Newest):</h3>
                          <div className="bg-gray-50 rounded-xl p-6 min-h-[200px]">
                            {userOrder.length === 0 ? (
                              <p className="text-center text-gray-400 py-12">Drag events here or click to add them</p>
                            ) : (
                              <div className="space-y-4">
                                {userOrder.map((event, index) => (
                                  <div key={event.id} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                                      {index + 1}
                                    </div>
                                    <div className="flex-1 p-4 bg-white rounded-xl shadow border border-gray-200">
                                      <h4 className="font-bold">{event.title}</h4>
                                      <p className="text-sm text-gray-600">{event.description}</p>
                                    </div>
                                    <button
                                      onClick={() => removeFromTimeline(event.id)}
                                      className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Submit Button */}
                        {userOrder.length === shuffledEvents.length && (
                          <div className="text-center">
                            <button
                              onClick={checkAnswer}
                              className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg"
                            >
                              Check Answer
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Result */
                      <div className={`text-center p-8 rounded-xl border-2 ${
                        isCorrect 
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-500' 
                          : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-500'
                      }`}>
                        <div className="text-6xl mb-4">{isCorrect ? '🎉' : '😅'}</div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {isCorrect ? 'Perfect!' : 'Not Quite!'}
                        </h3>
                        <p className="text-lg text-gray-600 mb-6">
                          {isCorrect 
                            ? 'You arranged all events correctly!' 
                            : 'Check the correct order below and try again.'}
                        </p>

                        {/* Correct Order */}
                        <div className="bg-white rounded-xl p-6 mb-6 text-left">
                          <h4 className="font-bold mb-4 text-center">Correct Timeline:</h4>
                          <div className="space-y-3">
                            {[...shuffledEvents].sort((a, b) => a.year - b.year).map((event) => (
                              <div key={event.id} className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-20 h-12 bg-orange-600 text-white rounded-lg flex items-center justify-center font-bold">
                                  {event.year}
                                </div>
                                <div>
                                  <h5 className="font-bold">{event.title}</h5>
                                  <p className="text-sm text-gray-600">{event.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={nextRound}
                          className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition shadow-lg"
                        >
                          Next Round
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>Click events to add them to your timeline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>Arrange from oldest to newest</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>Click "Check Answer" when ready</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>Learn from the correct timeline!</span>
                  </li>
                </ul>
              </div>

              {/* Categories */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600"></div>
                    <span className="font-semibold text-sm">Islamic Golden Age</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600"></div>
                    <span className="font-semibold text-sm">Modern Science</span>
                  </div>
                </div>
              </div>

              {/* Fun Fact */}
              {gameStarted && (
                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Fun Fact</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The Islamic Golden Age (8th-14th century) saw groundbreaking advances in mathematics, 
                    astronomy, medicine, and philosophy that influenced European Renaissance.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}