exports.transaction = (fn) => {
  try {
    const data = fn();
    return { data, error: null };
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `transaction error: ${error.message}`);
    return { data: null, error };
  }
};
