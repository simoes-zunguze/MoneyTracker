export default{
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "root",
   "password": "root",
   "database": "test",
   "synchronize": true,
   "logging": false,
   "entities": [
      "app/models/**/*.ts"
   ],
   "migrations": [
      "app/migration/**/*.ts"
   ],
   "subscribers": [
      "app/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "app/entity",
      "migrationsDir": "app/migration",
      "subscribersDir": "app/subscriber"
   }
}