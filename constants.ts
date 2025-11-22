

import { User, Circle, Challenge, Lesson, LeaderboardEntry, ShopItem } from './types';

export const INITIAL_USER: User = {
  name: "Ananya",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD8cmUy1-UybK7FNX9IIYBS08iHC4okIxIdgAARU1m3SE2O9NqtmFUTs9QABYYqgSA6YFVXHYCZ2ErT9I8G8q5QlBes8ls4TstNbEBwN3WpNwBQRhnR8w-M1upOjGf3hEWL388X1UVaGsQAbiWqFwXex6zJI50kUtoP5rZvKePkDboTpBoyGbV-KdK5eHTfB-h0mE30PVC6afDZsgpLBQrNOpyfWT03yJ3zxhSWZC7Hu3ayOY1KXqt6CrBVewWkrQ2WvuUtfFJ738",
  streak: 10,
  dailyGoal: 100,
  currency: "₹",
  savedThisMonth: 2850,
  totalSaved: 6400,
  consistencyScore: 92,
  level: 3,
  xp: 2500,
  nextLevelXp: 3800,
  gems: 450
};

export const MOCK_SHOP_ITEMS: ShopItem[] = [
  {
    id: 's1',
    name: 'Streak Freeze',
    description: 'Miss a day of saving without losing your streak.',
    cost: 200,
    icon: 'ac_unit',
    type: 'powerup',
    purchased: false
  },
  {
    id: 's2',
    name: 'Double or Nothing',
    description: 'Double your 50 gem wager by maintaining a 7 day streak.',
    cost: 50,
    icon: 'casino',
    type: 'powerup',
    purchased: false
  },
  {
    id: 's3',
    name: 'Gold Avatar',
    description: 'Stand out in the leaderboard with a golden border.',
    cost: 1000,
    icon: 'workspace_premium',
    type: 'cosmetic',
    purchased: false
  }
];

