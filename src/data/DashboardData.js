export const cardData = [
  { id: 1, title: 'Users' },
  { id: 2, title: 'Sessions' },
  { id: 3, title: 'Top Intents' },
  { id: 4, title: 'Tokens Plot' },
  { id: 5, title: 'Total Interactions' },
  { id: 6, title: 'Unique users' },
  { id: 7, title: 'Unique sessions' },





  { id: 8, title: 'Interactions Line' },
  { id: 9, title: 'Recognition Rate' },
];
export const userData = {
  dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  activeUsers: [50, 65, 80, 70, 90, 100, 120],
};
export const dates = ["Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"];
export const usersLatest = [0, 0, 4, 1, 2, 2, 3];
export const usersPrevious = [1, 0, 7, 0, 4, 2, 1];
export const sessionsLatest = [1, 0, 6, 1, 2, 2, 3];
export const sessionsPrevious = [0, 1, 7, 0, 4, 1, 0];
export const topIntents = ["Schedule Call", "How Do AI Assistants Work?", "What are AI Assistants?", "Book Appointment", "Get Weather", "Play Music"];
export const intentCounts = [5, 2, 1, 3, 4, 2];
export const tokensPerDay = [1500, 2800, 1100, 2300, 3200, 1800, 2500];
export const averageTokens = tokensPerDay.reduce((sum, val) => sum + val) / tokensPerDay.length;
export const interactions = [0, 1, 15, 7, 1, 0];
export const previousInteractions = [0, 15, 50, 20, 7, 0];
export const totalInteractions = 37;
export const uniqueUsers = 13;
export const uniqueSessions = 13;
export const recognitionRate = 66.7;
export const fallbackRate = 33.3;

export const primaryColor = "#EB5A3C";
export const secondaryColor = "black";
export const backgroundColor = "#F5F5F5";
export const CARDS_PER_PAGE = 4;

export const series = [
  {
    name: 'Latest',
    data: usersLatest,
  },
  {
    name: 'Previous',
    data: usersPrevious,
  },
];

export const userAcquisitionData = {
  sources: ['Organic', 'Social Media', 'Paid Ads', 'Referrals'],
  users: [20, 15, 10, 5],
};

export const userActivityDates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const userActivityData = [
  [2, 5, 3, 7, 5, 4, 3],
  [3, 6, 4, 8, 6, 5, 4],
  [4, 7, 5, 9, 7, 6, 5],
  [5, 8, 6, 10, 8, 7, 6],
  [6, 9, 7, 11, 9, 8, 7],
  [7, 10, 8, 12, 10, 9, 8],
  [8, 11, 9, 13, 11, 10, 9],
];

export const userRetentionData = {
  months: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
  retentionRates: [80, 75, 70, 68, 65], // In percentage
};

export const userDemographics = [
  { label: '18-24', value: 25 },
  { label: '25-34', value: 35 },
  { label: '35-44', value: 20 },
  { label: '45-54', value: 15 },
  { label: '55+', value: 5 },
];