import { Iuser } from "@/types/user.types";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Omit<Iuser, "_id">, Document {
  comparePass(candidatePassword: string): boolean;
}

const userSchema = new mongoose.Schema<UserDocument>({
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

userSchema.methods.comparePass = function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
