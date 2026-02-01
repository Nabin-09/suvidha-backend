const otpStore = new Map();

export const generateOTP = (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, otp);
  console.log(`📲 OTP for ${phone}: ${otp}`);
};

export const verifyOTP = (phone, otp) => {
  return otpStore.get(phone) === otp;
};
