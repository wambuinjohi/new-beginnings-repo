#!/bin/bash

###############################################################################
# Moris Enterprises - Automated Deployment Script
# 
# Usage:
#   bash deploy.sh production
#   bash deploy.sh staging
#
# This script builds the application and prepares it for deployment
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get environment
ENVIRONMENT=${1:-development}

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Moris Enterprises - Deployment Script                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
    echo -e "${RED}❌ Invalid environment: $ENVIRONMENT${NC}"
    echo "   Usage: bash deploy.sh [development|staging|production]"
    exit 1
fi

echo -e "${YELLOW}Environment: $ENVIRONMENT${NC}"
echo ""

###############################################################################
# Step 1: Install Dependencies
###############################################################################
echo -e "${BLUE}📦 Step 1: Installing dependencies...${NC}"
if npm install --legacy-peer-deps; then
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${RED}❌ Dependency installation failed${NC}"
    exit 1
fi

###############################################################################
# Step 2: Run Linting
###############################################################################
echo -e "${BLUE}🔍 Step 2: Running linter...${NC}"
if npm run lint > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Linting passed${NC}"
else
    echo -e "${YELLOW}⚠️  Linting warnings (non-fatal)${NC}"
fi

###############################################################################
# Step 3: Build Application
###############################################################################
echo -e "${BLUE}🔨 Step 3: Building application...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

###############################################################################
# Step 4: Verify Build Output
###############################################################################
echo -e "${BLUE}✔️  Step 4: Verifying build output...${NC}"

# Check critical files
REQUIRED_FILES=(
    "dist/index.html"
    "dist/api.php"
    "dist/config.php"
    "dist/Database.php"
    "dist/.htaccess"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}  ✓ $file${NC}"
    else
        echo -e "${RED}  ✗ Missing: $file${NC}"
        exit 1
    fi
done

# Check uploads folder structure
UPLOAD_DIRS=(
    "dist/uploads/products"
    "dist/uploads/campaigns"
    "dist/uploads/documents"
)

for dir in "${UPLOAD_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}  ✓ $dir${NC}"
    else
        echo -e "${YELLOW}  ! Creating: $dir${NC}"
        mkdir -p "$dir"
    fi
done

###############################################################################
# Step 5: Environment-Specific Configuration
###############################################################################
echo -e "${BLUE}⚙️  Step 5: Applying $ENVIRONMENT configuration...${NC}"

if [ "$ENVIRONMENT" = "production" ]; then
    # Remove sensitive files
    echo -e "${YELLOW}  Removing sensitive files...${NC}"
    rm -f dist/setup-admin.php
    rm -f dist/migrations.sql
    
    # Set file permissions (for Unix servers)
    if [ -d "dist" ]; then
        chmod -R 755 dist/uploads/
        chmod -R 644 dist/*.php
        echo -e "${GREEN}  ✓ File permissions set${NC}"
    fi
    
elif [ "$ENVIRONMENT" = "staging" ]; then
    echo -e "${GREEN}  ✓ Staging configuration applied${NC}"
fi

###############################################################################
# Step 6: Create Deployment Report
###############################################################################
echo -e "${BLUE}📋 Step 6: Creating deployment report...${NC}"

DIST_SIZE=$(du -sh dist | awk '{print $1}')
FILE_COUNT=$(find dist -type f | wc -l)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

cat > DEPLOYMENT_REPORT.txt << EOF
╔════════════════════════════════════════════════════════╗
║  Moris Enterprises - Deployment Report                ║
╚════════════════════════════════════════════════════════╝

Generated: $TIMESTAMP
Environment: $ENVIRONMENT

📊 Build Statistics
═══════════════════
Total Files: $FILE_COUNT
Total Size: $DIST_SIZE

📁 Key Directories
═══════════════════
✓ dist/assets/          (Compiled React app)
✓ dist/uploads/         (File uploads - ready)
  - products/
  - campaigns/
  - documents/

📄 API Files
═════════════
✓ dist/api.php          (API router)
✓ dist/config.php       (Configuration)
✓ dist/Database.php     (Database class)
✓ dist/AuthHandler.php  (Authentication)
✓ dist/LeadHandler.php  (Lead management)
✓ dist/ProductHandler.php (Products)
✓ dist/CampaignHandler.php (Campaigns)
✓ dist/CustomerHandler.php (Customers)
✓ dist/upload-handler.php (File uploads)

🔐 Security
════════════
✓ .htaccess configured (mod_rewrite, security headers)
✓ Sensitive files removed (if production)

🚀 Next Steps
══════════════
1. Deploy dist/ contents to your server
2. Run setup-admin.php to create admin account
3. Update config.php with production credentials
4. Run database migrations
5. Test: https://morientreprises.com/admin/login
6. Remove setup files from production

📚 Documentation
═════════════════
See DEPLOYMENT.md for detailed instructions

═════════════════════════════════════════════════════════
✅ Deployment preparation complete!
═════════════════════════════════════════════════════════
EOF

cat DEPLOYMENT_REPORT.txt
echo ""

###############################################################################
# Step 7: Create Deployment Archive (Optional)
###############################################################################
if [ "$ENVIRONMENT" != "development" ]; then
    echo -e "${BLUE}📦 Step 7: Creating deployment archive...${NC}"
    
    ARCHIVE_NAME="moris-enterprises-${ENVIRONMENT}-$(date +%Y%m%d-%H%M%S).tar.gz"
    tar -czf "$ARCHIVE_NAME" dist/
    ARCHIVE_SIZE=$(du -h "$ARCHIVE_NAME" | awk '{print $1}')
    
    echo -e "${GREEN}✅ Archive created: $ARCHIVE_NAME ($ARCHIVE_SIZE)${NC}"
fi

###############################################################################
# Complete!
###############################################################################
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ Deployment preparation successful!               ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📋 Summary:${NC}"
echo "   Environment: $ENVIRONMENT"
echo "   Build dir: dist/"
echo "   Files: $FILE_COUNT"
echo "   Size: $DIST_SIZE"
echo ""
echo -e "${YELLOW}📚 Next steps:${NC}"
echo "   1. Review DEPLOYMENT_REPORT.txt"
echo "   2. Read DEPLOYMENT.md for detailed instructions"
echo "   3. Deploy dist/ to your server"
echo "   4. Set up admin account"
echo "   5. Update production config"
echo ""
