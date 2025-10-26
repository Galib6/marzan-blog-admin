
export const convertSecondsToTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const countdownTimer = (seconds: number) => {
  const interval = setInterval(() => {
    if (seconds > 0) {
      const formattedTime = convertSecondsToTime(seconds);
      seconds--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};
export const calculatePercentage = (bigNumber, smallNumber) => {
  const percentage = (smallNumber / bigNumber) * 100;
  return percentage;
};