export const MOCK_CIRCLES: Circle[] = [
  {
    id: "vault",
    name: "My Vault",
    membersCount: 1,
    streak: 124,
    consistency: 100,
    poolTotal: 5210,
    isUserMember: true,
    theme: 'obsidian',
    members: [
        { id: 'u1', name: 'You', avatar: INITIAL_USER.avatar, consistency: 100 }
    ],
    activity: [
        { id: 'v1', userId: 'u1', userName: 'You', userAvatar: INITIAL_USER.avatar, action: 'saved', timestamp: '9:00 AM', reactions: 0 },
        { id: 'v2', userId: 'sys', userName: 'System', userAvatar: '', action: 'saved', timestamp: 'Yesterday', reactions: 0 },
    ]
  },
  {
    id: "c3",
    name: "New Macbook",
    membersCount: 1,
    streak: 45,
    consistency: 100,
    poolTotal: 120000,
    isUserMember: true,
    theme: 'purple',
    members: [
        { id: 'u1', name: 'You', avatar: INITIAL_USER.avatar, consistency: 100 }
    ],
    activity: []
  },
  {
    id: "c1",
    name: "Weekend Warriors",
    membersCount: 3,
    streak: 9,
    consistency: 97,
    poolTotal: 8120,
    isUserMember: true,
    theme: 'sunset',
    inviteCode: 'WKND24',
    members: [
       { id: 'u1', name: 'You', avatar: INITIAL_USER.avatar, consistency: 95 },
       { id: 'u2', name: 'Riya', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav4R4n7Af7Add3v6NzQglFBLgpEEMKxRYY5iEVvlbV70vUhCHg2CKXbjJzmxU-82smI9ZUJpoInXImgjcWr1uq9kC5PK8xwfCMkSEdvPBduXC5uNw4CAbuUzLNNkA0nPkizMSw8LfMS3ExzRU0OY3mvCLaDk7MhSUAt4q4tGhlpPsu0VEZ2gpUIaTUkJcXoN1JyTW-I2GqzEe5TmjAZfgEwLUF_0vvhZxwhVVji1GvWEZaIH7ARloIJDDW6zghQieLWYbXVzh028', consistency: 100 },
       { id: 'u3', name: 'Alex', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc0U_Dp-IasYy2QfHPsk7HCUMamZELQRbxfxADdXu2Fc0g50GQnZfMgTuYZTQLnETjlukrM9VxdawmM6laXahME5cCXmFeBu0GhjSPqz8vm2cNuNNxW40WGwAbcIqo4_ayJJ3F4mLVeRQuijvjvIKuWGJm29ID6QsrbZ2Cf_ygLfXBABuu4-KjQ67pIIbDYnkWO8ZKo8y_IyGcOkDLCE7-rAyltSzH00PBACSUJH_V-SFEupa9xANeui3ORKDk7RZQneeFUg-UNXA', consistency: 99 },
    ],
    activity: [
        { id: 'a1', userId: 'u2', userName: 'Riya', userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav4R4n7Af7Add3v6NzQglFBLgpEEMKxRYY5iEVvlbV70vUhCHg2CKXbjJzmxU-82smI9ZUJpoInXImgjcWr1uq9kC5PK8xwfCMkSEdvPBduXC5uNw4CAbuUzLNNkA0nPkizMSw8LfMS3ExzRU0OY3mvCLaDk7MhSUAt4q4tGhlpPsu0VEZ2gpUIaTUkJcXoN1JyTW-I2GqzEe5TmjAZfgEwLUF_0vvhZxwhVVji1GvWEZaIH7ARloIJDDW6zghQieLWYbXVzh028', action: 'saved', timestamp: '2h ago', reactions: 5 },
        { id: 'a2', userId: 'u1', userName: 'You', userAvatar: INITIAL_USER.avatar, action: 'saved', timestamp: '5h ago', reactions: 2 },
        { id: 'a3', userId: 'u3', userName: 'Alex', userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc0U_Dp-IasYy2QfHPsk7HCUMamZELQRbxfxADdXu2Fc0g50GQnZfMgTuYZTQLnETjlukrM9VxdawmM6laXahME5cCXmFeBu0GhjSPqz8vm2cNuNNxW40WGwAbcIqo4_ayJJ3F4mLVeRQuijvjvIKuWGJm29ID6QsrbZ2Cf_ygLfXBABuu4-KjQ67pIIbDYnkWO8ZKo8y_IyGcOkDLCE7-rAyltSzH00PBACSUJH_V-SFEupa9xANeui3ORKDk7RZQneeFUg-UNXA', action: 'missed', timestamp: '1d ago', reactions: 0 },
    ]
  },
  {
    id: "c2",
    name: "Bali Trip 2024",
    membersCount: 3,
    streak: 12,
    consistency: 100,
    poolTotal: 45000,
    isUserMember: true,
    theme: 'sky',
    inviteCode: 'BALI24',
    members: [
        { id: 'u1', name: 'You', avatar: INITIAL_USER.avatar, consistency: 95 },
        { id: 'u5', name: 'Sarah', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png', consistency: 100 },
        { id: 'u6', name: 'Mike', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png', consistency: 100 },
    ],
    activity: []
  },
  {
    id: "c4",
    name: "Office Lunch Club",
    membersCount: 5,
    streak: 22,
    consistency: 88,
    poolTotal: 12500,
    isUserMember: false,
    theme: 'lime',
    inviteCode: 'LUNCH1',
    members: [
        { id: 'u7', name: 'David', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png', consistency: 90 },
        { id: 'u8', name: 'Priya', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140039.png', consistency: 95 },
    ],
    activity: []
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "ch1",
    title: "30-Day Consistency",
    description: "Save everyday for 30 days.",
    daysTotal: 30,
    daysCompleted: 13,
    rewardXP: 250,
    rewardGold: 50,
    active: true,
    category: 'active'
  },
  {
    id: "ch2",
    title: "Weekend Mission",
    description: "Save ₹500 this weekend.",
    daysTotal: 2,
    daysCompleted: 0,
    rewardXP: 100,
    rewardGold: 20,
    active: false,
    category: 'new'
  },
  {
    id: "ch3",
    title: "No Spend Day",
    description: "Don't spend any money on wants today.",
    daysTotal: 1,
    daysCompleted: 0,
    rewardXP: 50,
    rewardGold: 10,
    active: false,
    category: 'new'
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, name: 'Riya S.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav4R4n7Af7Add3v6NzQglFBLgpEEMKxRYY5iEVvlbV70vUhCHg2CKXbjJzmxU-82smI9ZUJpoInXImgjcWr1uq9kC5PK8xwfCMkSEdvPBduXC5uNw4CAbuUzLNNkA0nPkizMSw8LfMS3ExzRU0OY3mvCLaDk7MhSUAt4q4tGhlpPsu0VEZ2gpUIaTUkJcXoN1JyTW-I2GqzEe5TmjAZfgEwLUF_0vvhZxwhVVji1GvWEZaIH7ARloIJDDW6zghQieLWYbXVzh028', streak: 45, isCurrentUser: false, movement: 'up' },
    { rank: 2, name: 'Alex J.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc0U_Dp-IasYy2QfHPsk7HCUMamZELQRbxfxADdXu2Fc0g50GQnZfMgTuYZTQLnETjlukrM9VxdawmM6laXahME5cCXmFeBu0GhjSPqz8vm2cNuNNxW40WGwAbcIqo4_ayJJ3F4mLVeRQuijvjvIKuWGJm29ID6QsrbZ2Cf_ygLfXBABuu4-KjQ67pIIbDYnkWO8ZKo8y_IyGcOkDLCE7-rAyltSzH00PBACSUJH_V-SFEupa9xANeui3ORKDk7RZQneeFUg-UNXA', streak: 32, isCurrentUser: false, movement: 'same' },
    { rank: 3, name: 'You', avatar: INITIAL_USER.avatar, streak: 10, isCurrentUser: true, movement: 'up' },
    { rank: 4, name: 'Jordan', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN_c3Dg0OvKFHkAIp8Ch2wN0YX0PrZ6mvG0wrjhCK_JcY5mtazouRM5RWjlOMaVdJXcVPUrktPVpXwcyUDRsP9O8TAZKV-p8KYjEh4ROFTolAhQKnIhorqc4ue_l9hz0GxbPBMdFt2eQ1tTNetriDKZT3965NLO-q6QDuBcXubr8ZitHyWEz_SRcHBKAbJKL0DQxIaL4Vg6uy8E7RqkAIXpom4D8tPNKTCXF6R3Ecnr2M68RJSyvWt7mL_NAWMk257V6fryyOYErM', streak: 8, isCurrentUser: false, movement: 'down' },
]

export const MOCK_LESSONS: Lesson[] = [
  { 
      id: "l1", 
      title: "Basics of Saving", 
      duration: "3 min", 
      completed: true, 
      xp: 20, 
      status: 'completed',
      content: [] 
  },
  { 
      id: "l2", 
      title: "Creating a Budget", 
      duration: "5 min", 
      completed: true, 
      xp: 30, 
      status: 'completed',
      content: []
  },
  { 
      id: "l3", 
      title: "Needs vs. Wants", 
      duration: "4 min", 
      completed: false, 
      xp: 25, 
      status: 'current',
      content: [
          { type: 'slide', text: "Needs are essential for survival and basic well-being, like food, shelter, and healthcare.", image: "https://cdn-icons-png.flaticon.com/512/2829/2829823.png" },
          { type: 'slide', text: "Wants are things we desire but don't strictly need, like dining out, latest gadgets, or expensive clothes." },
          { type: 'quiz', question: "Is a Netflix subscription a Need or a Want?", options: ["Need", "Want"], correctOption: 1 }
      ]
  },
  { 
      id: "l4", 
      title: "Intro to Investing", 
      duration: "6 min", 
      completed: false, 
      xp: 40, 
      status: 'locked',
      content: []
  },
];

export const WEEKLY_DATA = [
  { label: 'M', value: 100 },
  { label: 'T', value: 100 },
  { label: 'W', value: 100 },
  { label: 'T', value: 0 },
  { label: 'F', value: 50 },
  { label: 'S', value: 100 },
  { label: 'S', value: 100 },
];

export const MONTHLY_DATA = [
    { label: '1', value: 100 }, { label: '5', value: 80 },
    { label: '10', value: 100 }, { label: '15', value: 100 },
    { label: '20', value: 0 }, { label: '25', value: 100 },
    { label: '30', value: 120 }
];


// Helper to generate static lessons for the first 10 units
export const getStaticLesson = (id: string, topic: string) => {
  const defaultQuestions = [
    {
      question: `What is the key concept of ${topic}?`,
      options: [
        { text: "Spending more", icon: "💸" },
        { text: "Understanding value", icon: "💡" },
        { text: "Avoiding it", icon: "🚫" }
      ],
      correctAnswerIndex: 1,
      explanation: `Understanding the core value of ${topic} is essential for financial growth.`
    },
    {
      question: "Which of these is a good practice?",
      options: [
        { text: "Consistency", icon: "🔄" },
        { text: "Impulse buying", icon: "🛍️" },
        { text: "Ignoring statements", icon: "🙈" }
      ],
      correctAnswerIndex: 0,
      explanation: "Consistency is the most powerful tool in personal finance."
    },
    {
      question: "When should you start?",
      options: [
        { text: "Next year", icon: "📅" },
        { text: "When rich", icon: "💰" },
        { text: "Now", icon: "⚡" }
      ],
      correctAnswerIndex: 2,
      explanation: "Time is your biggest asset. Starting now allows compound interest to work for you."
    }
  ];

  // Specific content for Unit 1: Intro to Investing
  if (id.startsWith('1-')) {
    if (topic.includes('Basics')) {
       return [
         {
           question: "What is the primary goal of investing?",
           options: [{ text: "Saving for a car", icon: "🚗" }, { text: "Growing wealth", icon: "📈" }, { text: "Paying bills", icon: "🧾" }],
           correctAnswerIndex: 1,
           explanation: "Investing is about making your money work for you to build wealth over time."
         },
         {
            question: "Which carries more risk?",
            options: [{ text: "Savings Account", icon: "🏦" }, { text: "Stocks", icon: "📊" }],
            correctAnswerIndex: 1,
            explanation: "Stocks are more volatile than savings accounts but offer higher potential returns."
         },
         {
             question: "What is compound interest?",
             options: [{ text: "Interest on interest", icon: "🔄" }, { text: "Bank fees", icon: "💸" }, { text: "Tax deduction", icon: "📉" }],
             correctAnswerIndex: 0,
             explanation: "Compound interest allows your earnings to generate their own earnings."
         }
       ];
    }
    if (topic.includes('Risk')) {
        return [
            {
                question: "High risk usually correlates with:",
                options: [{ text: "Low Reward", icon: "⬇️" }, { text: "High Reward", icon: "⬆️" }],
                correctAnswerIndex: 1,
                explanation: "In finance, taking on more risk is usually compensated with higher potential returns."
            },
            {
                question: "How can you lower investment risk?",
                options: [{ text: "Diversification", icon: "🎨" }, { text: "Timing the market", icon: "⏱️" }],
                correctAnswerIndex: 0,
                explanation: "Spreading your money across different assets (diversification) reduces the impact of any single loss."
            }
        ]
    }
  }

  // Specific content for Unit 2: Budgeting
  if (id.startsWith('2-')) {
      if (topic.includes('Income')) {
          return [
              {
                  question: "Net income is:",
                  options: [{ text: "Before tax", icon: "📄" }, { text: "After tax", icon: "💰" }],
                  correctAnswerIndex: 1,
                  explanation: "Net income is what you actually take home after taxes and deductions."
              },
              {
                  question: "Which is a fixed expense?",
                  options: [{ text: "Rent", icon: "🏠" }, { text: "Dining out", icon: "🍔" }],
                  correctAnswerIndex: 0,
                  explanation: "Rent stays the same every month, making it a fixed expense."
              }
          ]
      }
      if (topic.includes('Needs')) {
           return [
              {
                  question: "According to 50/30/20, what % is for Needs?",
                  options: [{ text: "30%", icon: "🍰" }, { text: "50%", icon: "🏠" }, { text: "20%", icon: "🏦" }],
                  correctAnswerIndex: 1,
                  explanation: "50% of your income should cover essentials like housing and food."
              }
          ]
      }
  }

  // Specific Content for Unit 3: Credit
  if (id.startsWith('3-')) {
      if (topic.includes('Score')) {
          return [
              {
                  question: "A good credit score helps you:",
                  options: [{ text: "Get lower interest rates", icon: "📉" }, { text: "Earn more salary", icon: "💼" }],
                  correctAnswerIndex: 0,
                  explanation: "Lenders see you as lower risk, offering you cheaper loans."
              },
              {
                  question: "What hurts your score most?",
                  options: [{ text: "Checking it", icon: "👀" }, { text: "Missing payments", icon: "❌" }],
                  correctAnswerIndex: 1,
                  explanation: "Payment history is the biggest factor in your credit score."
              }
          ]
      }
  }

  return defaultQuestions;
};
