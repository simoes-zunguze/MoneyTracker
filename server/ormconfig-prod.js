module.exports = {
   type: "mysql",
   host: "localhost",
   port: 3306,
   username: "root",
   password: "root",
   database:  "moneyapp",
   synchronize: false,
   logging: false,
   entities: [
      "build/app/models/**/*.js"
   ]
}