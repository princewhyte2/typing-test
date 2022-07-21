//convert minutes to seconds
export const convertMinutesToSeconds = (minutes: number): number => {
  return minutes * 60
}

//calculate percentage of correct typed words
export const calculatePercentage = (totalCorrectWords: number, totalWords: number): number => {
  return (totalCorrectWords / totalWords) * 100
}
