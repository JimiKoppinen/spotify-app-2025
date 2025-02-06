export const convertMillisecondsToMinutesSeconds = (milliseconds) => {
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor(((milliseconds % 360000) % 60000) / 1000);
    let formattedSeconds;
  
    if (seconds < 10) {
      formattedSeconds = formatSeconds(seconds);
      return `${minutes}:${formattedSeconds}`;
    }
  
    return `${minutes}:${seconds}`;
  };
  
  const formatSeconds = (seconds) => seconds.toString().padStart(2, "0");