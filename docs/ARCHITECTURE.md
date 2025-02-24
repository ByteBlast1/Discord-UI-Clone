# Discord UI Clone Architecture

## Project Structure

### Components
- `common/`: Shared components used across multiple features
- `layout/`: Layout-related components (Sidebar, Header, etc.)
- `ui/`: Basic UI components (Button, Input, etc.)

### Features
Feature-based modules following Domain-Driven Design principles:
- `channels/`: Channel list and management
- `chat/`: Chat interface and messages
- `servers/`: Server list and management

### Core Directories
- `assets/`: Static assets like images and fonts
- `config/`: Application configuration
- `hooks/`: Custom React hooks
- `lib/`: Utility functions and helpers
- `styles/`: Global styles and Tailwind configurations
- `types/`: TypeScript type definitions

## Design Patterns
- Component Composition
- Custom Hook Patterns
- Render Props (where necessary)
- Container/Presenter Pattern

## State Management
Using React's built-in Context API for global state management

## Styling
- Tailwind CSS for utility-first styling
- CSS Modules for component-specific styles
- CSS Variables for theming 