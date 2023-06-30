// util to precompute query string

const updateOnlyIfExists = async () => {
  let queryStr = "";
  let queryValues = [];

  const keys = Object.keys(ticketInfo);
  for (let i = 0; i < keys.length; i++) {
    if (ticketInfo[keys[i]] != undefined && keys[i] !== "seatNo") {
      queryStr = queryStr.concat(`${keys[i]} = ?, `);
      queryValues.push(ticketInfo[keys[i]]);
    }
  }

  queryStr = queryStr.slice(0, -2);
  return [queryStr, queryValues];
};
