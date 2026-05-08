# Moris Enterprises - Deployment Guide

## Overview
This application uses Vite for React frontend and PHP for the backend API. The build outputs everything to the `dist/` folder which is ready to deploy.

## Pre-Deployment Checklist

### 1. Database Setup
- [ ] Create MySQL database: `excelmed_morismarketing`
- [ ] Run SQL migrations from `public/migrations.sql`
- [ ] Create admin user using `public/setup-admin.php`

### 2. Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This will:
- Compile React app to `dist/`
- Copy all files from `public/` to `dist/`
- Generate optimized bundles
- Create the `dist/uploads/` folder structure
- Copy PHP API files

### 3. Verify Build Output

```bash
# Check dist folder structure
ls -la dist/

# Expected structure:
# dist/
# ├── index.html                (React app)
# ├── api.php                   (API entry point)
# ├── config.php                (Configuration)
# ├── Database.php              (Database class)
# ├── AuthHandler.php           (Auth logic)
# ├── LeadHandler.php           (Lead logic)
# ├── ProductHandler.php        (Product logic)
# ├── CampaignHandler.php       (Campaign logic)
# ├── CustomerHandler.php       (Customer logic)
# ├── TrackingHandler.php       (Tracking logic)
# ├── upload-handler.php        (File uploads)
# ├── .htaccess                 (Apache config)
# ├── setup-admin.php           (Admin setup)
# ├── manifest.json
# ├── sw.js
# ├── assets/                   (Minified JS/CSS/images)
# └── uploads/                  (File uploads directory)
#     ├── products/
#     ├── campaigns/
#     └── documents/
```

## Deployment to Server

### Option 1: Manual Upload (FTP/SFTP)

1. **Connect to your server**
   ```bash
   sftp user@morientreprises.com
   ```

2. **Delete old files** (backup first!)
   ```bash
   rm -rf /var/www/morientreprises.com/*
   ```

3. **Upload dist folder contents**
   ```bash
   # Recursively upload all files from dist/ to server root
   cd dist
   put -r * /var/www/morientreprises.com/
   ```

4. **Set proper permissions**
   ```bash
   chmod 755 /var/www/morientreprises.com
   chmod 644 /var/www/morientreprises.com/*.php
   chmod 755 /var/www/morientreprises.com/uploads
   chmod 755 /var/www/morientreprises.com/uploads/*
   ```

### Option 2: Using Git Deployment

1. **Push code to Git**
   ```bash
   git add .
   git commit -m "Production deployment"
   git push origin main
   ```

2. **SSH into server**
   ```bash
   ssh user@morientreprises.com
   cd /var/www/morientreprises.com
   ```

3. **Pull and build on server**
   ```bash
   git pull origin main
   npm install
   npm run build
   cp -r dist/* .
   ```

### Option 3: Automated Deployment Script

Use the deployment script (if available):
```bash
bash deploy.sh
```

## Post-Deployment

### 1. Update Configuration
Edit `dist/config.php` to match production settings:
```php
define('DB_HOST', 'production-db-host');
define('DB_USER', 'production-db-user');
define('DB_PASSWORD', 'production-db-password');
define('DB_NAME', 'production-db-name');
define('API_URL', 'https://morientreprises.com/api.php');
```

### 2. Initialize Admin User

**Via Web Browser:**
```
https://morientreprises.com/setup-admin.php
```

**Via SSH:**
```bash
cd /var/www/morientreprises.com
php setup-admin.php
```

### 3. Delete Sensitive Files

Remove setup scripts from production:
```bash
rm /var/www/morientreprises.com/setup-admin.php
rm /var/www/morientreprises.com/migrations.sql
```

### 4. Verify Deployment

- [ ] Check homepage: `https://morientreprises.com`
- [ ] Test login: `https://morientreprises.com/admin/login`
  - Login lookup should use a prepared statement against the active admin email, then `password_verify()`
- [ ] Test API: `https://morientreprises.com/api.php/auth/verify`
- [ ] Check uploads: Try uploading a file in admin
- [ ] Verify analytics: Check Google Analytics is tracking

### 5. SSL Certificate

Ensure you have a valid SSL certificate:
```bash
# Using Let's Encrypt (free)
certbot certonly --webroot -w /var/www/morientreprises.com -d morientreprises.com
```

## Directory Structure After Deployment

```
/var/www/morientreprises.com/
├── index.html                 # React SPA entry
├── api.php                    # API router
├── config.php                 # Configuration
├── Database.php               # DB connection
├── *Handler.php               # Request handlers
├── upload-handler.php         # File upload handler
├── .htaccess                  # URL rewriting
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker
├── assets/                    # CSS, JS, images
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── *.png
└── uploads/                   # User uploads
    ├── products/
    ├── campaigns/
    └── documents/
```

## Environment Variables

Create `dist/.env` (optional, if using env loading):
```
API_URL=https://morientreprises.com/api.php
GA_ID=G-1DEGE0WQHW
```

Or update in `config.php` directly.

## Troubleshooting

### API not responding
- Check `config.php` database credentials
- Verify PHP version (7.4+)
- Check error logs: `/var/log/apache2/error.log`

### Uploads not working
- Check folder permissions: `chmod 755 uploads/`
- Verify `upload_max_filesize` in PHP config
- Check disk space

### SPA routing not working
- Verify `.htaccess` is enabled (mod_rewrite)
- Check Apache conf for `AllowOverride All`

### Database connection error
- Verify MySQL is running
- Check credentials in `config.php`
- Test connection: `mysql -h localhost -u user -p database`

## Rollback

To rollback to previous version:
```bash
cd /var/www/morientreprises.com
git checkout previous-commit
npm install
npm run build
cp -r dist/* .
```

## Performance Tips

1. **Enable Gzip compression** (in .htaccess)
2. **Set appropriate cache headers** (in .htaccess)
3. **Use CDN for assets** (optional)
4. **Enable PHP OPcache** in server config
5. **Monitor database performance** with slow query log

## Security Checklist

- [ ] Remove/rename setup-admin.php
- [ ] Update database credentials
- [ ] Enable HTTPS/SSL
- [ ] Set proper file permissions
- [ ] Hide sensitive files (.htaccess)
- [ ] Regular backups
- [ ] Monitor access logs
- [ ] Keep PHP and packages updated

## Monitoring

Monitor these endpoints:
- API health: `https://morientreprises.com/api.php/auth/verify`
- Database: Run health checks from dashboard
- Logs: Check error logs regularly
- Analytics: Google Analytics dashboard

## Support

For deployment issues:
1. Check error logs
2. Verify all prerequisites
3. Test locally first
4. Contact hosting provider if needed
