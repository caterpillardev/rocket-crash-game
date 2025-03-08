import bcrypt from "bcrypt";
import User from "models/User";

export const signUpService = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  return user;
};

export const signInService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "secret"
  );
  return token;
};
