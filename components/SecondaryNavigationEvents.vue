<script setup>
const { client } = usePrismic();
const { data: secondary_nav } = await useAsyncData("secondary_navigation_events", () =>
  client.getSingle("secondary_navigation_events")
);

</script>
<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default {
  data() {
    return {
      isActive: false,
      root: null,
      currentNav: null,
      currentSection: null
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    this.root = document.documentElement;

    // Define sections to track
    const sections = document.querySelectorAll('section'); // Adjust the selector to match your sections

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        markers: false, // Optional: For debugging
        onEnter: () => this.updateCurrentNav(section),
        onEnterBack: () => this.updateCurrentNav(section),
        onLeave: () => {
          if (this.currentNav === section.dataset.nav) {
            this.currentNav = null; // Optionally clear if you want to reset
          }
        },
        onLeaveBack: () => {
          if (this.currentNav === section.dataset.nav) {
            this.currentNav = null; // Optionally clear if you want to reset
          }
        },
      });
    });
  },
  methods: {
    toggle() {
      if (this.$refs.toggleNav.classList.contains("active")) {
        this.close();
      } else {
        this.open();
      }
      this.isActive = !this.isActive;
    },
    open() {
      gsap.to(this.$refs.nav, 1.25, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "expo.out",
      });
      gsap.fromTo(
        this.$refs.navItems,
        { yPercent: 150 },
        {
          yPercent: 0,
          duration: 1,
          delay: 0.25,
          stagger: 0.05,
          ease: "expo.out",
        }
      );
      gsap.to(this.root, 0.25, {
        "--logo-color": "#ffffff",
      });
      gsap.to(this.root, 1, {
        "--burger-color": "#ffffff",
      });
    },
    close() {
      gsap.to(this.$refs.nav, 1.25, {
        clipPath: "inset(0% 0% 100% 0%)",
        ease: "expo.out",
        delay: 0.25,
      });
      gsap.fromTo(
        this.$refs.navItems,
        { yPercent: 0 },
        {
          yPercent: 150,
          duration: 1,
          stagger: -0.05,
          ease: "expo.out",
        }
      );
      gsap.to(this.root, 0.25, {
        "--logo-color": "#231F20",
        delay: 0.5,
      });
      gsap.to(this.root, 1, {
        "--burger-color": "#004987",
      });
    },
    slugToString(s) {
      return s?.replaceAll("-", " ");
    },
    smoothScroll(target) {
      target = target.replaceAll('&','')
      document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    updateCurrentNav(section) {
      this.currentNav = section.dataset.nav;
      this.currentSection = section.dataset.section; // Update the currentSection
    }
  },
};
</script>

<template>
  <div
    class="sticky top-[-1px] z-50 px-[16px] md:px-[60px] h-[64px] text-sm transition-all ease-in-out duration-300"
    :class="currentNav === 'light' ? 'text-secondary' : 'text-primary'"
  >
    <div class="h-full flex flex-row justify-between items-center ">
      <ul
        class="flex flex-row gap-60 h-full border-b transition-all ease-in-out duration-300 overflow-x-scroll	 md:overflow-x-auto"
        :class="currentNav === 'light' ? 'border-secondary' : 'border-primary'"
      >
        <li
          v-for="(item, index) in secondary_nav.data.links_menu"
          :key="index"
          class="group h-full flex items-center justify-center relative cursor-pointer min-w-[120px] md:min-w-[auto]"
          :class="currentSection === item.link_url.url.substring(1) ? 'activeitem' : ''"
          @click="smoothScroll(item.link_url.url)"
        >
          <p
            class="flex items-center before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[5px] before:rounded-lg before:bg-custom-radial before:transition-all before:duration-300 before:ease-out group-hover:before:w-full activeitem:before:w-full"
          >
            {{ slugToString(item.link_title) }}
          </p>
        </li>
      </ul>
      <button
        class="hidden md:block text-xsm h-[40px] border rounded-full uppercase text-sm pl-30 pr-30 transition-all ease-in-out duration-300"
        :class="currentNav === 'light' ? 'text-secondary border-secondary' : 'text-primary border-primary'"
      >
        Register
      </button>
    </div>
  </div>
  <div class="relative top-[-64px]">
    <div class="h-[64px] bg-primary absolute w-full bg-primary" />
  </div>
</template>

<style scoped>
  .activeitem p::before {
    width: 100%;
  }
</style>