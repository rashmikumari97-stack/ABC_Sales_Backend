const { generateToken } = require("../utils/jwtUtil");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body,'rb',process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD)

  if (
    email === "rashmi.kumari2697@gmail.com" &&
    password === 123456
  ) {
    const token = generateToken({ email });

    return res.json({ message: "Login Successful", token });
  }
  return res.status(401).json({
    message: "invalid credentials",
  });
};
module.exports = { login };
