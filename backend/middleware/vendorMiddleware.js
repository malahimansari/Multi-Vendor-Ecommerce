// checkVendor.js

module.exports = function (req, res, next) {
    // Assuming user roles are stored in req.user.role
    const userRole = req.user.role;
  
    if (userRole !== 2) { // Assuming 2 represents the vendor role
      return res.status(403).json({
        msg: 'Only vendors have access to this resource.',
      });
    }
  
    next();
  };
  