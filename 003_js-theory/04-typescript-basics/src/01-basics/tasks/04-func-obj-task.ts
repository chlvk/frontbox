// Create interfaces User and Admin
// Keys for User: login, email, password, isOnline, lastVisited
// Keys for Admin: login, email, password, isOnline, lastVisited, role
interface User {
  login: string;
  email: string;
  password: string;
  isOnline: boolean;
  lastVisited: Date;
}

interface Admin {
  login: string;
  email: string;
  password: string;
  isOnline: boolean;
  lastVisited: Date;
  role: string;
}

const user1: User = {
  login: "michey",
  email: "some@email.com",
  isOnline: false,
  password: "12345",
  lastVisited: new Date(2022, 6, 2),
};

const admin1: Admin = {
  login: "michey",
  email: "some@email.com",
  isOnline: false,
  password: "12345",
  lastVisited: new Date(2022, 6, 2),
  role: "SuperAdmin",
};

// Create a function login with param user (with keys login and password)
// Check if login and password are not empty and then greet user
function login(user: { login: string; password: string }) {
  if ((user.login.length > 0, user.password.length > 0)) {
    console.log("Hello", user.login);
  }
}

login(user1);
login(admin1);
