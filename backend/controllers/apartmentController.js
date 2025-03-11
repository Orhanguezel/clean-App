import Apartment from "../models/Apartment.js";
import logger from "../utils/logger.js";

// ✅ Yeni Apartman Ekleme
export const createApartment = async (req, res, next) => {
  try {
    const { name, address, blockCount, floorCount, cleaningPeriod } = req.body;

    // Yeni apartman oluştur
    const apartment = await Apartment.create({
      name,
      address,
      blockCount,
      floorCount,
      cleaningPeriod,
      manager: req.user._id, // Apartman yöneticisi kim eklediyse o olacak
    });

    logger.info(`🏢 Yeni apartman eklendi: ${apartment.name} (${apartment._id})`);
    res.status(201).json(apartment);
  } catch (error) {
    logger.error(`❌ Apartman eklenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Tüm Apartmanları Getirme
export const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find().populate("manager", "name email");
    logger.info(`📋 ${apartments.length} apartman listelendi.`);
    res.json(apartments);
  } catch (error) {
    logger.error(`❌ Apartmanlar getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Tek Apartmanı Getirme
export const getApartmentById = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id).populate("manager", "name email");

    if (!apartment) {
      logger.warn(`⚠️ Apartman bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Apartman bulunamadı." });
    }

    logger.info(`🏢 Apartman getirildi: ${apartment.name} (${apartment._id})`);
    res.json(apartment);
  } catch (error) {
    logger.error(`❌ Apartman getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Apartmanı Güncelleme
export const updateApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      logger.warn(`⚠️ Güncellenmek istenen apartman bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Apartman bulunamadı." });
    }

    // Güncelleme işlemi
    const { name, address, blockCount, floorCount, cleaningPeriod } = req.body;
    apartment.name = name || apartment.name;
    apartment.address = address || apartment.address;
    apartment.blockCount = blockCount || apartment.blockCount;
    apartment.floorCount = floorCount || apartment.floorCount;
    apartment.cleaningPeriod = cleaningPeriod || apartment.cleaningPeriod;

    await apartment.save();
    logger.info(`✏️ Apartman güncellendi: ${apartment.name} (${apartment._id})`);
    res.json(apartment);
  } catch (error) {
    logger.error(`❌ Apartman güncellenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Apartmanı Silme
export const deleteApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      logger.warn(`⚠️ Silinmek istenen apartman bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Apartman bulunamadı." });
    }

    await apartment.deleteOne();
    logger.info(`🗑️ Apartman silindi: ${apartment.name} (${apartment._id})`);
    res.json({ message: "Apartman başarıyla silindi." });
  } catch (error) {
    logger.error(`❌ Apartman silinirken hata oluştu: ${error.message}`);
    next(error);
  }
};
