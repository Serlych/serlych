export default function formatDate(date: Date | null) {
  if (!date) return "";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timezone: "UTC",
  };

  return new Date(date).toLocaleDateString("en-US", options);
}
