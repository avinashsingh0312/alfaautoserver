// TEMPORARY MOCK middleware to simulate Firebase token verification

const verifyFirebaseToken = async (req, res, next) => {
    const firebaseToken = req.body.firebaseToken;
  
    if (!firebaseToken) {
      return res.status(400).json({ error: "Firebase token missing" });
    }
  
    // Mock user (simulate Firebase response)
    req.user = {
      uid: "mock-uid-789",
      phone_number: "+917777777777"
    };
  
    next();
  };
  
  module.exports = verifyFirebaseToken;
  