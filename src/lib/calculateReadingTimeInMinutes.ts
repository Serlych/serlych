const WORDS_PER_MINUTE = 300;

export default function calculateReadingTimeInMinutes(body: string) {
  const wordCount = body.split(" ").length;
  return Math.round(wordCount / WORDS_PER_MINUTE);
}
