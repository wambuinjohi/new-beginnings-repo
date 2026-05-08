# Moris Enterprises - Marketing Automation Setup Guide

## Overview
This guide covers the setup, configuration, and testing of the complete marketing automation system for Moris Enterprises.

## Backend Setup (PHP API)

### 1. Database Setup

**Create the database:**
```bash
# Access your MySQL server
mysql -u your_username -p

# Create the database
CREATE DATABASE moris_marketing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Run the migration:**
```bash
mysql -u your_username -p moris_marketing < public/api/migrations/001_initial_schema.sql
```

**Verify tables created:**
```sql
USE moris_marketing;
SHOW TABLES;
```

Expected tables:
- users
- leads
- customers
- campaigns
- campaign_logs
- email_queue
- lead_scoring_rules
- tracking_pixels
- products

### 2. Backend Configuration

**Create backend .env file:**
```bash
cp public/.env.example public/.env
```

**Edit `public/.env` with your credentials:**
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=moris_marketing
API_URL=https://yoursite.com/api (or http://localhost:5173/api for dev)
JWT_SECRET=your_very_long_random_secret_key_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
ADMIN_EMAIL=admin@morisentreprises.com
APP_ENV=production
```

### 3. Default Admin User

The migration creates a default admin user:
- **Email:** admin@morisentreprises.com
- **Password:** admin123

**Change the default password immediately after first login!**

---

## Frontend Setup (React)

### 1. Environment Configuration

**Create .env file:**
```bash
cp .env.example .env
```

**Edit `.env`:**
```
VITE_API_URL=http://localhost:5173/api (or your backend API URL)
VITE_GA_ID=G-XXXXXXXXXX (Google Analytics ID - optional)
VITE_META_PIXEL_ID=123456789 (Meta Pixel ID - optional)
VITE_GOOGLE_ADS_ID=AW-XXXXXXXXX (Google Ads conversion ID - optional)
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Testing

### Backend API Testing

#### 1. Test Lead Creation (Public Endpoint)
```bash
curl -X POST http://localhost:5173/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+254712345678",
    "company": "Test Corp",
    "source": "contact_form",
    "product_interest": "Laboratory Chemicals"
  }'
```

Expected response: `201 Created` with `lead_id`

#### 2. Test Admin Login
```bash
curl -X POST http://localhost:5173/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@morisentreprises.com",
    "password": "admin123"
  }'
```

Backend login flow:
1. Prepare a lookup for the active user by email
2. Bind the email and `active` status as parameters
3. Fetch the row with `get_result()` / `fetch_assoc()`
4. Verify the password with `password_verify()`
5. Return `token` and `user` on success

Expected response: `200 OK` with `token` and `user` object

#### 3. Test Protected Endpoint (Leads List)
```bash
# Replace TOKEN with the token from login response
curl -X GET http://localhost:5173/api/leads \
  -H "Authorization: Bearer TOKEN"
```

Expected response: `200 OK` with `leads` array

#### 4. Create a Campaign
```bash
curl -X POST http://localhost:5173/api/campaigns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Welcome Campaign",
    "subject": "Welcome to Moris Enterprises!",
    "template": "Thank you for your inquiry. We look forward to serving you."
  }'
```

#### 5. Create a Product
```bash
curl -X POST http://localhost:5173/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Lab Thermometer",
    "category": "Laboratory Equipment",
    "price": 2500,
    "stock": 50,
    "sku": "LAB-THERM-001",
    "description": "Digital laboratory thermometer"
  }'
```

### Frontend Testing

#### 1. Test Admin Login
1. Navigate to `http://localhost:5173/admin/login`
2. Enter credentials:
   - Email: `admin@morisentreprises.com`
   - Password: `admin123`
3. Click "Sign in"
4. Should redirect to `/admin` dashboard

#### 2. Test Admin Dashboard
1. Visit `http://localhost:5173/admin`
2. Should display KPI cards with:
   - Total Leads
   - Qualified Leads
   - Customers
   - Average Lead Score
   - Active Campaigns
3. Should show Quick Actions links

#### 3. Test Leads Manager
1. Navigate to `/admin/leads`
2. Should display table of all leads
3. Test filtering by status (New, Contacted, Qualified, Converted)
4. Test search functionality
5. Click eye icon to view lead details

#### 4. Test Customers Manager
1. Navigate to `/admin/customers`
2. Should display total customers, revenue, avg value
3. Test status filtering
4. Verify customer data displays correctly

#### 5. Test Campaigns Manager
1. Navigate to `/admin/campaigns`
2. Click "New Campaign" button
3. Fill in campaign details:
   - Name: "Test Campaign"
   - Subject: "Test Subject"
   - Body: "Test email body"
