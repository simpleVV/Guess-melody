const convertTime = (time) => {
  const milSecInSec = 1000;
  const secInMin = 60;
  const mins = Math.floor(time / milSecInSec / secInMin);
  const secRemainOfMin = Math.floor((time / milSecInSec) % secInMin);

  return [mins, secRemainOfMin];
};

export {convertTime};
