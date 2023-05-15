const serializeDayJsDate = (date) => {
    return `${date.$M + 1}-${date.$D}-${date.$y}`;
  };

export {
    serializeDayJsDate
}