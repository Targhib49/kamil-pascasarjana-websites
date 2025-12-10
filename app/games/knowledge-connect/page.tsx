'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

type Card = {
  id: number;
  text: string;
  category: 'science' | 'islam' | 'modern';
  matched: boolean;
};

export default function KnowledgeConnectGame() {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const initialCards: Card[] = [
    { id: 1, text: 'Algebra', category: 'science', matched: false },
    { id: 2, text: 'Al-Khwarizmi', category: 'islam', matched: false },
    { id: 3, text: 'Optics', category: 'science', matched: false },
    { id: 4, text: 'Ibn al-Haytham', category: 'islam', matched: false },
    { id: 5, text: 'Medicine', category: 'science', matched: false },
    { id: 6, text: 'Ibn Sina (Avicenna)', category: 'islam', matched: false },
    { id: 7, text: 'Algorithm', category: 'modern', matched: false },
    { id: 8, text: 'Computer Science', category: 'modern', matched: false },
  ];

  const [cards, setCards] = useState(initialCards);

  const matches = [
    { pair: [1, 2], connection: 'Al-Khwarizmi founded Algebra' },
    { pair: [3, 4], connection: 'Ibn al-Haytham pioneered Optics' },
    { pair: [5, 6], connection: 'Ibn Sina advanced Medicine' },
    { pair: [7, 8], connection: 'Algorithms are fundamental to Computer Science' },
  ];

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setMatchedPairs(0);
    setSelectedCards([]);
    setCards(initialCards.sort(() => Math.random() - 0.5));
  };

  const selectCard = (card: Card) => {
    if (selectedCards.length < 2 && !card.matched) {
      const newSelected = [...selectedCards, card];
      setSelectedCards(newSelected);

      if (newSelected.length === 2) {
        // Check for match
        setTimeout(() => {
          checkMatch(newSelected);
        }, 500);
      }
    }
  };

  const checkMatch = (selected: Card[]) => {
    const match = matches.find(m => 
      (m.pair.includes(selected[0].id) && m.pair.includes(selected[1].id))
    );

    if (match) {
      // Correct match
      setCards(cards.map(c => 
        selected.find(s => s.id === c.id) ? { ...c, matched: true } : c
      ));
      setScore(score + 100);
      setMatchedPairs(matchedPairs + 1);
    }
    
    setSelectedCards([]);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'science': return 'from-blue-500 to-cyan-600';
      case 'islam': return 'from-green-500 to-emerald-600';
      case 'modern': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-purple-600 to-pink-600 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/games" className="text-white/80 hover:text-white text-sm font-semibold mb-2 inline-block">
                ← Back to Games
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Knowledge Connect</h1>
              <p className="text-xl text-purple-100 mt-2">Match concepts and discover interdisciplinary connections</p>
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
                    <div className="text-6xl mb-6">🔗</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Connect?</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Match related concepts from different disciplines and learn about their connections!
                    </p>
                    <button
                      onClick={startGame}
                      className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition shadow-lg"
                    >
                      Start Game
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Stats Bar */}
                    <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <span className="text-sm text-gray-600">Score</span>
                        <div className="text-2xl font-bold text-purple-600">{score}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Matches</span>
                        <div className="text-2xl font-bold text-green-600">{matchedPairs}/4</div>
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {cards.map((card) => (
                        <button
                          key={card.id}
                          onClick={() => selectCard(card)}
                          disabled={card.matched}
                          className={`relative p-6 rounded-xl font-bold text-white transition-all ${
                            card.matched
                              ? 'opacity-50 cursor-not-allowed bg-gray-400'
                              : selectedCards.find(c => c.id === card.id)
                              ? `bg-gradient-to-br ${getCategoryColor(card.category)} scale-105 shadow-xl`
                              : `bg-gradient-to-br ${getCategoryColor(card.category)} hover:scale-105 shadow-lg`
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-sm mb-2 opacity-75 uppercase">
                              {card.category}
                            </div>
                            <div className="text-base leading-tight">
                              {card.text}
                            </div>
                          </div>
                          {card.matched && (
                            <div className="absolute top-2 right-2">
                              <span className="text-2xl">✓</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Win Condition */}
                    {matchedPairs === 4 && (
                      <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-500">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h3>
                        <p className="text-lg text-gray-600 mb-6">
                          You matched all pairs! Final Score: <span className="font-bold text-purple-600">{score}</span>
                        </p>
                        <button
                          onClick={startGame}
                          className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition shadow-lg"
                        >
                          Play Again
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
              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>Click two cards to select them</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>If they're related, you earn points!</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>Match all pairs to win</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>Learn about interdisciplinary connections</span>
                  </li>
                </ul>
              </div>

              {/* Categories Legend */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600"></div>
                    <span className="font-semibold text-sm">Science</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600"></div>
                    <span className="font-semibold text-sm">Islamic Scholars</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600"></div>
                    <span className="font-semibold text-sm">Modern Fields</span>
                  </div>
                </div>
              </div>

              {/* Did You Know */}
              {matchedPairs > 0 && (
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Did You Know?</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Islamic scholars made fundamental contributions to mathematics, science, and medicine 
                    that laid the foundation for modern scientific methods.
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