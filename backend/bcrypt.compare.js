import bcrypt from "bcryptjs";

const storedHash = "$2b$10$cCPSUDwwedO08qki.ZnR7hu10TLRvkYls3t3pqeQbGyWePfDY5hqr"; // MongoDB'deki hashlenmiş şifre
const inputPassword = "Admin123!"; // Kullanıcının girdiği şifre

bcrypt.compare(inputPassword, storedHash, (err, isMatch) => {
  if (isMatch) {
    console.log("✅ Şifre doğru!");
  } else {
    console.log("❌ Şifre yanlış!");
  }
});
