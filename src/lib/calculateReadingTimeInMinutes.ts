const WORDS_PER_MINUTE = 200;

export default function calculateReadingTimeInMinutes(body: string) {
  const wordCount = body.split(" ").length;
  return wordCount / WORDS_PER_MINUTE;
}