4. Click "Create Campaign"
5. Should see campaign in the list

#### 6. Test Products Manager
1. Navigate to `/admin/products`
2. Click "New Product" button
3. Add product details
4. Verify product appears in table
5. Test deletion

#### 7. Test Protected Routes
1. Delete the admin token from localStorage:
   ```javascript
   localStorage.removeItem('admin_token');
   ```
2. Try to access `/admin/leads`
3. Should redirect to `/admin/login`

#### 8. Test Logout
1. Click user menu in top-right
2. Click "Logout"
3. Should redirect to `/admin/login`
4. Token should be removed from localStorage

---

## Retargeting Pixel Setup

### Google Analytics 4

1. Get your GA4 Property ID from Google Analytics
2. Add to `.env`:
   ```
   VITE_GA_ID=G-XXXXXXXXXX
   ```
3. Verify pixel is firing by opening browser DevTools → Network tab
4. Look for requests to `www.google-analytics.com`

### Meta Pixel

1. Get your Meta Pixel ID from Meta Business Manager
2. Add to `.env`:
   ```
   VITE_META_PIXEL_ID=123456789
   ```
3. Verify pixel is firing:
   - Use Meta Pixel Helper browser extension
   - Check Network tab for `facebook.com/tr` requests
4. Check Meta Events Manager for incoming events

### Testing Pixel Events

Once pixels are configured, test events:

1. **Page View**: Should fire automatically on page load
2. **Lead Creation**: Submit a lead form and verify:
   - Meta Pixel: "Lead" event
   - GA4: "generate_lead" event
3. **Product View**: Navigate to product pages
   - Meta Pixel: "ViewContent" event
   - GA4: "view_item" event

---

## Database Backup & Recovery

### Backup Database
```bash
mysqldump -u username -p moris_marketing > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
mysql -u username -p moris_marketing < backup_20240101.sql
```

---

## Troubleshooting

### Common Issues

**Database Connection Error**
- Verify DB credentials in `public/.env`
- Ensure MySQL server is running
- Check database exists: `SHOW DATABASES;`

**API Returns 401 Unauthorized**
- Token may be expired
- Try logging in again
- Check token format in Authorization header

**Admin Dashboard Not Loading**
- Check browser console for errors
- Verify API_URL in frontend `.env`
- Check network requests in DevTools
- Ensure backend API is running

**Pixels Not Firing**
- Check `.env` has correct IDs
- Verify pixel initialization in `main.tsx`
- Clear browser cache
- Test with incognito window
- Check browser console for errors

**Lead Not Being Created**
- Verify lead email doesn't already exist
- Check form validation
- Inspect network request in DevTools
- Check backend logs

---

## Performance Optimization

### Frontend
- Lazy load admin components
- Implement pagination for large datasets
- Cache campaign templates
- Minimize bundle size

### Backend
- Add database indexes on frequently queried columns
- Implement query caching
- Use prepared statements
- Implement rate limiting on public endpoints

### Email Sending
- Use queue system for emails
- Set up cron job to process email queue
- Implement retry logic for failed sends
- Monitor SMTP quota

---

## Security Checklist

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET in backend
- [ ] Enable HTTPS in production
- [ ] Implement CORS properly for your domain
- [ ] Add rate limiting to API
- [ ] Keep dependencies updated
- [ ] Regular database backups
- [ ] Monitor for suspicious activity
- [ ] Implement email verification for leads
- [ ] Secure SMTP password (use app-specific password)

---

## Deployment

### Shared Hosting (cPanel)

1. Upload files to public_html
2. Create MySQL database via cPanel
3. Run migration via phpMyAdmin
4. Configure .env file
5. Update frontend API_URL to production domain
6. Set file permissions:
   ```bash
   chmod 644 public/api.php
   chmod 755 public/api/
   chmod 755 public/logs/ (if exists)
   ```

### Node.js Hosting

1. Build frontend: `npm run build`
2. Deploy to hosting platform (Vercel, Netlify, etc.)
3. Deploy backend to Node.js server
4. Configure environment variables
5. Set up SSL/HTTPS

---

## Support & Documentation

- API Documentation: See `.builder/plans/tropical-index-plan.md`
- UI Components: Built with shadcn/ui
- Charts: Built with Recharts
- Database: MySQL with InnoDB
- Backend: PHP 7.4+
- Frontend: React 18 + TypeScript

---

## Next Steps

1. Configure database credentials
2. Run database migration
3. Update environment variables
4. Test API endpoints
5. Test admin dashboard
6. Configure retargeting pixels
7. Deploy to production
8. Monitor performance and errors
