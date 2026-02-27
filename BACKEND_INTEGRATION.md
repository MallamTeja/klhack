# TaxFlow Agent - Backend Integration Guide

## Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```env
# MongoDB Connection
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/taxflow?retryWrites=true&w=majority

# API Authentication Key
API_KEY=your_secure_api_key_here
```

## Backend Integration Points

### 1. User Onboarding (`/src/app/components/Onboarding.tsx`)

**Current State**: Data saved to localStorage  
**TODO**: Save to MongoDB

```javascript
// Replace the localStorage save with:
const response = await fetch('/api/onboarding', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.API_KEY}` // LOAD FROM ENV: API_KEY
  },
  body: JSON.stringify(formData)
});

// MongoDB Schema Suggestion:
{
  businessName: String,
  ownerName: String,
  email: String,
  phone: String,
  turnover: String,
  businessType: String,
  createdAt: Date
}
```

### 2. Receipt Upload (`/src/app/components/Upload.tsx`)

**Current State**: Simulated upload with mock processing  
**TODO**: Upload files and extract data using OCR/AI

```javascript
// Upload receipts to server
const formData = new FormData();
Array.from(selectedFiles).forEach(file => formData.append('receipts', file));

const response = await fetch('/api/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}` // LOAD FROM ENV: API_KEY
  },
  body: formData
});

// Process with OCR/AI to extract:
// - Vendor name
// - Amount
// - GST amount
// - Date
// - Receipt number
// - Category

// MongoDB Schema Suggestion:
{
  userId: ObjectId,
  receiptNumber: String,
  vendor: String,
  date: Date,
  amount: Number,
  gst: Number,
  category: String,
  fileUrl: String,
  extractedData: Object,
  verified: Boolean,
  uploadedAt: Date
}
```

### 3. Data Preview (`/src/app/components/Preview.tsx`)

**Current State**: Mock extracted data  
**TODO**: Fetch from MongoDB

```javascript
// Fetch extracted data from MongoDB
const response = await fetch('/api/receipts/extract', {
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}` // LOAD FROM ENV: API_KEY
  }
});

const extractedData = await response.json();

// Allow user to edit and save corrections back to MongoDB
const saveResponse = await fetch('/api/receipts/update', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.API_KEY}`
  },
  body: JSON.stringify({ updates: extractedData })
});
```

### 4. Export/Summary Generation (`/src/app/components/Export.tsx`)

**Current State**: Simulated file download  
**TODO**: Generate actual PDF/Excel/JSON files

```javascript
// Generate filing documents
const response = await fetch('/api/export', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.API_KEY}` // LOAD FROM ENV: API_KEY
  },
  body: JSON.stringify({ 
    format: 'pdf', // or 'excel', 'json'
    month: 'February 2026' 
  })
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = `TaxFlow_Summary_${month}_${year}.${format}`;
link.click();

// MongoDB Schema for Summary:
{
  userId: ObjectId,
  month: String,
  year: Number,
  totalReceipts: Number,
  totalAmount: Number,
  totalGST: Number,
  netLiability: Number,
  receipts: [ObjectId],
  generatedAt: Date,
  status: String // 'draft', 'completed', 'filed'
}
```

### 5. Dashboard Data (`/src/app/components/Dashboard.tsx`)

**Current State**: Mock statistics  
**TODO**: Fetch from MongoDB

```javascript
// Fetch dashboard stats
const response = await fetch('/api/dashboard/stats', {
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}` // LOAD FROM ENV: API_KEY
  }
});

const stats = await response.json();
// Returns: receiptsThisMonth, totalSaved, complianceScore, nextDeadline, etc.
```

### 6. Filing History (`/src/app/components/History.tsx`)

**Current State**: Mock filing records  
**TODO**: Fetch from MongoDB

```javascript
// Fetch filing history
const response = await fetch('/api/filings/history', {
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}` // LOAD FROM ENV: API_KEY
  }
});

const history = await response.json();
```

## MongoDB Collections Structure

### 1. `users`
```javascript
{
  _id: ObjectId,
  businessName: String,
  ownerName: String,
  email: String,
  phone: String,
  turnover: String,
  businessType: String,
  plan: String, // 'free', 'pro', 'enterprise'
  createdAt: Date,
  updatedAt: Date
}
```

### 2. `receipts`
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  receiptNumber: String,
  vendor: String,
  date: Date,
  amount: Number,
  gst: Number,
  category: String,
  fileUrl: String,
  extractedData: {
    raw: Object,
    confidence: Number
  },
  verified: Boolean,
  month: String,
  year: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. `summaries`
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  month: String,
  year: Number,
  totalReceipts: Number,
  totalAmount: Number,
  totalGST: Number,
  inputCredit: Number,
  netLiability: Number,
  receiptIds: [ObjectId],
  status: String, // 'draft', 'completed', 'filed'
  filedDate: Date,
  documents: {
    pdf: String,
    excel: String,
    json: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 4. `activities`
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  action: String,
  details: Object,
  timestamp: Date
}
```

## API Endpoints to Implement

- `POST /api/onboarding` - Create new user
- `POST /api/upload` - Upload receipts
- `GET /api/receipts/extract` - Get extracted data
- `PATCH /api/receipts/update` - Update receipt data
- `POST /api/export` - Generate filing documents
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/filings/history` - Get filing history
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update user profile

## Security Recommendations

1. **Never expose API_KEY in frontend code**
   - Use it only in backend API calls
   - Implement proper JWT authentication for users

2. **Validate all inputs** on the server side

3. **Use HTTPS** for all API communications

4. **Implement rate limiting** on API endpoints

5. **Encrypt sensitive data** in MongoDB

6. **Regular backups** of MongoDB data

## OCR/AI Integration Suggestions

For receipt data extraction, consider:

1. **Tesseract.js** - Open source OCR
2. **Google Cloud Vision API** - Accurate commercial option
3. **AWS Textract** - Good for receipts/invoices
4. **Azure Form Recognizer** - Pre-trained for receipts

## File Storage

Store uploaded receipts in:
- **AWS S3**
- **Google Cloud Storage**
- **MongoDB GridFS** (for smaller files)

Store the file URL in the receipts collection and reference it.

## Next Steps

1. Set up MongoDB database
2. Create backend API with Node.js/Express (or your preferred stack)
3. Implement authentication (JWT)
4. Integrate OCR service for receipt extraction
5. Set up file storage for receipt images
6. Implement document generation (PDF/Excel)
7. Add email service for reminders and reports
8. Set up cron jobs for deadline reminders

## Environment Variables in Production

For production deployment:
- Use environment variable management (Vercel, Railway, Render, etc.)
- Never commit `.env` to version control
- Rotate API keys regularly
- Use different keys for dev/staging/production
