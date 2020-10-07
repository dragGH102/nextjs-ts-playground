// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = {
  /* config options for all phases except development here */
  experimental: {
    optionalCatchAll: true,
  },
};

/*  if (phase === PHASE_DEVELOPMENT_SERVER) { // phase is a parameter to this function when provided
    return {
      /!* development only config options here *!/
    };
  } */
