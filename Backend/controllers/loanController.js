const loans = require('../data/loans.json');

exports.getAllLoans = (req, res) => {
  const { role } = req.user;
  const filteredLoans = loans.map((loan) => {
    if (role === 'admin' || role === 'superAdmin') return loan;
    const { totalLoan, ...rest } = loan.applicant;
    return { ...loan, applicant: rest };
  });
  res.json(filteredLoans);
};

exports.getLoansByStatus = (req, res) => {
  const { status } = req.query;
  const filteredLoans = loans.filter((loan) => loan.status === status);
  res.json(filteredLoans);
};

exports.getLoansByUserEmail = (req, res) => {
  const { userEmail } = req.params;
  const userLoans = loans.filter((loan) => loan.applicant.email === userEmail);
  res.json({ loans: userLoans });
};

exports.getExpiredLoans = (req, res) => {
  const now = new Date();
  const expiredLoans = loans.filter((loan) => new Date(loan.maturityDate) < now);
  res.json(expiredLoans);
};

exports.deleteLoan = (req, res) => {
  const { loanId } = req.params;
  const loanIndex = loans.findIndex((loan) => loan.id === loanId);

  if (loanIndex === -1) {
    return res.status(404).json({ message: 'Loan not found' });
  }

  loans.splice(loanIndex, 1);
  res.json({ message: 'Loan deleted successfully' });
};
