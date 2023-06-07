const x = { key: 'hello', deep: {deepKey: "Deepwow"} }

const y = {...x, deep: {...x.deep}};

y.deep.deepKey = "shallow wow"

console.log(x);
