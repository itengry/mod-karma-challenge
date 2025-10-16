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
  weight?: number;
  result: ModerationResult;
}

export const moderationActions: ModerationAction[] = [
  { id: 'keep', label: 'Оставить', color: 'keep' },
  { id: 'delete', label: 'Удалить', color: 'delete' }
];

export const moderationScenarios: ModerationScenario[] = [
  {
    id: 1,
    comment: "Очередной тупой текст. Этому тупому автору бы мозги прочистить.",
    author: "Критик2007",
    context: "Обсуждение спорной темы про образование",
    weight: 1,
    result: {
      realModeratorAction: 'delete',
      playerStats: {
        'keep': 15,
        'delete': 85
      },
      consequence: "После удаления ветка успокоилась, другие пользователи начали обсуждать саму тему, а не переходить на личности",
      consequenceType: 'positive'
    }
  },
  {
    id: 2,
    comment: "Когда уже начнут проектировать город нормально, а не изображать работу?!",
    author: "Миротворец",
    context: "Жалоба жителей Алматы на пробки",
    weight: 1,
    result: {
      realModeratorAction: 'keep',
      playerStats: {
        'keep': 70,
        'delete': 30
      },
      consequence: "Ветка осталась в рамках темы",
      consequenceType: 'neutral'
    }
  },
  {
    id: 3,
    comment: "Админы тут все купленные, модеры сидят на зарплате у олигархов!!!",
    author: "Писатель сводобы",
    context: "Обсуждение модерации форума",
    weight: 1,
    result: {
      realModeratorAction: 'delete',
      playerStats: {
        'keep': 10,
        'delete': 90
      },
      consequence: "Пользователь создал 3 новых аккаунта и продолжил писать один и тот же комментарий везде",
      consequenceType: 'negative'
    }
  },
  {
    id: 4,
    comment: "Сравнил бы это с Tesla, но тут даже рядом не стояло — китайцы сделали лучше!",
    author: "ТеХнарь",
    context: "Дискуссия под новостью о запуске нового электромобиля",
    weight: 1,
    result: {
      realModeratorAction: 'keep',
      playerStats: {
        'keep': 75,
        'delete': 25
      },
      consequence: "Комментарий вызвал технический спор между фанатами разных брендов",
      consequenceType: 'neutral'
    }
  },
  {
    id: 5,
    comment: "Лол, опять эти либерашки со своими бреднями 😂😂😂",
    author: "Тролль228",
    context: "Политическая дискуссия",
    weight: 1,
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
    comment: "Реформа, отставки и аресты помогут нашей стране",
    author: "Stypok",
    context: "Обсуждение действий правительства",
    weight: 1,
    result: {
      realModeratorAction: 'keep',
      playerStats: {
        'keep': 65,
        'delete': 35
      },
      consequence: "Сообщение вызвало бурное обсуждение",
      consequenceType: 'neutral'
    }
  },
  {
    id: 7,
    comment: "Да она просто продажная баба, без таланта!",
    author: "Светский ЛЕВ",
    context: "Обсуждение публикации об актрисе и ее успехах",
    weight: 1,
    result: {
      realModeratorAction: 'delete',
      playerStats: {
        'keep': 20,
        'delete': 80
      },
      consequence: "После удаления пользователи начали обсуждать профессиональные проекты актрисы, без перехода на личности",
      consequenceType: 'positive'
    }
  },
  {
    id: 8,
    comment: "Им бы только вранье писать, вот же сказочники...",
    author: "Кворлос",
    context: "Обсуждение статистических данных по зарплатам казахстанцев",
    weight: 1,
    result: {
      realModeratorAction: 'keep',
      playerStats: {
        'keep': 60,
        'delete': 40
      },
      consequence: "Пользователи поддержали комментарий и выразили свое согласие с автором",
      consequenceType: 'neutral'
    }
  }
];

export interface StyleResult {
  id: string;
  title: string;
  description: string;
  threshold: [number, number];
}

export const styleResults: StyleResult[] = [
  {
    id: "liberal",
    title: "Либеральный",
    description: "Вы даёте людям высказаться и вмешиваетесь редко. Обсуждения живые, но иногда бурлят.",
    threshold: [0, 44]
  },
  {
    id: "balanced",
    title: "Сбалансированный",
    description: "Вы держите равновесие между свободой и порядком. Вас понимают и пользователи, и модераторы.",
    threshold: [45, 69]
  },
  {
    id: "strict",
    title: "Строгий",
    description: "Вы цените порядок и предсказуемые правила. Решения твёрдые, иногда на грани жёсткости.",
    threshold: [70, 94]
  },
  {
    id: "radical",
    title: "Радикальный",
    description: "Вы контролируете почти всё. На площадке тихо, но пользователи осторожничают.",
    threshold: [95, 100]
  }
];

export function getStyleByPercent(percent: number): StyleResult {
  for (const style of styleResults) {
    const [lo, hi] = style.threshold;
    if (percent >= lo && percent <= hi) return style;
  }
  return percent < 0 ? styleResults[0] : styleResults[styleResults.length - 1];
}