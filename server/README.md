
# MoneyTracker Server

## 1. Installation
### 1.1 Requirements


- Mysql or Mariadb

- nodejs & npm

- typescript

### 1.2  Configuring database
- DATABASE: moneyapp
- USERNAME: root
- PASSWORD: root 


### 1.3. Instaling dependencies

- Use npm to install the the dependencies
```bash
  npm install

```

    
## 2. Quick and fast way to start (Recomended)
On the root of the project run:
```bash
  ./init.sh
```

## 3. Starting without using bash file
Open terminal window and start the:
```bash
npm run typeorm schema:drop
npm run typeorm schema:sync
npm run seed
npm run dev
```
