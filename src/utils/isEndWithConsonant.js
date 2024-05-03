const isEndWithConsonant = (str) => {
  const lastCharCode = str.charCodeAt(str.length - 1);
  const consonantCode = (lastCharCode - 44032) % 28;
  // 0 = 받침 없음, 그 외 = 받침 있음
  return consonantCode !== 0;
};

export default isEndWithConsonant;
