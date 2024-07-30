export default function formatDate(date: Date | null) {
  if (!date) return "";

  const options = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
    timezone: "UTC",
  };

  return new Date(date).toLocaleDateString("en-US", options);
}
