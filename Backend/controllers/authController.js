const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const staffs = require('../data/staffs.json');

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = staffs.find((staff) => staff.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
