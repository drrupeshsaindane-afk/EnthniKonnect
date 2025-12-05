export type RootType = 'India' | 'China';

type ChapterType = 'video' | 'story';

type QuizOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  feedback: string;
};

export type Chapter = {
  id: string;
  title: string;
  type: ChapterType;
  body: string;
  questions?: QuizQuestion[];
};

export type Module = {
  id: string;
  root: RootType;
  title: string;
  description: string;
  contentTypes: ('video' | 'story' | 'quiz')[];
  chapters: Chapter[];
};

const indianChapters: Chapter[] = [
  {
    id: 'holi-video',
    title: 'Holi Colors',
    type: 'video',
    body: 'A playful explainer about the festival of colors and how families celebrate safely.',
    questions: [
      {
        id: 'holi-q1',
        prompt: 'Which color is often linked with new beginnings during Holi?',
        options: [
          { id: 'a', text: 'Green', isCorrect: true },
          { id: 'b', text: 'Gray', isCorrect: false },
          { id: 'c', text: 'Black', isCorrect: false }
        ],
        feedback: 'Green is connected with springtime and new starts!'
      }
    ]
  },
  {
    id: 'panchatantra-story',
    title: 'The Clever Rabbit',
    type: 'story',
    body: 'A short retelling of the rabbit who outwits a fierce lion to protect the forest friends.',
    questions: [
      {
        id: 'panchatantra-q1',
        prompt: 'How did the rabbit trick the lion?',
        options: [
          { id: 'a', text: 'By showing a reflection in a well', isCorrect: true },
          { id: 'b', text: 'By offering him fruits', isCorrect: false },
          { id: 'c', text: 'By running away silently', isCorrect: false }
        ],
        feedback: 'The rabbit used the well to make the lion think there was another lion!'
      }
    ]
  }
];

const chineseChapters: Chapter[] = [
  {
    id: 'lantern-video',
    title: 'Lantern Festival Lights',
    type: 'video',
    body: 'Discover lantern riddles, dragon dances, and the sweet tangyuan treats that mark the festival.',
    questions: [
      {
        id: 'lantern-q1',
        prompt: 'What sweet treat is shared during the Lantern Festival?',
        options: [
          { id: 'a', text: 'Tangyuan', isCorrect: true },
          { id: 'b', text: 'Mochi', isCorrect: false },
          { id: 'c', text: 'Baklava', isCorrect: false }
        ],
        feedback: 'Tangyuan are glutinous rice balls that symbolize family unity.'
      }
    ]
  },
  {
    id: 'monkey-king-story',
    title: 'Journey of the Monkey King',
    type: 'story',
    body: 'A brave Monkey King protects his friends on their journey, learning kindness and courage along the way.',
    questions: [
      {
        id: 'monkey-king-q1',
        prompt: 'What quality helps the Monkey King succeed?',
        options: [
          { id: 'a', text: 'Courage and teamwork', isCorrect: true },
          { id: 'b', text: 'Being invisible', isCorrect: false },
          { id: 'c', text: 'Sleeping all day', isCorrect: false }
        ],
        feedback: 'Courage plus teamwork help the Monkey King guard his friends.'
      }
    ]
  }
];

export const modules: Module[] = [
  {
    id: 'indian-festivals',
    root: 'India',
    title: 'Indian Festivals',
    description: 'Holi, Diwali, and joyful celebrations with family.',
    contentTypes: ['video', 'story', 'quiz'],
    chapters: indianChapters
  },
  {
    id: 'indian-stories',
    root: 'India',
    title: 'Indian Stories',
    description: 'Fables and folktales with wise heroes.',
    contentTypes: ['story', 'quiz'],
    chapters: indianChapters
  },
  {
    id: 'chinese-festivals',
    root: 'China',
    title: 'Chinese Festivals',
    description: 'Lanterns, dragons, and moonlit traditions.',
    contentTypes: ['video', 'story', 'quiz'],
    chapters: chineseChapters
  },
  {
    id: 'chinese-stories',
    root: 'China',
    title: 'Chinese Stories',
    description: 'Legends of friendship and resilience.',
    contentTypes: ['story', 'quiz'],
    chapters: chineseChapters
  }
];

export const getModulesForRoot = (root: RootType): Module[] =>
  modules.filter((item) => item.root === root);

export const findModuleById = (id: string): Module | undefined =>
  modules.find((item) => item.id === id);

export const findChapterById = (moduleId: string, chapterId: string): Chapter | undefined =>
  findModuleById(moduleId)?.chapters.find((chapter) => chapter.id === chapterId);
