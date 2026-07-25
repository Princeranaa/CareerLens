import { Register } from "@/types/user.types";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<Register>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;

  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
