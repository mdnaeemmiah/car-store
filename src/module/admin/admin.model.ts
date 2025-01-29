import mongoose, { Schema } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema: Schema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
      immutable: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profileImg: { type: String, default: '' },
  },
  { timestamps: true }
);

AdminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
AdminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = mongoose.model<IAdmin,AdminModel>('Admin', AdminSchema);
