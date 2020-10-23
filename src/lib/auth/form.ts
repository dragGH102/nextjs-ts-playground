export function getErrorMessage(error) {
  console.log(JSON.stringify(error.graphQLErrors));

  if (error.graphQLErrors) {
    error.graphQLErrors.forEach(graphQLError => {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'BAD_USER_INPUT'
      ) {
        return graphQLError.message;
      }
    });
  }
  return error.message;
}
