# Contributing to Skardu Spring

Thank you for your interest in contributing to our project! We follow professional standards to ensure the purity and quality of our code remains as high as our water.

## Development Workflow

1. **Fork and Clone**: Create your own branch from `main`.
2. **Setup**: Run `npm run install:all` to get started.
3. **Standards**:
   - Use **ESLint** for code quality.
   - Maintain a **modular structure** in the backend.
   - Follow the **design system** (colors, typography) in the frontend.
   - Write descriptive commit messages.

## Code Style

### Backend
- All new routes must be added to the `routes/` directory.
- Use the centralized `errorHandler` in `middleware/`.
- Document functions with JSDoc if they are complex.

### Frontend
- Components should be modular and located in `src/components/`.
- Use **CSS Modules** for styling.
- Keep animations subtle and aligned with the "premium" feel.

## Pull Requests

- Ensure your code passes all lint checks.
- Update the documentation if you add new features.
- Provide a clear description of the changes in your PR.

We look forward to your contributions!
