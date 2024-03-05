export const AsyncTryCatch = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
    }
  };
};


