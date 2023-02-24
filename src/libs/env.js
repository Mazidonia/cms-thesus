import config from "public/env-configs";

// eslint-disable-next-line import/no-mutable-exports
const env = typeof window === "undefined" ? config : window.env;

export default env;
