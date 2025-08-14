# 🚗 Driving School Admin Panel Setup Guide

## 📋 Prerequisites
- Node.js installed on your computer
- A Supabase account and project
- The driving school project files

## 🗄️ Step 1: Database Setup

### 1.1 Create Supabase Tables
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the entire contents of `database-setup.sql`
6. Click **Run** to execute the script

### 1.2 Verify Tables Created
After running the script, you should see:
- ✅ `courses` table
- ✅ `testimonials` table  
- ✅ `faq` table
- ✅ `gallery` table
- ✅ `website_content` table
- ✅ `contacts` table

## 🚀 Step 2: Run the Application

### 2.1 Install Dependencies
```bash
npm install
```

### 2.2 Start Development Server
```bash
npm run dev
```

### 2.3 Access the Application
- **Public Website**: http://localhost:8080
- **Admin Panel**: http://localhost:8080/admin

## 📊 Step 3: Add Sample Data

### 3.1 Navigate to Admin Panel
1. Go to http://localhost:8080/admin
2. You'll see a welcome message with setup instructions

### 3.2 Add Sample Data
1. Click the **"Add Sample Data"** button in the admin dashboard
2. Wait for the confirmation message
3. The sample data will be added to all sections

## 📱 Step 4: Test the Message System

### 4.1 Send a Test Message
1. Go to the public website: http://localhost:8080
2. Scroll down to the **Contact** section
3. Fill out the contact form with test data
4. Click **"Send Message"**

### 4.2 View Messages in Admin
1. Go to the admin panel: http://localhost:8080/admin
2. Click the **"Messages"** tab
3. You should see the test message you just sent

## 🔧 Troubleshooting

### ❌ "Failed to load content" Error
**Cause**: Database tables don't exist
**Solution**: Run the `database-setup.sql` script in Supabase

### ❌ "Add Sample Data" button doesn't work
**Cause**: RLS policies preventing data insertion
**Solutions**:
1. **First**: Run the updated `database-setup.sql` script in Supabase (it now allows public access)
2. **Test**: Run `node test-database.js` to verify connectivity
3. **Check**: Open browser console (F12) and look for error messages when clicking "Add Sample Data"

### ❌ "No messages available" in Message Manager
**Cause**: No messages in the database
**Solutions**:
1. Make sure you've run the database setup script
2. Click "Add Sample Data" to populate with example messages
3. Send a test message through the contact form

### ❌ Admin panel shows empty sections
**Cause**: No data in the database
**Solution**: Click "Add Sample Data" button in the admin dashboard

### ❌ Supabase connection errors
**Cause**: Incorrect API keys or URL
**Solution**: Check `src/lib/supabase.ts` and verify your Supabase credentials

### 🔍 Debugging Steps
1. **Check Browser Console**: Press F12 and look for error messages
2. **Test Database**: Run `node test-database.js` to verify connectivity
3. **Verify Tables**: Check Supabase dashboard to ensure tables exist
4. **Check RLS**: Ensure Row Level Security policies allow public access

## 📋 Sample Data Included

When you click "Add Sample Data", the following will be created:

### 🎓 Courses (3 items)
- Beginner Package ($299)
- Intensive Course ($599) 
- Refresher Course ($199)

### ⭐ Testimonials (4 items)
- Customer reviews with ratings and photos

### ❓ FAQ (5 items)
- Common questions about driving lessons

### 🖼️ Gallery (4 items)
- Training vehicle photos and instructor images

### 📧 Contact Messages (3 items)
- Sample customer inquiries with responses

### 🌐 Website Content
- Hero section text
- Course descriptions
- Contact information

## 🔐 Security Notes

- The database uses Row Level Security (RLS)
- Public users can only insert contact messages
- Admin users can manage all content
- API keys are safe to expose (they're public keys)

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase project settings
3. Ensure all tables were created successfully
4. Try refreshing the page after adding sample data

---

**Happy driving! 🚗💨**
