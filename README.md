# Botswana Network Comparison Tool

Public-facing website for users to compare mobile networks (Orange, Mascom, BTC) and get personalized recommendations based on 788+ verified customer reviews.

## 🚀 Live Demo

Deployed on Vercel: [Your URL here after deployment]

## 📁 Project Structure

```
network-comparison/
├── index.html          # Main HTML file
├── styles.css          # All CSS styling (exact Streamlit design)
├── script.js           # JavaScript functionality
├── networks_data.js    # Network statistics data
├── vercel.json         # Vercel deployment config
└── README.md           # This file
```

## ✨ Features

- **Interactive Quiz**: 3-question quiz to find best network match
- **Real Data**: Based on 788+ customer survey responses
- **Network Comparison**: Side-by-side comparison of Orange, Mascom, and BTC
- **Detailed Breakdown**: Individual network cards with ratings and strengths
- **Email Capture**: Collect leads for follow-up
- **Newsletter Signup**: Build email list
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Airtable Ready**: Integration code included (commented out)

## 🎨 Design

- Exact colors and styling from original Streamlit app
- Purple gradient theme (#667eea to #764ba2)
- Clean, modern UI
- Smooth animations and transitions

## 📊 Data

Network statistics calculated from survey data:
- **Orange**: 288 users, 7.36/10 overall
- **Mascom**: 271 users, 7.54/10 overall  
- **BTC**: 44 users, 8.07/10 overall

## 🚀 Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/botswana-network-comparison.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your site is live

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Deploy!

## 🔧 Local Development

Simply open `index.html` in your browser. No build step required!

Or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# VS Code Live Server extension
Right-click index.html → "Open with Live Server"
```

Then visit: `http://localhost:8000`

## 📝 Airtable Integration (Optional)

To enable lead capture and tracking:

1. **Create Airtable Base** with tables:
   - LEADS
   - CLICKS
   - REVIEWS

2. **Get API Credentials**
   - API Key: airtable.com/account
   - Base ID: airtable.com/api

3. **Update script.js**
   - Uncomment the `sendToAirtable()` function at the bottom
   - Replace `YOUR_API_KEY` and `YOUR_BASE_ID`
   - Uncomment API calls in `handleCTA()` and `handleNewsletter()`

**Security Note**: For production, use Vercel Environment Variables instead of hardcoding keys:
- Add secrets in Vercel dashboard: Settings → Environment Variables
- Access via server-side function (requires API route)

## 🎯 Monetization Ready

The tool is set up for affiliate marketing:
- Tracks user selections and recommendations
- Captures email leads
- Logs button clicks
- Ready for affiliate link integration

Replace placeholder links in `script.js`:
```javascript
const links = {
    'Orange': 'YOUR_ORANGE_AFFILIATE_LINK',
    'Mascom': 'YOUR_MASCOM_AFFILIATE_LINK',
    'BTC': 'YOUR_BTC_AFFILIATE_LINK'
};
```

## 📱 Responsive

Fully responsive design works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔄 Updates

To update network data:
1. Edit `networks_data.js`
2. Commit and push to GitHub
3. Vercel auto-deploys (if connected to GitHub)

Or re-run `vercel` if using CLI.

## 📄 License

Data collected for educational/business purposes.

## 🤝 Support

For questions or issues, contact: unaswiseleka2000@gmail.com

---

**Built with ❤️ for Basha Consulting**
