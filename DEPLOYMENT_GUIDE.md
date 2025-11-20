# Website Deployment Guide (Hindi)

Yeh guide aapko batayega ki is website ko kisi bhi platform par kaise deploy karein.

---

## Prerequisites (Pehle Kya Chahiye)

1. **Node.js** - Version 18 ya usse upar
2. **npm** - Node package manager (Node.js ke saath aata hai)
3. **Git** (optional, lekin recommended)

---

## Step 1: Project Files Ko Copy Karo

Sab files ko ek folder mein copy karo. Important files:
- `src/` folder (saara code yahan hai)
- `public/` folder (images, photos)
- `package.json`
- `.env` file (important!)
- `index.html`
- `vite.config.ts`
- `tailwind.config.js`
- `tsconfig.json`

---

## Step 2: Dependencies Install Karo

Terminal/Command Prompt kholo aur project folder mein jao:

```bash
cd /path/to/your/project
npm install
```

Yeh command saare required packages install kar dega (React, Vite, Tailwind, Supabase, etc.)

---

## Step 3: Environment Variables Setup

`.env` file ko check karo. Yahan aapke Supabase database credentials hone chahiye:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Agar naye platform par deploy kar rahe ho, toh `.env` file ko copy karna mat bhoolo!

---

## Step 4: Build Karo

Production build banane ke liye:

```bash
npm run build
```

Yeh ek `dist` folder bana dega jismein saari compiled files hongi.

---

## Deployment Options (Kahan Deploy Karein)

### Option 1: Netlify (Sabse Easy) ✅ Recommended

**Automatic Deployment (Git se):**
1. Code ko GitHub/GitLab par push karo
2. Netlify.com par jao aur login karo
3. "Add new site" → "Import from Git"
4. Repository select karo
5. Build settings (already configured):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Environment variables add karo:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Deploy button click karo

**Manual Deployment:**
1. `npm run build` run karo
2. Netlify.com par login karo
3. Drag & drop `dist` folder
4. Environment variables add karo (Site settings → Environment variables)

**Custom Domain:**
- Netlify dashboard → Domain settings → Add custom domain

---

### Option 2: Vercel

**Automatic Deployment:**
1. Code ko GitHub par push karo
2. Vercel.com par login karo
3. "New Project" → Import repository
4. Framework preset: Vite
5. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Environment Variables add karo
7. Deploy click karo

**Manual Deployment:**
```bash
npm install -g vercel
npm run build
vercel --prod
```

---

### Option 3: GitHub Pages

1. Package.json mein add karo:
```json
{
  "homepage": "https://your-username.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Install karo:
```bash
npm install --save-dev gh-pages
```

3. Deploy karo:
```bash
npm run deploy
```

**Note:** GitHub Pages pe environment variables nahi ho sakte directly. Better hai Netlify/Vercel use karo.

---

### Option 4: Hostinger / Shared Hosting

1. `npm run build` run karo
2. `dist` folder ki saari files ko FTP se upload karo
3. `.htaccess` file banao (for SPA routing):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

4. Environment variables ko hardcode karna padega ya server configuration mein add karo

---

### Option 5: Firebase Hosting

1. Firebase CLI install karo:
```bash
npm install -g firebase-tools
```

2. Login karo:
```bash
firebase login
```

3. Project initialize karo:
```bash
firebase init hosting
```

4. Configuration:
   - Public directory: `dist`
   - Configure as SPA: Yes
   - Automatic builds: Optional

5. Deploy karo:
```bash
npm run build
firebase deploy
```

---

### Option 6: AWS S3 + CloudFront

1. S3 bucket banao (static website hosting enable)
2. Build files upload karo
3. CloudFront distribution setup karo
4. Error pages configure karo (404 → index.html)
5. Environment variables ko CloudFront Lambda@Edge se inject karo

---

## Important Notes

### 1. Environment Variables
Har platform pe alag tarike se environment variables add hote hain:
- **Netlify**: Site settings → Environment variables
- **Vercel**: Project settings → Environment Variables
- **GitHub Pages**: Hardcode karna padega (NOT recommended for sensitive data)
- **Shared Hosting**: Server configuration ya hardcode

### 2. Images/Photos
`public/` folder ki saari files build ke baad `dist/` mein automatically copy ho jayengi. Ensure karo ki:
- Images ka path correct ho (`/image.jpg` ya `image.jpg`)
- File names case-sensitive hain

### 3. Database (Supabase)
- Database already configured hai
- Bas `.env` variables correct hone chahiye
- Public access enabled hai (koi authentication nahi chahiye)

### 4. Custom Domain
Most platforms custom domain support karte hain:
- **Netlify**: Free SSL, automatic
- **Vercel**: Free SSL, automatic
- **GitHub Pages**: Free, manual SSL setup
- **Shared Hosting**: Domain already hoga

### 5. Secret Keyboard Shortcut
`Ctrl + Shift + M` shortcut har platform par work karega. Yeh client-side code hai.

---

## Testing Before Deployment

Local pe test karne ke liye:

```bash
# Development server
npm run dev

