import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const purchaseOrderSchema = new Schema({
  poNumber: {
    type: String,
    required: [true, 'PO number is required'],
    unique: true,
    trim: true
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, 'Supplier is required']
  },
  orderDate: {
    type: Date,
    required: [true, 'Order date is required'],
    default: Date.now
  },
  expectedDeliveryDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'shipped', 'received', 'cancelled'],
    default: 'draft'
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  taxAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  notes: {
    type: String,
    trim: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [0.01, 'Quantity must be at least 0.01']
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    taxRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    discountRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    lineTotal: {
      type: Number,
      required: true,
      min: 0
    },
    receivedQuantity: {
      type: Number,
      default: 0,
      min: 0
    },
    notes: {
      type: String,
      trim: true
    }
  }]
}, {
  timestamps: true
});

// Pre-save hook to calculate totals
purchaseOrderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.subtotal = this.items.reduce((sum, item) => sum + item.lineTotal, 0);
    this.taxAmount = this.items.reduce(
      (sum, item) => sum + (item.lineTotal * item.taxRate / 100), 0);
    this.totalAmount = this.subtotal + this.taxAmount - this.discountAmount;
  }
  next();
});

export default PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);