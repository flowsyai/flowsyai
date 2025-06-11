export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Ensure CSS custom properties are preserved in production
    ...(process.env.NODE_ENV === 'production'
      ? {
          'postcss-custom-properties': {
            preserve: true,
            importFrom: ['src/index.css'],
          },
        }
      : {}),
  },
};
