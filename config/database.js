if (process.env.NODE_ENV === 'production') {
  module.exports = {database:
    'mongodb://jacqann:XMLhtml4.01@ds259111.mlab.com:59111/irish4fun',
    secret: 'your secret'} 
} else
module.exports = {
  database: 'mongodb://localhost:27017/irish4fun',
  secret: 'your secret'
}
