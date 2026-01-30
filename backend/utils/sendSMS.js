// const axios = require("axios");

// const sendSMS = async (phone, otp) => {
//   await axios.post(
//     "https://www.fast2sms.com/dev/bulkV2",
//     {
//       route: "otp",
//       numbers: phone,
//       message: `Your OTP is ${otp}. Valid for 10 minutes.`,
//     },
//     {
//       headers: {
//         authorization: process.env.FAST2SMS_API_KEY,
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };

// module.exports = sendSMS; // ✅ REQUIRED
