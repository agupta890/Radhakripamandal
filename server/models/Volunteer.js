const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'कृपया नाम दर्ज करें'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'कृपया मोबाइल नंबर दर्ज करें'],
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      required: [true, 'कृपया शहर/गाँव दर्ज करें'],
      trim: true
    },
    interest: {
      type: String,
      enum: ['गौ सेवा', 'अन्नक्षेत्र / भोजन सेवा', 'धार्मिक कार्यक्रम व उत्सव', 'शिक्षा एवं बाल संस्कार', 'प्रचार एवं तकनीक सेवा', 'अन्य सेवा'],
      default: 'गौ सेवा'
    },
    message: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'approved'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
