/**
 * Middleware to secure administrative routes
 */
export const requireAdmin = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET || 'ember_bean_secret_admin_2026';
  const authHeader = req.headers.authorization;
  const adminKeyHeader = req.headers['x-admin-key'];

  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (adminKeyHeader) {
    token = adminKeyHeader;
  }

  if (!token || token !== adminSecret) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Administrative authentication required.',
    });
  }

  next();
};
