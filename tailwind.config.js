export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./slices/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./pages/index.vue",
	],
	theme: {
		colors: {
			primary: "var(--primary-color)",
			secondary: "var(--secondary-color)",
			third: "var(--third-color)",
			light: "var(--light-primary)",
			white: "#ffffff",
		},
		fontFamily: {
			body: "var(--font-body)",
			display: "var(--font-display)",
			light: "var(--font-light)",
		},
		screens: {
			xs: "420px",
			sm: "768px",
			md: "1024px",
			mdl: "1025px",
			lg: "1440px",
			xl: "1680px",
		},
		fontSize: {
			base: ["24px"],
			base_xsm: ["16px"],
			xsm: ["18px"],
			md: ["36px"],
			base_mb: ["22px", { fontWeight: 100 }],
			detail: [
				"24px",
				{
					fontWeight: "400",
					lineHeight: 1,
				},
			],
			detail_mb: [
				"14px",
				{
					fontWeight: "400",
					lineHeight: 1,
				},
			],
			landing_mb: [
				"20px",
				{
					fontWeight: "400",
					lineHeight: 1,
				},
			],
			headline_landing: [
				"9.8vw",
				{
					lineHeight: 1,
				},
			],
			headline_landing_mbl: [
				"11.5vw",
				{
					lineHeight: 1,
				},
			],
			headline_landing_mb: [
				"72px",
				{
					lineHeight: 1,
				},
			],
			headline_landing_small_mb: [
				"56px",
				{
					lineHeight: 1,
				},
			],
			headline: [
				"6vw",
				{
					lineHeight: 1,
				},
			],
			headline_mb: [
				"72px",
				{
					lineHeight: 1,
				},
			],
			headline_small_mb: [
				"56px",
				{
					lineHeight: 1,
				},
			],
			titleSection: [
				"100px",
				{
					lineHeight: 1,
				},
			],
			titleSection_lg: [
				"150px",
				{
					lineHeight: 1,
				},
			],
			titleSection_mb: [
				"40px",
				{
					lineHeight: 1,
				},
			],
			title_base: [
				"48px",
				{
					lineHeight: 1,
				},
			],
			highlight: [
				"28px",
				{
					lineHeight: 1,
				},
			],
		},

		container: {
			center: true,
		},
		spacing: {
			...new Array(1001)
				.fill()
				.map((_, i) => i)
				.reduce((acc, val) => {
					acc[val] = `${val / 10}rem`;
					return acc;
				}, {}),
		},
		extend: {
			transitionTimingFunction: {
				"expo-in": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
				"expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
			},
			keyframes: {
				noise: {
					"0%": { transform: "translate(0,0)" },
					"10%": { transform: "translate(-5%,-5%)" },
					"20%": { transform: "translate(-10%,5%)" },
					"30%": { transform: "translate(5%,-10%)" },
					"40%": { transform: "translate(-5%,15%)" },
					"50%": { transform: "translate(-10%,5%)" },
					"60%": { transform: "translate(15%,0)" },
					"70%": { transform: "translate(0,10%)" },
					"80%": { transform: "translate(-15%,0)" },
					"90%": { transform: "translate(10%,5%)" },
					"100%": { transform: "translate(5%,0)" },
				},
			},
			animation: {
				rotate: "spin 10s linear infinite",
			},
			backgroundImage: {
				"custom-radial":
					"linear-gradient(90deg, rgba(250,176,79,1) 0%, rgba(11,156,217,1) 100%)",
			},
		},
	},
	plugins: [require("tailwindcss-3d")({ legacy: true })],
};
