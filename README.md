# Roster Management Application

A modern, responsive healthcare provider roster management system built with Next.js, TypeScript, Redux, and Tailwind CSS.

## 🚀 Features

### Core Functionality

-   **Provider Management**: View and manage healthcare providers across multiple clinics
-   **Advanced Filtering**: Filter providers by services (therapist/psychiatrist), type (in-house/external), and centers
-   **Smart Search**: Real-time search functionality to find providers by name
-   **Calendar Views**: Two comprehensive view modes:
    -   **Calendar View**: Weekly grid showing provider availability with time slots
    -   **Slots View**: Detailed expanded view with time-based navigation
-   **Booking Management**: Visual representation of booked, available, and blocked time slots
-   **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices

### UI/UX Features

-   **Color-coded Time Slots**:
    -   🟢 Green: Online availability
    -   🟠 Orange: Offline availability
    -   🔵 Blue: Both online and offline availability
    -   🔴 Red: Blocked slots
    -   ⚫ Dark Blue/Orange: Booked slots
-   **Interactive Components**: Hover effects, tooltips, and smooth transitions
-   **Provider Selection**: Easy switching between providers in calendar view
-   **Time Window Controls**: Navigate between different time periods (8am-12pm, 12pm-6pm)
-   **Session Details**: View session IDs, patient names, and booking status

## 🛠 Tech Stack

-   **Frontend**: Next.js 15.4.2 with React 19
-   **Language**: TypeScript for type safety
-   **State Management**: Redux Toolkit with Redux hooks
-   **Styling**: Tailwind CSS 4.0 for utility-first styling
-   **Icons**: Lucide React for modern iconography
-   **Data Fetching**: SWR for efficient data management
-   **Date Handling**: date-fns for date manipulation
-   **Tooltips**: React Tooltip for enhanced UX

## 📦 Installation

### Prerequisites

-   Node.js 18+ and npm
-   Git

### Setup Instructions

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd roster-management-app-assignment
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

5. **Build for production**
    ```bash
    npm run build
    npm start
    ```

## 📁 Project Structure

```
roster-management-app-assignment/
├── components/
│   ├── calendar/
│   │   ├── CalendarGrid.tsx      # Main calendar component with dual view modes
│   │   └── SlotCell.tsx          # Individual time slot component
│   ├── filters/
│   │   ├── FilterBar.tsx         # Comprehensive filter sidebar
│   │   └── FilterChip.tsx        # Reusable filter chip component
│   ├── roster/
│   │   ├── ProviderCard.tsx      # Individual provider card
│   │   ├── ProviderList.tsx      # Provider list container
│   │   └── SlotRow.tsx           # Horizontal slot display
│   └── ui/
│       ├── Loader.tsx            # Loading component
│       └── NoData.tsx            # Empty state component
├── hooks/
│   └── useRosterData.ts          # Custom hook for data fetching
├── lib/
│   ├── types.ts                  # TypeScript type definitions
│   ├── mockData.ts               # Mock data for development
│   └── filterUtils.ts            # Utility functions for filtering
├── pages/
│   ├── api/
│   │   └── roster.ts             # API endpoint for roster data
│   ├── [provider]/
│   │   └── calendar.tsx          # Dynamic provider calendar page
│   ├── _app.tsx                  # App wrapper with Redux provider
│   ├── _document.tsx             # Custom document
│   └── index.tsx                 # Main landing page
├── store/
│   ├── store.ts                  # Redux store configuration
│   ├── filterSlice.ts            # Filter state management
│   └── hooks.ts                  # Typed Redux hooks
└── styles/
    └── globals.css               # Global styles and Tailwind imports
```

## 🎯 Usage Guide

### Main Dashboard

-   **View All Providers**: Browse all healthcare providers with availability summaries
-   **Apply Filters**: Use the sidebar to filter by services, provider types, or centers
-   **Search Providers**: Use the search bar to find specific providers by name
-   **View Provider Details**: Click on provider names or "View Calendar" to see detailed schedules

### Calendar View

-   **Switch Views**: Toggle between Calendar and Slots view using the top-right buttons
-   **Navigate Time**: Use arrow buttons to navigate through weeks
-   **Provider Selection**: Switch between providers using the left sidebar
-   **View Session Details**: Hover over booked slots to see session information

### Slots View

-   **Date Navigation**: Select specific dates using the date picker
-   **Time Windows**: Choose between morning (8am-12pm) or afternoon (12pm-6pm) views
-   **Provider Comparison**: View multiple providers' schedules side by side
-   **Detailed Information**: See comprehensive booking and availability data

## 🎨 Design System

### Color Palette

-   **Primary**: Orange (#F97316) for CTAs and active states
-   **Success**: Green (#16A34A) for online availability
-   **Warning**: Orange (#EA580C) for offline availability
-   **Info**: Blue (#2563EB) for combined availability
-   **Danger**: Red (#DC2626) for blocked slots
-   **Neutral**: Gray shades for backgrounds and text

### Typography

-   **Headings**: Font weights 600-700 for hierarchy
-   **Body Text**: Regular weight with proper contrast ratios
-   **Small Text**: 12px-14px for metadata and labels

## 🔧 API Integration

The application uses a mock API structure that can be easily replaced with real endpoints:

```typescript
// Current mock endpoint
GET /api/roster
// Returns: { providers: Provider[] }

// Expected real API endpoints
GET /api/providers              # Get all providers
GET /api/providers/:id         # Get specific provider
GET /api/providers/:id/calendar # Get provider availability
POST /api/bookings             # Create new booking
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

-   **Netlify**: Connect GitHub repo and deploy
-   **AWS Amplify**: Use the Amplify console
-   **Docker**: Use the included Dockerfile (if provided)

## 🧪 Testing

Currently, the application includes:

-   TypeScript type checking
-   ESLint for code quality
-   Next.js built-in optimization

Future testing considerations:

-   Unit tests with Jest and React Testing Library
-   E2E tests with Cypress or Playwright
-   Visual regression testing

## 📱 Browser Support

-   **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
-   **Mobile**: iOS Safari 14+, Chrome Mobile 90+
-   **Responsive Breakpoints**:
    -   Mobile: 320px - 768px
    -   Tablet: 768px - 1024px
    -   Desktop: 1024px+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📈 Performance Optimizations

-   **Next.js Optimizations**: Automatic code splitting and image optimization
-   **State Management**: Efficient Redux state updates
-   **CSS**: Purged Tailwind CSS for minimal bundle size
-   **Data Fetching**: SWR caching and revalidation
-   **Responsive Images**: Optimized image loading

## 🔐 Security Considerations

-   Input validation on all form fields
-   XSS protection through React's built-in escaping
-   Type safety with TypeScript
-   Environment variable handling for sensitive data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

-   Design inspiration from modern healthcare management systems
-   Icons provided by Lucide React
-   Built with the amazing Next.js and React ecosystem

## 📞 Support

For questions or support, please contact:

-   Email: [your-email@domain.com]
-   GitHub Issues: [repository-issues-url]
-   Documentation: [documentation-url]

---

**Note**: This application uses mock data for demonstration purposes. In a production environment, replace the mock data with real API endpoints and implement proper authentication and authorization.
