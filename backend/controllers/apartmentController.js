import Apartment from "../models/Apartment.js";

// ✅ Yeni Apartman Ekleme
export const createApartment = async (req, res) => {
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

    res.status(201).json(apartment);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Tüm Apartmanları Getirme
export const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().populate("manager", "name email");
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Tek Apartmanı Getirme
export const getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id).populate("manager", "name email");

    if (!apartment) {
      return res.status(404).json({ message: "Apartman bulunamadı." });
    }

    res.json(apartment);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Apartmanı Güncelleme
export const updateApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
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
    res.json(apartment);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Apartmanı Silme
export const deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartman bulunamadı." });
    }

    await apartment.deleteOne();
    res.json({ message: "Apartman başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
