import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Supplier name is required'],
    trim: true
  },
  contactPerson: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true }
  },
  taxId: {
    type: String,
    trim: true
  },
  paymentTerms: {
    type: String,
    enum: ['Net 15', 'Net 30', 'Net 60', 'Due on receipt'],
    default: 'Net 30'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default Supplier = mongoose.model('Supplier', supplierSchema);