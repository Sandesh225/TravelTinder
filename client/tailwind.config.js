/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Specify the paths to all of your template files
  ],
  theme: {
    extend: {
      colors: {
        // Travel-Themed Color Palette
        primary: {
          light: '#56CCF2', // Light sky blue
          DEFAULT: '#2D9CDB', // Sky blue
          dark: '#2F80ED', // Deeper blue
        },
        secondary: {
          light: '#F2994A', // Light sunset orange
          DEFAULT: '#F26C4F', // Sunset orange
          dark: '#EB5757', // Reddish orange
        },
        accent: {
          light: '#BB6BD9', // Soft purple
          DEFAULT: '#9B51E0', // Vivid purple
          dark: '#6A1B9A', // Darker purple
        },
        neutral: {
          light: '#F2F2F2', // Light gray
          DEFAULT: '#E0E0E0', // Neutral gray
          dark: '#828282', // Dark gray
        },
        background: {
          light: '#E8F8F5', // Soft greenish-blue for backgrounds
          DEFAULT: '#D0ECE7', // Muted greenish-blue
          dark: '#A3E4D7', // Deeper greenish-blue
        },
        success: {
          light: '#6FCF97', // Light green
          DEFAULT: '#27AE60', // Green for success messages
          dark: '#219653', // Darker green
        },
        danger: {
          light: '#EB5757', // Light red for errors
          DEFAULT: '#E74C3C', // Standard red
          dark: '#C0392B', // Darker red
        },
      },
      fontFamily: {
        // Travel-Related Fonts
        sans: ['Poppins', 'sans-serif'], // Clean and modern sans-serif
        serif: ['Playfair Display', 'serif'], // Elegant serif for headlines
        mono: ['Source Code Pro', 'monospace'], // Monospace for code or special text
      },
      fontSize: {
        // Type Scale
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '4rem', // 64px
        '7xl': '5rem', // 80px
        '8xl': '6rem', // 96px
        '9xl': '7rem', // 112px
      },
      borderRadius: {
        // Rounded Borders
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      spacing: {
        // Spacing Scale
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        // Custom Shadows
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Typography plugin for better text styling
    require('@tailwindcss/forms'), // Forms plugin for better form styling
    require('@tailwindcss/aspect-ratio'), // Aspect ratio plugin
  ],
};
