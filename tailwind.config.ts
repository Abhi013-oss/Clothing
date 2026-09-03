import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF8F5', // Canvas Ivory (70–80% primary background)
          pure: '#FFFFFF',    // Studio White (Surface elevation)
          muted: '#EFECE6',   // Linen Beige (Secondary sections/pills)
          sand: '#F5F2EC',    // Soft card backing
        },
        ink: {
          DEFAULT: '#18181B', // Deep Charcoal (15–20% primary text & dark CTAs)
          hover: '#27272A',   // Dark charcoal hover
          secondary: '#716E68', // Warm Taupe (Metadata & subheaders)
          muted: '#8C877F',   // Inactive labels
          border: '#E5E0D8',  // Hairline 1px dividers
        },
        accent: {
          gold: '#C5A880',      // Muted Champagne Gold (≤5% luxury accent)
          goldHover: '#B8996E', // Active gold hover
        },
        brand: {
          whatsapp: '#25D366',     // Official WhatsApp channel
          whatsappHover: '#1EBE5D',// WhatsApp hover state
        },
        status: {
          success: '#15803D', // In Stock indicator
          error: '#991B1B',   // Alert / Remove
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      aspectRatio: {
        'product': '3 / 4',
      },
      boxShadow: {
        'card-rest': '0 1px 3px 0 rgba(24, 24, 27, 0.04), 0 1px 2px -1px rgba(24, 24, 27, 0.03)',
        'card-hover': '0 12px 28px -6px rgba(24, 24, 27, 0.08), 0 4px 10px -2px rgba(24, 24, 27, 0.04)',
        'drawer': '-8px 0 32px -4px rgba(24, 24, 27, 0.12)',
        'whatsapp-btn': '0 8px 24px -4px rgba(37, 211, 102, 0.35)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'snappy': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'instant': '100ms',
        'fast': '180ms',
        'normal': '300ms',
        'drawer': '350ms',
        'reveal': '500ms',
      }
    },
  },
  plugins: [],
};

export default config;
