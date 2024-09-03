// plugins/lenis.js

import Lenis from "lenis";

export default defineNuxtPlugin((nuxtApp) => {
	// Global lenis instantiation
	let lenis;

	// Initialize Lenis on the client-side
	nuxtApp.hook("app:mounted", () => {
		lenis = new Lenis({
			duration: 1.2, // Speed of the scroll
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
			direction: "vertical", // Can be 'vertical' or 'horizontal'
			smooth: true,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Exposing lenis client side (to allow nav access)
		nuxtApp.provide("lenis", lenis);
	});
});
