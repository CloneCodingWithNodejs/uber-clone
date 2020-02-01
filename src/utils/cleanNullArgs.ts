const cleanNull = (args) => {
  const notNull: any = {};
  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });

  return notNull;
};

export default cleanNull;
