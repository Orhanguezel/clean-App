Bu proje oldukça kapsamlı ve iyi bir planlama gerektiriyor. Öncelikle, sistemin bileşenlerini net bir şekilde tanımlayarak ilerlemek en doğrusu olacak. Şu aşamada birkaç önemli noktayı netleştirelim:

### **Önerilen Mimari**
- **Backend:** Node.js + Express.js (API katmanı)
- **Veritabanı:** MongoDB (Dokümantasyon yapısı sayesinde esnek kayıtlar oluşturabiliriz)
- **Frontend:** React Native (Mobil uygulama desteği için)
- **Authentication:** JWT (Çalışanlar, apartman yöneticileri ve admin için ayrı yetkilendirme)
- **Bildirim Sistemi:** Kullanıcılara ve çalışanlara bildirimler göndermek için (örn. günlük görev hatırlatmaları, geri bildirimler)

---

### **Ana Modüller ve Veri Modeli**
1. **Apartmanlar / Kurumlar**
   - Apartman veya kurumun adı
   - Adresi ve iletişim bilgileri
   - Blok ve kat sayısı
   - Sorumlu kişi (apartman yöneticisi)
   - Temizlik periyodu (günlük, haftalık vb.)
   - Ücret ödeme tarihi
   - Sakinler (geri bildirim bırakabilirler)

2. **Temizlik Görevleri**
   - Temizlik türü (Merdiven, çöp alma, çevre temizliği vb.)
   - Apartman veya kuruma bağlı
   - Atanan çalışan(lar)
   - Periyot (günlük, haftalık vb.)
   - Görev durumu (Tamamlandı, Bekliyor vb.)
   - Geri bildirimler (Temizlikte kusur varsa yorum eklenebilir)

3. **Çalışanlar**
   - Adı, soyadı
   - Çalışma takvimi (hangi apartman, hangi gün)
   - Günlük onay durumu (Görevlerini tamamladı mı?)
   - Apartmanlardan gelen geri bildirimleri görebilir ancak yanıtlayamaz

4. **Gelir-Gider Yönetimi**
   - Gelirler (Apartman ve kurumlardan gelen ödemeler)
   - Giderler (Çalışan maaşları, araç giderleri, malzeme masrafları)
   - Aylık kazanç hesaplama (Gelir - Gider)

5. **Kullanıcı Rolleri**
   - **Admin:** Tüm verileri görebilir, düzenleyebilir
   - **Apartman Yöneticisi:** Kendi apartmanına ait temizlik süreçlerini ve geri bildirimleri görebilir
   - **Çalışanlar:** Kendi görevlerini ve günlük iş listelerini görebilir, tamamlandı olarak işaretleyebilir

---

### **Tavsiye Edilen Geliştirme Süreci**
1. **Backend API Tasarımı**
   - Veritabanı şeması oluşturulacak (MongoDB)
   - REST API endpoint'leri planlanacak
   - JWT Authentication eklenecek (Çalışanlar, Yöneticiler, Admin)
   - CRUD işlemleri tamamlanacak (Apartmanlar, Görevler, Çalışanlar vb.)

2. **Mobil Uygulama (React Native)**
   - Çalışanlar için görev listesi ve tamamlandı butonu
   - Apartman yöneticileri için geri bildirim bölümü
   - Admin için raporlama ekranı (Gelir-gider takibi)

3. **Test ve Optimizasyon**
   - Veritabanı optimizasyonları
   - Performans testleri
   - Gerçek kullanıcılarla testler

---

Projenin pazarlanabilir hale gelmesi için de:
- **Çoklu dil desteği** eklenebilir.
- **Ödeme sistemleri** entegre edilebilir (Stripe vb.).
- **Bildirim altyapısı** kurulabilir (SMS, E-posta, Push Notification).

---

Bunları detaylandırarak ilerleyelim. Önce backend’i tasarlamaya başlamak istiyorsan, **veritabanı şemasını netleştirmek ve API endpointlerini belirlemekle başlayabiliriz**. Ne dersin?

