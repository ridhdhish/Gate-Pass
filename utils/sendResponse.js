module.exports.sendResponse = (res, message, errCode = 500) => {
  console.log(message);
  res.status(errCode).json({ message });
};
