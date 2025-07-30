# Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2024-12-28

### 🔧 Fixed
- **SSR Compatibility**: Fixed "HTMLElement is not defined" error in Next.js applications
- **Server-Side Rendering**: Added proper environment checks for browser-only APIs
- **Web Components**: Made web component registration conditional and browser-only

### 🚀 Added
- **EditorClient Component**: New SSR-safe wrapper component for Next.js applications
- **Environment Guards**: Added `typeof window !== 'undefined'` checks throughout codebase
- **Next.js Documentation**: Added comprehensive Next.js usage guide (`NEXT_JS_USAGE.md`)

### 🔧 Technical Changes
- Updated `guard.ts` to handle SSR environments safely
- Enhanced `use-report.ts` with client-side only execution
- Conditional loading of `@r2wc/react-to-web-component` package
- Added null checks and error handling for DOM operations

### 📱 Next.js Support
- Use `EditorClient` component for automatic SSR handling
- Alternative dynamic import approach with `ssr: false`
- Comprehensive troubleshooting guide for SSR issues

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