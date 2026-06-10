export const convertToMinutes = (time) => {
  const [hour, minute] = time.split(":");

  return (
    Number(hour) * 60 +
    Number(minute)
  );
};
