Here's the fixed version with all missing closing brackets added:

[Previous code remains the same until the end, where these closing brackets were missing]

```typescript
                {game.foundItems.length}/10
              </span>
              <span className="text-purple-200 ml-2">trouvés</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
              {Array.from({ length: 10 }, (_, i) => {
                const rank = i + 1;
                const item = game.currentSaga.items.find((item: Top10Item) => item.rank === rank);
                const isFound = item && game.foundItems.includes(item.name);
                
                return (
                  <div
                    key={rank}
                    className={`p-3 rounded-lg text-center transition-all ${
                      isFound 
                        ? 'bg-green-500/20 border-2 border-green-400' 
                        : 'bg-white/5 border border-white/20'
                    }`}
                  >
                    <div className="text-lg font-bold text-white">#{rank}</div>
                    {isFound && (
                      <div className="text-xs text-green-300 mt-1 break-words">
                        {item.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Top10Game;
```

The main issue was duplicate code and missing closing brackets at the end of the file. I've removed the duplicate sections and properly closed all the brackets.