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
  handleGetStarted // Add the handleGetStarted prop
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
        ? "https://buy.stripe.com/eVa6secltdZa6di4gh"
        : "https://buy.stripe.com/7sI17Udpx5sEbxC5kk";
      window.location.href = paymentLink;
    } else {
      handleGetStarted(); // Call the handleGetStarted function for the Basic Plan
    }
  };

  const buttonText = title === "Basic Plan" ? "Get Started for Free" : "Subscribe Now";

  return (
    <div className={`PricingCard ${title === "Premium Plan" ? "red-container" : ""}`}>
      <header>
        <p className="card-title">{title}</p>
        <div className="price-container">
          <h1 className="card-price">
            {price}
          </h1>
          {title === "Premium Plan" && !isMonthly && (
            <p className="savings-text">Save {discountPercentage}% with yearly plan</p>
          )}
        </div>
      </header>
      <div className="card-features">
        <div className="card-storage">{storage}</div>
        <div className="card-users-allowed">{users}</div>
        <div className="card-send-up">{sendUp}</div>
      </div>
      {title === "Premium Plan" && isMonthly && (
        <p className="early-bird-offer">Launch Offer: Sign up by August 15 to get our introductory rate! Prices increase to $2.99/month after this date.</p>
      )}
      <button className="card-btn" onClick={handleSubscribe}>{buttonText}</button>
    </div>
  );
};

export default PricingCard;
