# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Social Media Fields**: Added support for LinkedIn, Twitter/X, Facebook, and Instagram profile URLs
- **Search Functionality**: Search through saved signatures by name, full name, company, or email
- **Signature Duplication**: Clone existing signatures with a single click
- **Keyboard Shortcuts**: Added productivity shortcuts:
  - Ctrl/⌘ + C: Copy rendered signature
  - Ctrl/⌘ + S: Save signature
  - Ctrl/⌘ + R: Reset form
  - Ctrl/⌘ + D: Download HTML
  - Shift + ?: Show keyboard shortcuts dialog
- **Error Boundary**: Graceful error handling with user-friendly error messages
- **Debounced Input**: Form inputs now use debouncing for better performance
- **Loading States**: Skeleton components for better loading UX (infrastructure added)
- **Improved SavedSignatures UI**: Better card layout with more information and hover states
- **Signature Counter**: Display total number of saved signatures

### Changed
- Enhanced SavedSignatures component with search bar (shows when 3+ signatures)
- Improved signature cards to show full name and company name
- Better visual feedback for duplicate and delete actions
- Updated README with new features and keyboard shortcuts

### Technical Improvements
- Added `debounce` utility function
- Created `ErrorBoundary` React component
- Added `useKeyboardShortcuts` custom hook
- Created `Skeleton` UI component
- Extended TypeScript types to include social media fields
- Store now includes `duplicateSignature` method

## [0.1.0] - Initial Release

### Added
- Real-time signature preview
- Form validation with Zod
- Local storage persistence
- 5+ professional templates
- Export options (HTML, JSON, rendered)
- Template gallery
- GIF detection for animated logos
- Mobile responsive design
