import React from "react";
import "../assets/css/PricingCard.css";

const PricingCard = ({
  title,
  price,
  monthlyPrice = "$0",
  annualPrice = "$0",
  storage,
  users,
  sendUp,
  isMonthly,
  handleGetStarted
}) => {
  const monthlyPriceNumber = parseFloat(monthlyPrice.slice(1));
  const annualPriceNumber = parseFloat(annualPrice.slice(1));
  const originalAnnualPrice = (monthlyPriceNumber * 12).toFixed(2);
  const discountPercentage = (
    (1 - annualPriceNumber / originalAnnualPrice) *
    100
  ).toFixed(2);

  const handleSubscribe = () => {
    let paymentLink;
    if (title === "Premium Plan") {
      paymentLink = isMonthly
        ? "https://buy.stripe.com/00gbMycltcV69pu8wy"
        : "https://buy.stripe.com/3csdUG99hdZa0SYaEH";
      window.location.href = paymentLink;
    } else {
      handleGetStarted();
    }
  };

  const buttonText = title === "Basic Plan" ? "Get Started for Free" : "Subscribe Now";

  return (
    <div className={`pricing-card ${title === "Premium Plan" ? "premium-card" : ""}`}>
      <header className="card-header">
        <h2 className="card-title">{title}</h2>
        <div className="price-container">
          <h1 className="card-price">{price}<span className="price-period">/{isMonthly ? 'month' : 'year'}</span></h1>
          {title === "Premium Plan" && !isMonthly && (
            <p className="savings-text">Save {discountPercentage}% with yearly plan</p>
          )}
        </div>
      </header>
      <div className="card-features">
        <p className="feature">{storage}</p>
        <p className="feature">{users}</p>
        <p className="feature">{sendUp}</p>
      </div>
      {title === "Premium Plan" && isMonthly && (
        <p className="early-bird-offer">
          Launch Offer: Sign up by August 15 to get our introductory rate!
          Prices increase to $2.99/month after this date.
        </p>
      )}
      <button className="subscribe-btn" onClick={handleSubscribe}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;