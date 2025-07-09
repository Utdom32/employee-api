import mongoose, { Schema } from "mongoose";

const purchaseReceiptSchema = new Schema({
  po: {
    type: Schema.Types.ObjectId,
    ref: 'PurchaseOrder',
    required: [true, 'Purchase order reference is required']
  },
  receiptNumber: {
    type: String,
    required: [true, 'Receipt number is required'],
    unique: true,
    trim: true
  },
  receiptDate: {
    type: Date,
    required: [true, 'Receipt date is required'],
    default: Date.now
  },
  receivedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  itemsReceived: [{
    poItemIndex: {
      type: Number,
      required: true,
      min: 0
    },
    quantityReceived: {
      type: Number,
      required: true,
      min: [0.01, 'Quantity must be at least 0.01']
    },
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'damaged'],
      default: 'good'
    },
    notes: {
      type: String,
      trim: true
    }
  }]
}, {
  timestamps: true
});

// Post-save hook to update PO received quantities
purchaseReceiptSchema.post('save', async function(doc) {
  const PurchaseOrder = mongoose.model('PurchaseOrder');
  const po = await PurchaseOrder.findById(doc.po);
  
  doc.itemsReceived.forEach(receiptItem => {
    if (po.items[receiptItem.poItemIndex]) {
      po.items[receiptItem.poItemIndex].receivedQuantity += receiptItem.quantityReceived;
    }
  });
  
  // Update PO status if all items are received
  const allReceived = po.items.every(item => 
    Math.abs(item.quantity - item.receivedQuantity) < 0.01
  );
  
  if (allReceived) {
    po.status = 'received';
  }
  
  await po.save();
});

export default PurchaseReceipt = mongoose.model('PurchaseReceipt', purchaseReceiptSchema);