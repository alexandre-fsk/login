# Modern Login Page with React & GSAP

A beautiful, responsive login page built with React and GSAP animations. Features both sign-in and sign-up forms with comprehensive validation and smooth animations.

## ✨ Features

- **Modern Design**: Clean, professional UI with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **GSAP Animations**: Smooth, professional animations using GSAP library
- **Form Validation**: Comprehensive client-side validation for all form fields
- **Password Strength**: Real-time password strength indicator
- **Social Login**: Social media login options (Google, Facebook, Twitter)
- **Accessibility**: ARIA labels and keyboard navigation support
- **Loading States**: Beautiful loading animations during form submission

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── LoginForm.jsx      # Sign-in form component
│   ├── SignupForm.jsx     # Sign-up form component
│   └── Form.css          # Form-specific styles
├── App.jsx               # Main application component
├── App.css              # Main application styles
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## 🎨 Features Breakdown

### Form Validation
- **Email**: Validates proper email format
- **Password**: Minimum 6 characters for login, 8+ with complexity for signup
- **Name**: Minimum 2 characters for signup
- **Password Confirmation**: Ensures passwords match during signup

### Animations
- **Page Load**: Smooth fade-in and scale animations
- **Form Toggle**: Sliding overlay animation between login/signup
- **Input Focus**: Subtle border and shadow effects
- **Error States**: Shake animation for validation errors
- **Success States**: Scale animation for successful submissions
- **Loading**: Spinner animation during form submission

### Responsive Design
- **Desktop**: Full overlay animation with side-by-side forms
- **Tablet**: Optimized layout with reduced padding
- **Mobile**: Single form view with hidden overlay

## 🛠️ Customization

### Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #f8fafc;
  /* ... more variables */
}
```

### Animations
Modify GSAP animations in the component files:
- `src/App.jsx` - Main container and overlay animations
- `src/components/LoginForm.jsx` - Form-specific animations
- `src/components/SignupForm.jsx` - Form-specific animations

### Validation Rules
Update validation functions in the form components:
- Email regex pattern
- Password requirements
- Name length requirements

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/gsap/) for amazing animations
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
 