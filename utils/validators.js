const validateEmptyInputs = (data, fields, fieldDisplayNames) => {
  const emptyFields = [];

  fields.forEach((field) => {
    if (!data[field]) {
      emptyFields.push(fieldDisplayNames[field]);
    }
  });

  return emptyFields;
};

module.exports = { validateEmptyInputs };
