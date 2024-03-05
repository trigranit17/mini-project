Technologies used:
Go
ReactJs
React Native
SQL

Setting up:
Go
Install Go
  go mod init Quiz

Install Go packages by running the following commands on your terminal:
  go get -u github.com/gin-gonic/gin
  go get -u gorm.io/gorm
  go get -u gorm.io/driver/mysql
  go get -u github.com/dgrijalva/jwt-go

To run:
  go run cmd/main.go

React
Install node
Install packages for React:
  npm create vite@latest my-project -- --template react
  cd my-project
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

To run:
  npm run dev

ReactNative
Install ReactNative CLI
Installing dependencies:
  You will need Node, the React Native command line interface, a JDK, and Android Studio.
  npx react-native@latest init QuizApp

To run:
Step 1: Start Metro
Metro is the JavaScript build tool for React Native. To start the Metro development server, run the following from your project folder:
  npm start

Step 2: Start your application
Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:
  npm run android
