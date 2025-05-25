# Avatar Image Replacement Instructions

## How to Replace Your Avatar Image

### Step 1: Prepare Your New Portrait Image
1. **Image Requirements:**
   - Format: PNG, JPG, or JPEG
   - Recommended size: 400x400 pixels or larger (square aspect ratio works best)
   - File size: Under 2MB for optimal loading
   - High quality portrait photo

### Step 2: Replace the Image File
1. Navigate to the `public` folder in your project
2. Find the existing `logo.png` file
3. **Option A - Replace the existing file:**
   - Delete or rename the current `logo.png`
   - Add your new portrait image and rename it to `logo.png`
   
4. **Option B - Use a different filename:**
   - Add your new portrait image to the `public` folder (e.g., `portrait.jpg`)
   - Update the reference in `src/data/user.js`:
   ```javascript
   main: {
       title: "Harshith Gangisetty | Portfolio",
       name: "Harshith Gangisetty", 
       email: "harshithgangisetty@gmail.com",
       logo: "../portrait.jpg", // Change this line
   },
   ```

### Step 3: Verify the Changes
1. Save your changes
2. The development server should automatically reload
3. Check the cover page to see your new avatar
4. The avatar appears in the yellow cover section on the left side

### Current Avatar Location
The avatar currently appears in:
- **Cover Page**: Circular avatar in the yellow cover section
- **Size**: 120px diameter on desktop, smaller on mobile
- **Style**: White border with shadow effect, floating animation

### Tips for Best Results
- Use a clear, professional headshot
- Ensure good lighting and contrast
- Square images work best for the circular crop
- Test on both desktop and mobile to ensure it looks good at different sizes

### Troubleshooting
- If the image doesn't appear, check the file path in `src/data/user.js`
- Make sure the image file is in the `public` folder
- Clear browser cache if the old image still appears
- Check browser console for any error messages

The avatar will automatically be styled with the existing CSS (circular crop, border, shadow, hover effects).
