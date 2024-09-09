<script setup>
const { client } = usePrismic();
const { data: secondary_nav } = await useAsyncData("secondary_navigation", () =>
  client.getSingle("secondary_navigation")
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
      currentSection: null,
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    this.root = document.documentElement;

    if (window.innerWidth < 850) {
      ScrollTrigger.create({
        trigger: ".nav-actions",
        start: "top top+=15%",
        end: "bottom top",
        onEnter: () => {
          document
            .querySelector(".nav-actions")
            .classList.add("is-sticky-active");
        },
        onEnterBack: () => {
          document
            .querySelector(".nav-actions")
            .classList.add("is-sticky-active");
        },
        onLeaveBack: () => {
          document
            .querySelector(".nav-actions")
            .classList.remove("is-sticky-active");
        },
      });
    }
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
      target = target.replaceAll("&", "");
      document.querySelector(target).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    updateCurrentNav(section) {
      this.currentNav = section.dataset.nav;
      this.currentSection = section.dataset.section; // Update the currentSection
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 850px) {
  .nav-actions:after {
    content: "";
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background: #004987;
    z-index: -1;
    opacity: 0;
    transition: 0.5s all;
    pointer-events: none;
  }

  .nav-actions:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #004987;
    z-index: -1;
    opacity: 0;
    transition: 0.5s all;
    pointer-events: none;
  }

  .is-sticky-active:after {
    opacity: 1;
  }

  .is-sticky-active:before {
    opacity: 1;
  }
}
</style>

<template>
  <div
    class="nav-actions sticky top-[100px] md:top-0 z-50 h-[64px] text-sm transition-all ease-in-out duration-300"
    :class="currentNav === 'light' ? 'text-secondary' : 'text-primary'"
  >
    <div
      class="nav-actions-bg px-[16px] md:px-[60px] md:bg-primary h-full flex flex-row justify-between items-center"
    >
      <ul
        class="text-white flex flex-row gap-60 h-full border-b transition-all ease-in-out duration-300 overflow-x-scroll md:overflow-x-auto"
        :class="currentNav === 'light' ? 'border-secondary' : 'border-primary'"
      >
        <li
          v-for="(item, index) in secondary_nav.data.links_menu"
          :key="index"
          class="group h-full flex items-center justify-center relative cursor-pointer min-w-[120px] md:min-w-[auto]"
          :class="
            currentSection === item.link_url.url.substring(1)
              ? 'activeitem'
              : ''
          "
          @click="smoothScroll(item.link_url.url)"
        >
          <p
            class="flex items-center before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[5px] before:rounded-lg before:bg-custom-radial before:transition-all before:duration-300 before:ease-out group-hover:before:w-full activeitem:before:w-full"
          >
            {{ slugToString(item.link_title) }}
          </p>
        </li>
      </ul>
      <NuxtLink :to="'/action-days/register'">
        <button
          class="text-white hidden md:block text-xsm h-[40px] border rounded-full uppercase text-sm pl-30 pr-30 transition-all ease-in-out duration-300"
          :class="
            currentNav === 'light'
              ? 'text-secondary border-secondary'
              : 'text-primary border-primary'
          "
        >
          Registration
        </button>
      </NuxtLink>
    </div>
  </div>
  <div class="relative top-[-64px]">
    <div class="h-[64px] bg-primary absolute w-full" />
  </div>
</template>

<style scoped>
.activeitem p::before {
  width: 100%;
}
</style>
