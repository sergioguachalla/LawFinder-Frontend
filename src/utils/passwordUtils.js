const passwordDictionary = [
   "Password1!",
   "Welcome2@",
   "Secure3#",
   "Admin4$",
   "User5%",
   "Login6^",
   "Access7&",
   "Root8*",
   "Secret9(",
   "Test0)",
   "Example10!",
   "Sample11@",
   "TryThis12#",
   "StrongPwd13$",
   "SafePass14%",
   "MyPass15^",
   "Check16&",
   "Lock17*",
   "Key18(",
   "Open19)",
   "Admin_1234",
 ];

export const isPasswordInDictionary = (password) => {
   return passwordDictionary.includes(password);
}
export default isPasswordInDictionary;
