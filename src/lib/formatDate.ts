export default function formatDate(date: Date | null) {
  if (!date) return "";

  return new Date(date).toLocaleString();
}
