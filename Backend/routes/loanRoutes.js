const express = require('express');
const {
  getAllLoans,
  getLoansByStatus,
  getLoansByUserEmail,
  getExpiredLoans,
  deleteLoan
} = require('../controllers/loanController');
const { authorizeRoles } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getAllLoans);
router.get('/expired', getExpiredLoans);
router.get('/:userEmail/get', getLoansByUserEmail);
router.get('/', getLoansByStatus);
router.delete('/:loanId/delete', authorizeRoles('superAdmin'), deleteLoan);

module.exports = router;
