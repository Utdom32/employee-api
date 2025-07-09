const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be at least 0']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  material: {
    type: String,
    required: [true, 'Material is required'],
    enum: ['Leather', 'Canvas', 'Nylon', 'Polyester', 'Cotton', 'Synthetic', 'Jute', 'Other']
  },
  colors: [{
    type: String,
    required: [true, 'At least one color is required']
  }],
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large', 'Extra Large', 'One Size'],
    default: 'One Size'
  },
  dimensions: {
    length: Number,   // in centimeters
    width: Number,    // in centimeters
    height: Number,   // in centimeters
    unit: {
      type: String,
      default: 'cm',
      enum: ['cm', 'in']
    }
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Handbag',
      'Backpack',
      'Tote',
      'Clutch',
      'Messenger',
      'Satchel',
      'Duffle',
      'Waist Bag',
      'Other'
    ],
    default: 'Other'
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  images: [{
    type: String,
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'At least one image is required'
    }
  }],
  features: [String],
  isWaterproof: {
    type: Boolean,
    default: false
  },
  weight: {
    value: Number,  // in grams
    unit: {
      type: String,
      default: 'g',
      enum: ['g', 'kg', 'lb']
    }
  },
  ratings: {
    average: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5'],
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted price
bagSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Stock status indicator
bagSchema.virtual('inStock').get(function() {
  return this.stockQuantity > 0;
});

// Indexes for frequently queried fields
bagSchema.index({ name: 'text', description: 'text' });
bagSchema.index({ brand: 1, category: 1, price: 1 });

module.exports = mongoose.model('Bag', bagSchema);