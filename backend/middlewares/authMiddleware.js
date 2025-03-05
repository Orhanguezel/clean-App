import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Token'ı doğrula ve süresini kontrol et
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcıyı getir
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Kullanıcı bulunamadı, yetkilendirme başarısız" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Yetkilendirme başarısız, geçersiz veya süresi dolmuş token" });
    }
  } else {
    res.status(401).json({ message: "Yetkilendirme başarısız, token bulunamadı" });
  }
};
