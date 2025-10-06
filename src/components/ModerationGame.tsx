import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { moderationScenarios, moderationActions, moderatorTypes, type ModerationScenario } from '@/data/moderationScenarios';
import { MessageSquare, Users, Trophy, Share2, Settings } from 'lucide-react';

interface GameState {
  currentScenario: number;
  score: number;
  decisions: string[];
  gamePhase: 'intro' | 'playing' | 'result' | 'final';
  showResult: boolean;
}

const ModerationGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScenario: 0,
    score: 0,
    decisions: [],
    gamePhase: 'intro',
    showResult: false
  });

  const currentScenario = moderationScenarios[gameState.currentScenario];
  const totalScenarios = moderationScenarios.length;
  const progress = ((gameState.currentScenario) / totalScenarios) * 100;

  const startGame = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'playing' }));
  };

  const makeDecision = (actionId: string) => {
    const newDecisions = [...gameState.decisions, actionId];
    const isCorrect = actionId === currentScenario.result.realModeratorAction;
    const newScore = gameState.score + (isCorrect ? 1 : 0);

    setGameState(prev => ({
      ...prev,
      decisions: newDecisions,
      score: newScore,
      showResult: true
    }));
  };

  const nextScenario = () => {
    if (gameState.currentScenario < totalScenarios - 1) {
      setGameState(prev => ({
        ...prev,
        currentScenario: prev.currentScenario + 1,
        showResult: false
      }));
    } else {
      setGameState(prev => ({ ...prev, gamePhase: 'final' }));
    }
  };

  const getModerationTypeEmoji = (actionId: string) => {
    switch (actionId) {
      case 'keep': return '✅';
      case 'delete': return '🗑️';
      default: return '';
    }
  };

  const getModerationTypeColor = (actionId: string) => {
    switch (actionId) {
      case 'keep': return 'bg-moderate-keep';
      case 'delete': return 'bg-moderate-delete';
      default: return 'bg-muted';
    }
  };

  const calculateModeratorType = () => {
    const actions = gameState.decisions;
    const deletions = actions.filter(a => a === 'delete').length;
    const keeps = actions.filter(a => a === 'keep').length;
    const correctDecisions = gameState.score;
    const totalDecisions = actions.length;

    if (correctDecisions >= totalDecisions * 0.8) return moderatorTypes.wise;
    if (deletions >= totalDecisions * 0.6) return moderatorTypes.strict;
    if (keeps >= totalDecisions * 0.6) return moderatorTypes.liberal;
    if (correctDecisions >= totalDecisions * 0.5) return moderatorTypes.balanced;
    return moderatorTypes.chaotic;
  };

  const shareResults = () => {
    const moderatorType = calculateModeratorType();
    const text = `Я был модератором и выжил! ${moderatorType.emoji} Тип: ${moderatorType.name}. Правильных решений: ${gameState.score}/${totalScenarios}. #15летназад #честномодерирую`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  if (gameState.gamePhase === 'intro') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 shadow-card animate-scale-in">
          <div className="text-center space-y-6">
            <div className="animate-glow-pulse">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Будь Модератором
              </h1>
              <p className="text-xl text-muted-foreground">Игра на 15-летие</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg">
                Добро пожаловать в мир модерации! Вам предстоит принять решения по реальным комментариям.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>{totalScenarios} реальных сценариев</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Статистика других игроков</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Определение типа модератора</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all"
            >
              Начать игру
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (gameState.gamePhase === 'final') {
    const moderatorType = calculateModeratorType();
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 shadow-card animate-scale-in">
          <div className="text-center space-y-6">
            <div className="text-6xl animate-glow-pulse">
              {moderatorType.emoji}
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                {moderatorType.name}
              </h2>
              <p className="text-lg text-muted-foreground">
                {moderatorType.description}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Ваши результаты:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-success">
                    {gameState.score}/{totalScenarios}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Совпало с реальными решениями
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {Math.round((gameState.score / totalScenarios) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Точность модерации
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => setGameState({
                  currentScenario: 0,
                  score: 0,
                  decisions: [],
                  gamePhase: 'intro',
                  showResult: false
                })}
                variant="outline"
              >
                Играть снова
              </Button>
              <Button 
                onClick={shareResults}
                className="bg-gradient-primary hover:shadow-glow"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Будь Модератором</h1>
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Админпанель
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              {gameState.currentScenario + 1} из {totalScenarios}
            </div>
          </div>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-2" />

        {/* Scenario */}
        <Card className="p-6 shadow-card animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{currentScenario.author}</Badge>
                </div>
                
                <blockquote className="border-l-4 border-primary pl-4 text-lg mb-4">
                  "{currentScenario.comment}"
                </blockquote>
                
                <p className="text-sm text-muted-foreground">
                  <strong>Контекст:</strong> {currentScenario.context}
                </p>
              </div>
            </div>

            {!gameState.showResult && (
              <div className="space-y-3">
                <h3 className="font-semibold">Ваше решение:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {moderationActions.map((action) => (
                    <Button
                      key={action.id}
                      onClick={() => makeDecision(action.id)}
                      variant="outline"
                      className="flex flex-col items-center gap-2 h-auto p-4 hover:scale-105 transition-transform"
                    >
                      <span className="text-2xl">
                        {getModerationTypeEmoji(action.id)}
                      </span>
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {gameState.showResult && (
              <div className="space-y-6 animate-slide-in">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Результаты:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Ваше решение:</span>
                      <Badge className={getModerationTypeColor(gameState.decisions[gameState.decisions.length - 1])}>
                        {getModerationTypeEmoji(gameState.decisions[gameState.decisions.length - 1])} {
                          moderationActions.find(a => a.id === gameState.decisions[gameState.decisions.length - 1])?.label
                        }
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Реальный модератор:</span>
                      <Badge className={getModerationTypeColor(currentScenario.result.realModeratorAction)}>
                        {getModerationTypeEmoji(currentScenario.result.realModeratorAction)} {
                          moderationActions.find(a => a.id === currentScenario.result.realModeratorAction)?.label
                        }
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Статистика игроков:</h4>
                  <div className="space-y-2">
                    {moderationActions.map((action) => {
                      const percentage = currentScenario.result.playerStats[action.id] || 0;
                      return (
                        <div key={action.id} className="flex items-center gap-2">
                          <span className="text-sm w-20">
                            {getModerationTypeEmoji(action.id)} {action.label}:
                          </span>
                          <Progress value={percentage} className="flex-1 h-2" />
                          <span className="text-sm w-12">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`rounded-lg p-4 ${
                  currentScenario.result.consequenceType === 'positive' ? 'bg-success/10' :
                  currentScenario.result.consequenceType === 'negative' ? 'bg-destructive/10' :
                  'bg-muted/50'
                }`}>
                  <h4 className="font-semibold mb-2">Последствия:</h4>
                  <p className="text-sm">{currentScenario.result.consequence}</p>
                </div>

                <Button 
                  onClick={nextScenario}
                  className="w-full bg-gradient-primary hover:shadow-glow"
                >
                  {gameState.currentScenario < totalScenarios - 1 ? 'Следующий сценарий' : 'Посмотреть результаты'}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ModerationGame;