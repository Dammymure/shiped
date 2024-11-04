/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		backgroundImage: {
			'custom-radial': 'radial-gradient(circle, rgba(255,214,152,1) 0%, rgba(255,182,68,1) 50%, rgba(251,176,60,1) 100%)',
			'custom-radial-2': 'radial-gradient(circle, rgba(255,214,152,1) 0%, rgba(180,150,32,1) 50%, rgba(180,135,30,1) 100%)',
			'custom-radial-3': 'radial-gradient(circle, rgba(255,214,152,1) 0%, rgba(110,019,16,1) 50%, rgba(110,018,14,1) 100%)',

		  },
  		fontFamily: {
  			Inter: ['Inter']
  		},
  		colors: {
  			primary: '#0c131b',
  			secondary: '#fbb03c',
  			light: '#f2f1ef',
  			background: '#f3f5f7',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};


// colors: {
// 	primary: '#0c131b',   // dark color
// 	secondary: '#fbb03c', // yellow color
// 	light: '#f2f1ef',     // light gray color
// 	background: '#f3f5f7' // light background color
//   },