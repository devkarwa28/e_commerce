const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const User = require("../models/UserModel");
const sendEmail = require("../utilites/sendEmail");

exports.placeOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      couponCode,
      paymentStatus,
      paymentId,
    } = req.body;

    // ✅ Validate shippingAddress fields explicitly
    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      return res
        .status(400)
        .json({ message: "Complete shipping address is required" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "No Items in Cart" });
    }

    // ✅ Validate stock using already-populated product data (no extra DB call)
    for (const item of cart.items) {
      if (!item.product) {
        return res.status(400).json({
          message: "One or more products in your cart no longer exist",
        });
      }

      const selectedOption = item.product.weightOptions.find(
        (opt) => opt.label === item.weightLabel
      );

      if (!selectedOption) {
        return res.status(400).json({
          message: `Weight option "${item.weightLabel}" not found for ${item.product.pname}`,
        });
      }

      if (selectedOption.stock < item.quantity) {
        return res.status(400).json({
          message: `"${item.product.pname}" (${item.weightLabel}) is out of stock`,
        });
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      pname: item.product.pname,
      mainImage: item.product.mainImage,
      weightLabel: item.weightLabel,
      price: item.price,
      quantity: item.quantity,
    }));

    let discount = 0;
    let finalAmount = cart.totalAmount;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });

      if (!coupon || !coupon.isActive) {
        return res.status(400).json({ message: "Invalid Coupon" });
      }
      if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        return res.status(400).json({ message: "Coupon Expired" });
      }
      if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
        return res.status(400).json({ message: "Coupon usage limit reached" });
      }
      if (coupon.usedBy.includes(req.user._id)) {
        return res.status(400).json({ message: "Coupon already used" });
      }
      if (cart.totalAmount < coupon.minOrderAmount) {
        return res.status(400).json({
          message: `Minimum order amount of ₹${coupon.minOrderAmount} required`,
        });
      }

      if (coupon.discountType === "percentage") {
        discount = (cart.totalAmount * coupon.discountValue) / 100;
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
      } else {
        discount = coupon.discountValue;
      }

      finalAmount = cart.totalAmount - discount;
      coupon.usedCount += 1;
      coupon.usedBy.push(req.user._id);
      await coupon.save();
    }


    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress: {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone,
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        country: shippingAddress.country || "India",
        landmark: shippingAddress.landmark || "",
      },
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentStatus || "Pending",
      paymentId: paymentId || null,
      totalAmount: cart.totalAmount,
      discountAmount: discount,
      finalAmount,
      couponCode: couponCode || null,
      isPaid: paymentStatus === "Paid",
      paidAt: paymentStatus === "Paid" ? new Date() : null,
    });

    for (const item of cart.items) {
      await Product.findOneAndUpdate(
        {
          _id: item.product._id,
          "weightOptions.label": item.weightLabel,
        },
        {
          $inc: { "weightOptions.$.stock": -item.quantity },
        }
      );
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    if (paymentMethod === "COD" || paymentStatus === "Paid") {
      try {
        const user = await User.findById(req.user._id);

        const itemsHtml = order.items
          .map(
            (item) => `
            <tr style="border-bottom: 1px solid #E5E0DA;">
              <td style="padding: 12px 5px; color: #1A1A1A; word-break: break-word;">
                <strong style="font-size: 14px;">${item.pname}</strong><br>
                <span style="font-size: 12px; color: #6C6C6C;">Weight: ${item.weightLabel}</span>
              </td>
              <td style="padding: 12px 5px; text-align: center; color: #1A1A1A; font-size: 14px;">${item.quantity}</td>
              <td style="padding: 12px 5px; text-align: right; color: #1A1A1A; font-weight: 600; font-size: 14px; white-space: nowrap;">₹${item.price}</td>
            </tr>`
          )
          .join("");

        const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @media only screen and (max-width: 600px) {
              .email-container { padding: 20px 10px !important; }
              .content-wrap { padding: 20px !important; }
              .order-summary th { font-size: 13px !important; padding: 10px 5px !important; }
              .title-header { font-size: 20px !important; }
              .summary-box { padding: 15px 10px !important; }
              .summary-text { font-size: 14px !important; }
              .header-box { padding: 20px 15px !important; }
            }
          </style>
        </head>
        <body style="margin:0;padding:0;font-family:'Poppins',Arial,sans-serif;background-color:#F8F5F1;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F8F5F1;">
            <tr>
              <td align="center" class="email-container" style="padding:40px 20px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                  style="max-width:600px;background-color:#ffffff;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.05);overflow:hidden;">
                  <tr>
                    <td class="header-box" style="background-color:#5C4033;padding:30px;text-align:center;">
                      <h1 class="title-header" style="color:#ffffff;margin:0;font-size:24px;letter-spacing:1px;">
                        Order Confirmed 🎉
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td class="content-wrap" style="padding:30px;">
                      <p style="font-size:16px;line-height:1.6;color:#1A1A1A;margin-top:0;">Hi ${user.uname},</p>
                      <p style="font-size:15px;line-height:1.6;color:#6C6C6C;">
                        Thank you for your order! We're excited to let you know that your order has been received and is being processed.
                      </p>

                      <h3 style="color:#5C4033;border-bottom:2px solid #C89B3C;padding-bottom:10px;margin-top:30px;font-weight:600;font-size:18px;">
                        Order Summary
                      </h3>

                      <div style="overflow-x:auto;">
                        <table class="order-summary" style="width:100%;border-collapse:collapse;margin-top:15px;min-width:250px;">
                          <thead>
                            <tr style="background-color:#F8F5F1;">
                              <th style="padding:12px 5px;text-align:left;color:#1A1A1A;font-weight:600;font-size:14px;">Item</th>
                              <th style="padding:12px 5px;text-align:center;color:#1A1A1A;font-weight:600;font-size:14px;">Qty</th>
                              <th style="padding:12px 5px;text-align:right;color:#1A1A1A;font-weight:600;font-size:14px;">Price</th>
                            </tr>
                          </thead>
                          <tbody>${itemsHtml}</tbody>
                        </table>
                      </div>

                      <div class="summary-box" style="margin-top:25px;background-color:#F8F5F1;padding:20px;border-radius:8px;">
                        <table style="width:100%;border-collapse:collapse;">
                          <tr>
                            <td class="summary-text" style="padding:5px 0;color:#6C6C6C;font-weight:bold;font-size:15px;">Order ID:</td>
                            <td class="summary-text" style="padding:5px 0;color:#1A1A1A;text-align:right;font-size:15px;word-break:break-all;">
                              ${order._id}
                            </td>
                          </tr>
                          <tr>
                            <td class="summary-text" style="padding:5px 0;color:#6C6C6C;font-weight:bold;font-size:15px;">Payment:</td>
                            <td class="summary-text" style="padding:5px 0;text-align:right;font-size:15px;font-weight:bold;
                              color:${order.paymentStatus === "Paid" ? "#3E7C59" : "#C89B3C"};">
                              ${order.paymentStatus}
                            </td>
                          </tr>
                          ${
                            discount > 0
                              ? `<tr>
                                  <td style="padding:5px 0;color:#6C6C6C;font-size:14px;">Discount:</td>
                                  <td style="padding:5px 0;text-align:right;font-size:14px;color:#3E7C59;">- ₹${discount}</td>
                                </tr>`
                              : ""
                          }
                          <tr>
                            <td colspan="2" style="border-top:1px solid #E5E0DA;padding:10px 0 0;"></td>
                          </tr>
                          <tr>
                            <td style="padding:5px 0;color:#1A1A1A;font-weight:bold;font-size:18px;">Total Amount:</td>
                            <td style="padding:5px 0;color:#5C4033;font-weight:bold;font-size:18px;text-align:right;">
                              ₹${order.finalAmount}
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div style="text-align:center;margin-top:40px;padding-top:30px;border-top:1px dashed #E5E0DA;">
                        <p style="font-size:15px;color:#1A1A1A;margin-bottom:5px;">Your order will be delivered soon! 🚚</p>
                        <p style="font-size:13px;color:#6C6C6C;margin-top:0;">If you have any questions, simply reply to this email.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#1E1B18;padding:20px;text-align:center;">
                      <p style="color:#B5B5B5;font-size:12px;margin:0;">
                        &copy; ${new Date().getFullYear()} Nutrivia. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>`;

        await sendEmail({
          to: user.email,
          subject: "Order Confirmation — Nutrivia",
          html: emailHTML,
        });
      } catch (emailError) {
        console.error("Email failed but order placed:", emailError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("placeOrder error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getMyOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    res.json({ order });
  } catch (err) {
    console.error("Error in getOrderById:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      status = "",
      paymentStatus = "",
    } = req.query;
    page = isNaN(Number(page)) ? 1 : Number(page);
    limit = isNaN(Number(limit)) ? 10 : Number(limit);
    const skip = (page - 1) * limit;

    let query = {};

    if (status) {
      query.orderStatus = status;
    }
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (search && search.trim() !== "") {
      const querySearch = search.trim();
      const isObjectId = mongoose.Types.ObjectId.isValid(querySearch);

      if (isObjectId) {
        query._id = querySearch;
      } else {
        const users = await User.find({
          $or: [
            { uname: { $regex: querySearch, $options: "i" } },
            { email: { $regex: querySearch, $options: "i" } },
          ],
        }).select("_id");

        const userIds = users.map((u) => u._id);

        if (userIds.length === 0) {
          return res.json({
            orders: [],
            page: Number(page),
            totalPages: 0,
            totalOrders: 0,
          });
        }
        query.user = { $in: userIds };
      }
    }
    const totalOrders = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate("user", "uname email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      orders,
      page: Number(page),
      totalPages: Math.ceil(totalOrders / Number(limit)),
      totalOrders,
    });
  } catch (err) {
    console.error("Error in getAllOrders:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({ message: "no order finded" });
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
      if (orderStatus === "Delivered") {
        order.deliveredAt = new Date();
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;

      if (paymentStatus === "Paid") {
        order.isPaid = true;
        order.paidAt = new Date();
      }
    }

    await order.save();

    res.json({
      success: true,
      message: "Order Updated Successfully",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
