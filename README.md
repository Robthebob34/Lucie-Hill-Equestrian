# Lucie Hill Equestrian Website

A professional, modern website for Lucie Hill Equestrian - an Australian equestrian centre specialising in classical dressage training and riding lessons.

## 🐴 Features

### Public Pages
- **Home** - Hero section, services overview, testimonials preview
- **Dressage** - Classical dressage training information and pricing
- **Riding Lessons** - Lesson types, schedules, and packages
- **About** - Company history, qualifications, philosophy
- **Services** - Complete service overview with pricing
- **Testimonials** - Client reviews and testimonial submission form
- **Booking** - Full booking system with calendar and form

### Admin Dashboard
- Secure login authentication
- Booking management (view, confirm, cancel, delete)
- Statistics and analytics
- CSV export functionality
- Filter and search bookings

### Technical Features
- ✅ React + Vite for fast development
- ✅ React Router for navigation
- ✅ Tailwind CSS for styling
- ✅ Lucide React for icons
- ✅ LocalStorage for persistent data
- ✅ Fully responsive design
- ✅ Form validation
- ✅ Interactive calendar

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd lucie-hill-equestrian
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
lucie-hill-equestrian/
├── public/
│   ├── hero.png
│   ├── banner.jpg
│   ├── logo.jpg
│   └── hors_and_babyhorse.png
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dressage.jsx
│   │   ├── Courses.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Booking.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🔐 Admin Access

Access the admin dashboard at `/admin`

**Demo Credentials:**
- Email: `admin@luciehillequestrian.com.au`
- Password: `LucieHill2024!`

> ⚠️ In production, implement proper server-side authentication!

## 📱 Responsive Design

The website is fully responsive and optimised for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1280px+)

## 🎨 Design System

### Colours
- **Forest** - Primary green tones (#4a7c4a)
- **Saddle** - Warm brown tones (#a67650)
- **Cream** - Neutral beige tones (#f5f1e8)

### Typography
- **Headings** - Playfair Display (serif)
- **Body** - Inter (sans-serif)

## 📋 Booking System

The booking system uses localStorage for persistence:
- Bookings are saved locally in the browser
- Prevents double-booking of time slots
- Full validation and error handling
- Multiple status types: pending, confirmed, completed, cancelled

## 🛠 Development

### Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Pages
1. Create the page component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

## 📞 Contact Information

The website displays the following contact details:
- **Phone:** +61 413 417 915
- **Email:** hill.lucie@gmail.com
- **Address:** 152 Bay Rd, Mount Gambier, SA 5290, Australia

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Google Calendar sync
- [ ] Google Maps reviews integration
- [ ] Multi-language support

## 📄 License

This project is proprietary software for Lucie Hill Equestrian.

---

Built with ❤️ for Lucie Hill Equestrian
