// Format countdown timer nicely
export function formatCountdownHMS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function formatRemainingText(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `متبقي: ${minutes} دقيقة`;
  }
  if (hours === 1 && minutes === 0) {
    return 'متبقي: ساعة واحدة';
  }
  if (hours === 1) {
    return `متبقي: ساعة و ${minutes} دقيقة`;
  }
  if (hours === 2 && minutes === 0) {
    return 'متبقي: ساعتين';
  }
  if (hours === 2) {
    return `متبقي: ساعتين و ${minutes} دقيقة`;
  }
  return `متبقي: ${hours} ساعات و ${minutes} دقيقة`;
}

export function toArabicNumerals(num: number | string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().replace(/[0-9]/g, (w) => arabicDigits[+w]);
}
