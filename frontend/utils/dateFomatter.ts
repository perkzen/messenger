const formatTime = (time: String) => {
  if (time.length < 2) {
    return '0' + time;
  }
  return time;
};

export const getDateNow = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getTimeNow = () => {
  const time = new Date();
  const minutes = time.getMinutes().toString();
  const hours = time.getHours().toString();

  return `${formatTime(hours)}:${formatTime(minutes)}`;
};
