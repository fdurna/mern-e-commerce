import bcrypt from 'bcryptjs'


const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Yunus Baysal',
    email: 'yunusbaysal@exapmle.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Fatih Durna',
    email: 'fatihdurna@exapmle.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'John Doe',
    email: 'john@exapmle.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
