import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");

// Create a transporter with your email service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pgsvsai555@gmail.com", // Your admin email
    pass: "wihb xhbi dslb govt", // Your email password
  },
});

// Function to notify admin when an order is placed
export function notifyAdminOfNewOrder(orderDetails) {
  const mailOptions = {
    from: "pgsvsai555@gmail.com", // Admin's email
    to: "pgsvsai555@gmail.com", // Admin's email for notification
    replyTo: orderDetails.mail, // User's email as the "Reply-To"
    subject: "New Order Placed",
    text: `Hello Admin,\n\nA new order has been placed. Here are the details:\n\n${JSON.stringify(
      orderDetails,
      null,
      2
    )}\n\nTo approve the order, an automated email will be sent to the customer.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email to admin:", error);
    } else {
      console.log("Order notification email sent to admin:", info.response);

      // Step 2: Simulate Admin Approval after a delay (or upon a trigger from an API/database)
      //   setTimeout(() => {
      // console.log("Admin has approved the order.");
      // autoReplyOrderApproval(orderDetails); // Trigger the automated approval reply
      //   }, 5000); // Adjust delay or integrate with your admin approval logic
    }
  });
}

// Function to automatically reply to the end-user's email upon admin approval
export function autoReplyOrderApproval(orderDetails) {
  const mailOptions = {
    from: "pgsvsai555@gmail.com",
    to: orderDetails?.email, // User's email
    subject: "Order Approved",
    text: `Dear ${orderDetails.user},\n\nYour order with ID: ${orderDetails.orderId} has been approved successfully.\n\nThank you for shopping with us!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending order approval email to user:", error);
    } else {
      console.log(
        "Automated order approval email sent to user:",
        info.response
      );
    }
  });
}

// Example usage:
// Step 1: Notify the admin of the new order
const orderDetails = {
  orderId: "12345",
  item: "Laptop",
  quantity: 1,
  price: "$999",
  user: "John Doe",
  email: "shankarpenmetsa555@gmail.com",
};
// notifyAdminOfNewOrder(orderDetails);

// chain working for end-user not for admin
