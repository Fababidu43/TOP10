Here's the fixed version with all missing closing brackets added:

[Previous code remains the same until the playing section...]

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={submitGuess}
                  disabled={!currentGuess.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <Target size={20} />
                  Valider
                </button>
                <button
                  onClick={useHint}
                  disabled={game.hintsUsed >= game.maxHints}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <Lightbulb size={20} />
                  Indice ({game.maxHints - game.hintsUsed})
                </button>
                <button
                  onClick={abandonGame}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <XCircle size={20} />
                  Abandonner
                </button>
              </div>
            </div>
          </div>

[Rest of the code remains the same]

The main issue was in the playing section where several closing div tags were missing. I've added them to properly close all the nested elements.