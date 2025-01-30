const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log("Gelen Token:", token);

    if (!token) {
        return res.status(403).json({ message: 'Token gerekli.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token doğrulama hatası:', err); // Hata logu
            return res.status(403).json({ message: 'Geçersiz token.' });
        }

        req.user = user; 
        next();
    });
};
