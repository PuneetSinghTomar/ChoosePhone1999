import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },  // No need for 'user' role
  isTwoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
});

// Hash password before saving
// AdminUserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

export default mongoose.model('AdminUser', AdminUserSchema);
