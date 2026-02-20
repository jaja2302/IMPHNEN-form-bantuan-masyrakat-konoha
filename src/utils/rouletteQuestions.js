export const ROULETTE_QUESTIONS = [
  'Sebutkan nama ikan favorit presiden.',
  'Berapa jumlah ubin di rumah Anda?',
  'Tuliskan bunyi klakson motor Anda dalam huruf.',
  'Siapa yang menang jika semut berkelahi dengan capung?',
];

const ROULETTE_COMMENTS = [
  'Dicatat. Kami akan mengabaikan jawaban ini.',
  'Terima kasih atas partisipasi Anda yang tidak berguna.',
  'Jawaban Anda telah masuk arsip khusus.',
];

export function getRandomRouletteQuestion() {
  return ROULETTE_QUESTIONS[Math.floor(Math.random() * ROULETTE_QUESTIONS.length)];
}

export function getRandomRouletteComment() {
  return ROULETTE_COMMENTS[Math.floor(Math.random() * ROULETTE_COMMENTS.length)];
}

export function getRandomRoulettePosition() {
  return 5 + Math.floor(Math.random() * 14);
}
