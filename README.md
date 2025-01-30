# KariyerNet

YouTube Link : https://www.youtube.com/watch?v=dYq3GBzh_zo

Bu proje, React ve Node.js kullanılarak geliştirilmiş bir KariyerNet benzeri iş arama uygulamasıdır. Uygulamanın frontend (React) ve backend (Node.js & Express) olmak üzere iki ana bileşeni bulunmaktadır. Veriler MongoDB Atlas üzerinden yönetilmektedir.

Proje Dizimi : 
├── IsAramaServer  (Backend - Node.js & Express)
├── IsProjesiClient  (Frontend - React)


Kurulum : 
1)Depoyu Klonlayın
git clone https://github.com/kullanici-adiniz/kariyer-net-clone.git
cd kariyer-net-clone

2)Backend (Server) Kurulumu
cd IsAramaServer
npm install
npm start
(npm install komutu bağımlılıkları yükler.
npm start komutu backend sunucusunu başlatır.)

3)Frontend (Client) Kurulumu
cd ../IsProjesiClient
npm install
npm start
(npm install bağımlılıkları yükler.
npm start React uygulamasını başlatır.)

ENV: MongoDB Atlas bağlantısı için .env dosyanızı IsAramaServer içinde oluşturun:
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

Kullanılan teknolojiler :
Frontend: React, React Router
Backend: Node.js, Express.js, MongoDB (Mongoose)
Veritabanı: MongoDB Atlas
