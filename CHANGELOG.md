# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2024-12-28

### 🚀 Added
- **Mobile Responsive Design**: Complete mobile responsiveness for all screen sizes
- **Horizontal Scrollable Toolbar**: Toolbar now scrolls horizontally on mobile devices while content stays within viewport
- **Touch-Friendly Interface**: Optimized padding and spacing for mobile touch interaction
- **Viewport Locked Content**: Editor content is now constrained to device width with proper word wrapping

### ✨ Enhanced
- **Word Wrapping**: Improved text wrapping to prevent horizontal overflow on any device
- **Mobile Layout**: Adaptive height and padding that responds to screen size
- **Performance**: Optimized CSS for better mobile performance
- **User Experience**: Seamless editing experience across desktop and mobile devices

### 🔧 Technical Changes
- Added responsive breakpoints with Tailwind CSS `md:` prefixes
- Implemented aggressive CSS overflow prevention with `!important` rules
- Enhanced container width constraints with `max-w-full` and `overflow-x-hidden`
- Added proper box-sizing and word-wrap properties for all editor elements

### 📱 Mobile Features
- Editor height adapts to viewport size (`calc(100vh-120px)`)
- Toolbar scrolls horizontally when content overflows
- Content area uses proper word wrapping and stays within device width
- Touch-friendly padding reduces to `px-2` on mobile devices
- Responsive typography with smaller text on mobile

## [1.0.4] - Previous Version
- Basic editor functionality
- Desktop-focused design