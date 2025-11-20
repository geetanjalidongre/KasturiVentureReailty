# Secret Access Guide - Property Management

## For Client/Admin Use Only

### How to Access Property Management

The Property Management button is **hidden by default** from public visitors. Only you (the client/admin) can access it using a secret keyboard shortcut.

---

## Secret Keyboard Shortcut

### **Press: `Ctrl + Shift + M`**

**Steps:**
1. Open your website in any browser
2. Press and hold the `Ctrl` key
3. Press and hold the `Shift` key
4. Press the `M` key
5. Release all keys

**Result:**
- A blue "Manage" button will appear in the bottom-right corner above the Feedback button
- Click this button to open the Property Management panel

---

## Property Management Features

Once the Manage button is visible and clicked, you can:

### **1. View All Properties**
- See all listed properties with thumbnails
- View property details (title, location, price, type)
- Quick overview of your entire property portfolio

### **2. Add New Properties**
Fill out the form with:
- **Property Title** (required)
- **Description**
- **Property Type** (Residential/Commercial/Villa/Apartment)
- **Location** (required)
- **Price Display** (e.g., ₹2.5 Cr) - required
- **Price** (numeric value)
- **Area** (square feet)
- **Bedrooms** (number)
- **Bathrooms** (number)
- **Property Images** (add multiple image filenames)
- **Featured** (checkbox to mark as featured property)

### **3. Delete Properties**
- Click the red trash icon on any property
- Confirm deletion
- Property will be removed immediately

---

## Toggle the Manage Button

- **Show Button**: Press `Ctrl + Shift + M`
- **Hide Button**: Press `Ctrl + Shift + M` again (toggles on/off)

This ensures customers cannot see or access the management features.

---

## Important Notes

1. **Images**: When adding images, use the filename exactly as it appears in your `public/` folder
   - Example: `property1.jpg` or `20251016_153100.jpg`
   - You can add multiple images per property

2. **Price Display vs Price**:
   - **Price Display**: What visitors see (e.g., "₹2.5 Cr", "₹50 Lakhs")
   - **Price**: Numeric value for filtering (e.g., 25000000)

3. **Featured Properties**: These appear in the carousel on the homepage

4. **No Login Required**: The shortcut is the only access control
   - Keep this shortcut secret
   - Don't share with customers

---

## Troubleshooting

**Q: Shortcut not working?**
- Make sure you're pressing all three keys together: Ctrl + Shift + M
- Try on a different browser
- Refresh the page and try again

**Q: Button disappeared?**
- Press the shortcut again to show it
- The button hides when you refresh the page

**Q: Property not showing images?**
- Check that image filenames match exactly (including file extension)
- Make sure images are in the `public/` folder
- Use the correct path (just the filename, not the full path)

---

## Quick Reference

| Action | Shortcut |
|--------|----------|
| Show/Hide Manage Button | `Ctrl + Shift + M` |
| Open Management Panel | Click blue "Manage" button |
| Switch to Add Property | Click "Add Property" tab |
| Switch to Property List | Click "Property List" tab |

---

**Keep this document private and secure!**
