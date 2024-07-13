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
}) => {
  const originalPrice = (parseFloat(monthlyPrice.slice(1)) * 12).toFixed(2);
  const discountPercentage = (
    (1 - parseFloat(annualPrice.slice(1)) / originalPrice) *
    100
  ).toFixed(2);

  const handleSubscribe = () => {
    let paymentLink;
    if (title === "Premium Plan") {
      paymentLink = isMonthly
        ? "https://buy.stripe.com/test_aEU7t61iH5Vqdb29AE"
        : "https://buy.stripe.com/test_7sI00Ed1pcjOef6145";
    } else {
      // For Basic Plan or any other plan, you can define a default behavior
      alert("This plan is free!");
      return;
    }
    window.location.href = paymentLink;
  };

  const buttonText = title === "Basic Plan" ? "Get Started for Free" : "Subscribe Now";

  return (
    <div className={`PricingCard ${title === "Premium Plan" ? "red-container" : ""}`}>
      <header>
        <p className="card-title">{title}</p>
        <div className="price-container">
          {isMonthly ? (
            <>
              <h1 className={`card-price ${title === "Basic Plan" ? "basic-plan-price" : ""}`}>
                {title === "Basic Plan" ? "$0" : price}
              </h1>
              {title === "Basic Plan" && (
                <p className="card-price-monthly">{monthlyPrice}</p>
              )}
            </>
          ) : (
            <>
              <h1 className="card-price">
                {price} {title !== "Basic Plan" && <span className="original-price">${originalPrice}</span>}
              </h1>
              {title !== "Basic Plan" && (
                <p className="savings-text">Save {discountPercentage}% with yearly plan</p>
              )}
            </>
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
