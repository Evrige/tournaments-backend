export function adjustPoints(points: number): number {
  if (points < 0) {
    return 0;
  } else if (points > 2000) {
    return 2000;
  } else {
    return points;
  }
}