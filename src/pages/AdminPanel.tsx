import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { moderationScenarios, moderationActions, moderatorTypes } from '@/data/moderationScenarios';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [scenarios, setScenarios] = useState(moderationScenarios);
  const { toast } = useToast();

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setScenarios(moderationScenarios);
  };

  const handleSave = () => {
    toast({
      title: "Изменения сохранены",
      description: "Данные сценария успешно обновлены",
    });
    setEditingId(null);
  };

  const updateScenario = (id: number, field: string, value: any) => {
    setScenarios(scenarios.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const updateResult = (id: number, field: string, value: any) => {
    setScenarios(scenarios.map(s => 
      s.id === id ? { ...s, result: { ...s.result, [field]: value } } : s
    ));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к игре
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Админ-панель
            </h1>
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Статистика</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{scenarios.length}</div>
              <div className="text-sm text-muted-foreground">Всего сценариев</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{Object.keys(moderatorTypes).length}</div>
              <div className="text-sm text-muted-foreground">Типов модераторов</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{moderationActions.length}</div>
              <div className="text-sm text-muted-foreground">Вариантов решений</div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Сценарии модерации</h2>
          
          {scenarios.map((scenario) => {
            const isEditing = editingId === scenario.id;
            
            return (
              <Card key={scenario.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge>Сценарий #{scenario.id}</Badge>
                      <Badge variant="outline">{scenario.author}</Badge>
                    </div>
                    {!isEditing ? (
                      <Button
                        onClick={() => handleEdit(scenario.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSave}
                          size="sm"
                          className="bg-gradient-primary"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Сохранить
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Отмена
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Автор:</label>
                      {isEditing ? (
                        <Input
                          value={scenarios.find(s => s.id === scenario.id)?.author}
                          onChange={(e) => updateScenario(scenario.id, 'author', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm">{scenario.author}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Комментарий:</label>
                      {isEditing ? (
                        <Textarea
                          value={scenarios.find(s => s.id === scenario.id)?.comment}
                          onChange={(e) => updateScenario(scenario.id, 'comment', e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <blockquote className="border-l-4 border-primary pl-4 text-sm">
                          "{scenario.comment}"
                        </blockquote>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Контекст:</label>
                      {isEditing ? (
                        <Textarea
                          value={scenarios.find(s => s.id === scenario.id)?.context}
                          onChange={(e) => updateScenario(scenario.id, 'context', e.target.value)}
                          rows={2}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{scenario.context}</p>
                      )}
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-sm">Результаты:</h4>
                      
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Реальное решение модератора:</label>
                        {isEditing ? (
                          <select
                            value={scenarios.find(s => s.id === scenario.id)?.result.realModeratorAction}
                            onChange={(e) => updateResult(scenario.id, 'realModeratorAction', e.target.value)}
                            className="w-full px-3 py-2 rounded-md border bg-background"
                          >
                            {moderationActions.map(action => (
                              <option key={action.id} value={action.id}>
                                {action.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <Badge>{moderationActions.find(a => a.id === scenario.result.realModeratorAction)?.label}</Badge>
                        )}
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Последствия:</label>
                        {isEditing ? (
                          <Textarea
                            value={scenarios.find(s => s.id === scenario.id)?.result.consequence}
                            onChange={(e) => updateResult(scenario.id, 'consequence', e.target.value)}
                            rows={2}
                          />
                        ) : (
                          <p className="text-sm">{scenario.result.consequence}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Статистика игроков:</label>
                        <div className="space-y-2">
                          {moderationActions.map(action => (
                            <div key={action.id} className="flex items-center gap-2">
                              <span className="text-sm w-24">{action.label}:</span>
                              {isEditing ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={scenarios.find(s => s.id === scenario.id)?.result.playerStats[action.id]}
                                  onChange={(e) => {
                                    const stats = { ...scenarios.find(s => s.id === scenario.id)!.result.playerStats };
                                    stats[action.id] = parseInt(e.target.value) || 0;
                                    updateResult(scenario.id, 'playerStats', stats);
                                  }}
                                  className="w-20"
                                />
                              ) : (
                                <span className="text-sm">{scenario.result.playerStats[action.id]}%</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