# Production build test
npm run build
npm run preview
```

Browser mein open karo: `http://localhost:5173` (dev) ya `http://localhost:4173` (preview)

---

## Common Issues & Solutions

### Issue 1: "Module not found" Error
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: Images Nahi Dikh Rahe
**Solution:**
- Check karo `public/` folder mein images hain
- Path correct hai (`/image.jpg`)
- Build karne ke baad `dist/` mein images hain

### Issue 3: Environment Variables Nahi Kaam Kar Rahe
**Solution:**
- Variable names `VITE_` se start hone chahiye
- Platform pe environment variables add kiye?
- Rebuild karo after adding variables

### Issue 4: Routing Issues (404 on refresh)
**Solution:**
- SPA redirect rules add karo
- Netlify: `netlify.toml` already configured
- Other platforms: `.htaccess` ya equivalent

### Issue 5: Database Connection Failed
**Solution:**
- `.env` values check karo
- Supabase project active hai?
- Network firewall issues?

---

## Maintenance

### Code Update Karne Ke Liye:
1. Local pe changes karo
2. `npm run build` run karo
3. Test karo `npm run preview` se
4. Deploy karo (platform ke according)

### New Property Add Karne Ke Liye:
- Website kholo
- `Ctrl + Shift + M` press karo
- Property management panel use karo

### Database Backup:
- Supabase dashboard → Database → Backups
- Regular backups automatic hote hain

---

## Recommended Platform

**Best Choice: Netlify** ✅

**Why?**
- Free tier generous hai
- Automatic deployments (Git connect)
- Environment variables easy setup
- Custom domain + SSL free
- Fast CDN
- SPA routing automatically configured
- No credit card required for basic plan

**Second Best: Vercel**
- Similar features to Netlify
- Great performance
- Easy setup

---

## Cost Estimate

### Free Options:
- ✅ Netlify (100GB bandwidth/month)
- ✅ Vercel (100GB bandwidth/month)
- ✅ GitHub Pages (1GB storage, public repos only)
- ✅ Firebase (10GB storage, 360MB/day transfer)

### Paid Options (if needed):
- Netlify Pro: $19/month
- Vercel Pro: $20/month
- Hostinger Shared: ₹149/month
- AWS S3+CloudFront: Variable (usage-based)

**Note:** Free tiers mein most small/medium websites ke liye sufficient hai!

---

## Support & Help

Agar koi problem aaye:
1. Error message carefully read karo
2. Browser console check karo (F12 → Console)
3. Network tab check karo (API calls fail to nahi ho rahe)
4. `.env` file correct hai?
5. Build command successfully run ho rahi hai?

---

## Quick Deployment Checklist

- [ ] `npm install` run kiya
- [ ] `.env` file configured hai
- [ ] `npm run build` successfully complete hui
- [ ] Environment variables platform pe add kiye
- [ ] Custom domain setup (optional)
- [ ] SSL certificate active hai
- [ ] Website test kiya different devices pe
- [ ] Secret keyboard shortcut (`Ctrl+Shift+M`) working hai
- [ ] Property add/edit/delete functionality working hai
- [ ] Images properly load ho rahe hain

---

**Happy Deploying! 🚀**
