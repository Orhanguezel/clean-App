import User from "../models/User.js";
import generateToken from "../utils/jwtUtils.js";
import bcrypt from "bcryptjs";
import logger from "../utils/logger.js";

// ✅ Kullanıcı Kayıt İşlemi
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Kullanıcı zaten var mı?
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn(`⚠️ Kayıt işlemi başarısız, e-posta zaten kullanılıyor: ${email}`);
      return res.status(400).json({ message: "Bu e-posta zaten kullanılıyor." });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = await User.create({ name, email, password: hashedPassword, role });

    if (user) {
      logger.info(`✅ Yeni kullanıcı oluşturuldu: ${email}`);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      logger.error(`❌ Kullanıcı oluşturulamadı.`);
      res.status(400).json({ message: "Geçersiz kullanıcı verisi." });
    }
  } catch (error) {
    logger.error(`❌ Kullanıcı kaydı sırasında hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Kullanıcı Giriş İşlemi
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn(`⚠️ Geçersiz giriş denemesi: ${email}`);
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`⚠️ Geçersiz şifre ile giriş denemesi: ${email}`);
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    logger.info(`✅ Kullanıcı giriş yaptı: ${email}`);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    logger.error(`❌ Kullanıcı girişinde hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Kullanıcı Profilini Getirme (JWT ile korumalı)
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Şifreyi döndürme

    if (user) {
      logger.info(`👤 Kullanıcı profili getirildi: ${user.email}`);
      res.json(user);
    } else {
      logger.warn(`⚠️ Kullanıcı profili bulunamadı: ${req.user._id}`);
      res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    logger.error(`❌ Kullanıcı profili getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Kullanıcı Profilini Güncelleme (JWT ile korumalı)
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      logger.warn(`⚠️ Güncellenmek istenen kullanıcı bulunamadı: ${req.user._id}`);
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    logger.info(`✏️ Kullanıcı bilgileri güncellendi: ${updatedUser.email}`);

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    logger.error(`❌ Kullanıcı profili güncellenirken hata oluştu: ${error.message}`);
    next(error);
  }
};