### **Güzel Temizlik - Backend Yol Haritası ve Dosya Yapısı**  

#### **1. Yol Haritası**  
Backend geliştirme sürecini 6 aşamaya bölelim:

##### **Aşama 1: Proje Kurulumu ve Yapılandırma**  
✅ Node.js + Express.js projesini başlat  
✅ Gerekli bağımlılıkları yükle (Express, Mongoose, JWT, dotenv vb.)  
✅ Çevresel değişkenleri yapılandır (.env kullanımı)  
✅ MongoDB bağlantısını kur  

##### **Aşama 2: Veritabanı Tasarımı**  
✅ **Apartmanlar ve Kurumlar** koleksiyonu oluştur  
✅ **Görevler (Temizlik İşleri)** koleksiyonu oluştur  
✅ **Çalışanlar** koleksiyonu oluştur  
✅ **Kullanıcılar (Admin, Yöneticiler, Çalışanlar)** koleksiyonu oluştur  
✅ **Gelir-Gider Yönetimi** koleksiyonu oluştur  

##### **Aşama 3: API Geliştirme**  
✅ JWT tabanlı kimlik doğrulama sistemi  
✅ Apartman ve kurum CRUD işlemleri  
✅ Temizlik görevleri CRUD işlemleri  
✅ Çalışan yönetimi  
✅ Kullanıcı yönetimi (Admin, Yöneticiler, Çalışanlar)  
✅ Gelir-gider takibi  

##### **Aşama 4: İş Akışı ve Yetkilendirme**  
✅ Apartman yöneticisinin kendi apartmanını yönetmesi  
✅ Çalışanların kendilerine atanmış görevleri görebilmesi  
✅ Çalışanların görevleri tamamladığında onaylayabilmesi  
✅ Admin’in gelir-gider tablosunu görüntüleyebilmesi  

##### **Aşama 5: Test ve Optimizasyon**  
✅ API testleri (Postman, Jest)  
✅ Veritabanı optimizasyonu  
✅ Yetkilendirme kontrolleri  

##### **Aşama 6: Dokümantasyon ve Dağıtım**  
✅ API dokümantasyonu (Swagger)  
✅ Veritabanı yedekleme ve güvenlik önlemleri  
✅ Canlı sunucuya deployment (VPS, AWS, Railway, Render vb.)  

---

### **2. Dosya Yapısı**  

```bash
guzel-temizlik-backend/
│── src/
│   ├── config/             # Veritabanı bağlantısı, çevresel değişkenler
│   │   ├── db.js
│   │   ├── dotenv.js
│   ├── models/             # MongoDB Mongoose modelleri
│   │   ├── User.js
│   │   ├── Apartment.js
│   │   ├── Task.js
│   │   ├── Employee.js
│   │   ├── Finance.js
│   ├── controllers/        # İş mantığı ve API işlemleri
│   │   ├── userController.js
│   │   ├── apartmentController.js
│   │   ├── taskController.js
│   │   ├── employeeController.js
│   │   ├── financeController.js
│   ├── routes/             # API yönlendirme dosyaları
│   │   ├── userRoutes.js
│   │   ├── apartmentRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── financeRoutes.js
│   ├── middlewares/        # Yetkilendirme, hata yönetimi vb.
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   ├── utils/              # Yardımcı fonksiyonlar
│   │   ├── logger.js
│   │   ├── jwtUtils.js
│   │   ├── validator.js
│   ├── tests/              # Test dosyaları
│   ├── app.js              # Express uygulama dosyası
│   ├── server.js           # Sunucu başlatma dosyası
│── .env                    # Çevresel değişkenler (MongoDB URI, JWT_SECRET vb.)
│── .gitignore               # Git için gereksiz dosyaları hariç tutma
│── package.json             # Bağımlılıklar ve scriptler
│── README.md                # Proje dokümantasyonu
```

---

Bu yapı hem **modüler** hem de **ölçeklenebilir** olacak. **Sonraki adım olarak veritabanı şemalarını ve API endpointlerini detaylandıralım mı?**