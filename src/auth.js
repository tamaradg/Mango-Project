import jwt from "jsonwebtoken";
function auth(req, res, next) {
  // ici on stock l'info qu'il y a dans authorization soit le token du user logué
  const token = req.header("Authorization");
  if (!token) {
  // s'il n'y a pas de token, l'accès est refusé
    return res.status(401).send("Access denied.No token provided");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}
export default auth;
