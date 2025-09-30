exports.getInvoiceOverlay = async (req, res) => {
  res.json({
    outlet: "Outlet 47",
    logo: "/assets/outlet-47-logo.png",
    plan: "pro",
    invoiceUrl: "https://dashboard.stripe.com/invoices/inv_abc123"
  });
};
