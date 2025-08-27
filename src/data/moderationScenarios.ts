export interface ModerationAction {
  id: string;
  label: string;
  color: 'keep' | 'delete';
}

export interface ModerationResult {
  realModeratorAction: string;
  playerStats: { [key: string]: number };
  consequence: string;
  consequenceType: 'positive' | 'negative' | 'neutral';
}

export interface ModerationScenario {
  id: number;
  comment: string;
  author: string;
  context: string;
  reports: number;
  threadActivity: 'низкая' | 'средняя' | 'высокая';
  result: ModerationResult;
}

export const moderationActions: ModerationAction[] = [
  { id: 'keep', label: 'Оставить', color: 'keep' },
  { id: 'delete', label: 'Удалить', color: 'delete' }
];

export const moderationScenarios: ModerationScenario[] = [
  {
    id: 1,
    comment: "Очередной тупой текст. Автору бы мозги прочистить.",
    author: "Критик2007",
    context: "Обсуждение спорной темы про образование",
    reports: 5,
    threadActivity: 'высокая',
    result: {
      realModeratorAction: 'delete',
      playerStats: {
        'keep': 15,
        'delete': 85
      },
      consequence: "Автор в ответ написал ещё 5 комментов в таком же духе",
      consequenceType: 'negative'
    }
  },
  {
    id: 2,
    comment: "Ребята, а может все-таки попробуем найти компромисс? Обе стороны правы в чём-то.",
    author: "Миротворец",
    context: "Горячий спор о политике, 200+ комментариев",
    reports: 0,
    threadActivity: 'высокая',
    result: {
      realModeratorAction: 'keep',
      playerStats: {
        'keep': 65,
        'delete': 35
      },
      consequence: "Дискуссия стала более конструктивной, участники начали искать общие точки",
      consequenceType: 'positive'
    }
  },
  {
    id: 3,
    comment: "Админы тут все купленные, модеры сидят на зарплате у олигархов!!!",
    author: "Правдоруб",
    context: "Обсуждение модерации форума",
    reports: 12,
    threadActivity: 'средняя',
    result: {
      realModeratorAction: 'delete',
      playerStats: {
        'keep': 10,
        'delete': 90
      },
      consequence: "Пользователь создал 3 новых аккаунта и продолжил писать то же самое",
      consequenceType: 'negative'
    }
  },
  {
    id: 4,
    comment: "Хм, а вот здесь есть интересная статистика [ссылка], правда, выборка маленькая.",
    author: "АналитикПро",
    context: "Дискуссия о научном исследовании",
    reports: 1,
    threadActivity: 'средняя',
    result: {
      realModeratorAction: 'keep',
      playerStats: {
        'keep': 85,
        'delete': 15
      },
      consequence: "Началась продуктивная дискуссия с обменом источниками и фактами",
      consequenceType: 'positive'
    }
  },
  {
    id: 5,
    comment: "Лол, опять эти либерашки со своими бреднями 😂😂😂",
    author: "Тролль228",
    context: "Политическая дискуссия",
    reports: 8,
    threadActivity: 'высокая',
    result: {
      realModeratorAction: 'delete',
      playerStats: {
        'keep': 25,
        'delete': 75
      },
      consequence: "Участники перестали отвечать на провокации, дискуссия вернулась в конструктивное русло",
      consequenceType: 'positive'
    }
  },
  {
    id: 6,
    comment: "Спасибо за подробный разбор! Никогда не думал об этом с такой стороны.",
    author: "Благодарный",
    context: "Образовательная статья",
    reports: 0,
    threadActivity: 'низкая',
    result: {
      realModeratorAction: 'keep',
      playerStats: {
        'keep': 90,
        'delete': 10
      },
      consequence: "Другие пользователи последовали примеру и начали благодарить авторов качественных постов",
      consequenceType: 'positive'
    }
  },
  {
    id: 7,
    comment: "А кто-нибудь заметил, что модераторы удаляют только неудобные мнения? 🤔",
    author: "НаблюдательЗритель",
    context: "Мета-обсуждение о модерации",
    reports: 3,
    threadActivity: 'средняя',
    result: {
      realModeratorAction: 'keep',
      playerStats: {
        'keep': 60,
        'delete': 40
      },
      consequence: "Началось конструктивное обсуждение принципов модерации. Администрация опубликовала разъяснения",
      consequenceType: 'positive'
    }
  },
  {
    id: 8,
    comment: "Автор статьи - полный дебил, и все кто с ним согласны тоже дебилы.",
    author: "АгрессивныйЧитатель",
    context: "Комментарии к популярной статье",
    reports: 15,
    threadActivity: 'высокая',
    result: {
      realModeratorAction: 'delete',
      playerStats: {
        'keep': 5,
        'delete': 95
      },
      consequence: "Пользователь был забанен на неделю. В его отсутствие дискуссия стала спокойнее",
      consequenceType: 'positive'
    }
  }
];

export const moderatorTypes = {
  balanced: {
    name: "Сбалансированный",
    description: "Вы умеете находить золотую середину между свободой слова и порядком",
    emoji: "⚖️"
  },
  strict: {
    name: "Строгий",
    description: "Вы не терпите нарушений и поддерживаете железную дисциплину",
    emoji: "🛡️"
  },
  liberal: {
    name: "Либеральный", 
    description: "Вы верите в свободу слова и стараетесь вмешиваться минимально",
    emoji: "🕊️"
  },
  chaotic: {
    name: "Хаотичный",
    description: "Ваши решения непредсказуемы, даже для вас самих",
    emoji: "🎲"
  },
  wise: {
    name: "Мудрый",
    description: "Вы видите глубже поверхности и принимаете взвешенные решения",
    emoji: "🦉"
  }
};