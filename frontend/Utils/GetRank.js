export function getRank(level) {
    if (level >= 60) return "Full-Stack developer";
    if (level >= 55) return "Confirmed developer";
    if (level >= 50) return "Junior developer";
    if (level >= 40) return "Basic developer";
    if (level >= 30) return "Assistant developer";
    if (level >= 20) return "Apprentice developer";
    if (level >= 10) return "Beginner developer";
    if (level >= 0) return "Aspiring developer";
}
