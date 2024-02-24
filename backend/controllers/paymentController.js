// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // Function to create a Stripe customer and associate it with a user
// const createStripeCustomer = async (user) => {
//   const stripeCustomer = await stripe.customers.create({
//     email: user.email,
//     name: user.name,
//   });

//   // Save the Stripe customer ID to the user in your database
//   user.stripeCustomerId = stripeCustomer.id;
//   await user.save();

//   return stripeCustomer.id;
// };

// // Function to add a card to a Stripe customer
// const addCardToStripeCustomer = async (stripeCustomerId, cardToken) => {
//   await stripe.customers.createSource(stripeCustomerId, {
//     source: cardToken,
//   });
// };

// // Function to create a charge for a user
// const createCharge = async (user, amount, orderId) => {
//   // Ensure the user has a Stripe customer ID
//   if (!user.stripeCustomerId) {
//     // If not, create a Stripe customer and associate it with the user
//     await createStripeCustomer(user);
//   }

//   // Use a test card token instead of raw card details
//   const paymentMethod = 'pm_card_visa';

//   // Attach the Payment Method to the customer
//   await stripe.paymentMethods.attach(paymentMethod, { customer: user.stripeCustomerId });

//   // Charge the user
//   const charge = await stripe.charges.create({
//     amount: amount * 100, // amount in cents
//     currency: 'usd',
//     customer: user.stripeCustomerId,
//     metadata: { order_id: orderId },
//   });

//   return charge;
// };

// module.exports = {
//   createStripeCustomer,
//   addCardToStripeCustomer,
//   createCharge,
// };



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Function to create a Payment Intent for a user
const createPaymentIntent = async (user, amount, orderId) => {
  // Ensure the user has a Stripe customer ID
  if (!user.stripeCustomerId) {
    // If not, create a Stripe customer and associate it with the user
    await createStripeCustomer(user);
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // amount in cents
    currency: 'usd',
    customer: user.stripeCustomerId,
    metadata: { order_id: orderId },
  });

  return paymentIntent;
};

module.exports = {
  createPaymentIntent,
};
