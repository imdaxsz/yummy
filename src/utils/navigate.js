/**
 * @param  { string } to
 * @param  { boolean } isReplace
 */
const navigate = (to, isReplace = false) => {
  const historyChangeEvent = new CustomEvent('historychange', {
    detail: {
      to,
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};

export default navigate;
