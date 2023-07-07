const parseValidationError = (error) => {
    const errorDetail = error.details[0];
    return {
      message: errorDetail.message,
      field: errorDetail.context.key,
      type: errorDetail.type,
    };
  };

  export default parseValidationError