export const getInitials = (name: string, email: string) => {
  const source = name || email;

  if (!source) {
    return "";
  }

  const nameParts = source.trim().split(/\s+/).filter(Boolean);

  if (nameParts.length === 1) {
    const [firstPart] = nameParts;
    const sanitized = firstPart.includes("@")
      ? firstPart.split("@")[0]?.replace(/[^a-zA-Z]/g, "")
      : firstPart;

    return (sanitized ?? "").slice(0, 2).toUpperCase();
  }

  const firstInitial = nameParts[0]?.[0] ?? "";
  const lastInitial = nameParts[nameParts.length - 1]?.[0] ?? "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
};
