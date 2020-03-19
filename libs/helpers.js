module.exports.getResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).send({ data });
};
