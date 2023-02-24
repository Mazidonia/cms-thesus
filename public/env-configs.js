//https://coursess.pcru.ac.th/api-courses/api/v1/student-thesis/
//http://localhost:4000/api/v1/student-thesis/
const env = {
  API: 'http://localhost:4000/api/v2/api-cms-thesis/',
  NODE_ENV: 'development',
};

if (typeof window === 'undefined') {
  module.exports = env
} else {
  window.env = env;
}
