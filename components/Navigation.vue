<script setup>
const { client } = usePrismic();

const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigation")
);

</script>

<script>
import gsap from "gsap";

export default {
  data() {
    return {
      isActive: false,
      root: null,
    };
  },
  mounted() {
    this.root = document.documentElement;
  },
  methods: {
    toggle() {
      if (this.$refs.toggleNav.classList.contains("active")) {
        this.close();
      } else {
        this.open();
      }
      this.isActive = !this.isActive;

      const htmlElement = document.body;
      const lenis = this.$lenis;

      // console.log('lenis instance', lenis);

      if (this.isActive) {
        htmlElement.classList.add('no-scroll');
        if (lenis) lenis.stop();
      } else {
        htmlElement.classList.remove('no-scroll');
        if (lenis) lenis.start();
      }

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
        "--logo-color": "#ffffff",
        delay: 0.5,
      });

      gsap.to(this.root, 1, {
        "--burger-color": "#ffffff",
      });
    },
    slugToString(s) {
      return s?.replaceAll("-", " ");
    },
  },
};
</script>
<template>
  <div ref="nav"
    class="max-h-[100vh] w-screen max-h-screen !overflow-y-hidden fixed top-0 inset-0 bg-primary bg-radial-gradient flex flex-col justify-between nav z-20">

    <LogoWhite class="absolute left-0 top-[10px] px-[16px] md:px-[60px]" />

    <div class="max-w-[900px]">
      <img class="absolute  md:px-[250px]  top-0 max-w-full w-full h-auto" src="/public/img/menu-ellipse.svg" />
    </div>


    <div
      class="flex flex-col py-80 md:flex-row justify-center gap-80  md:justify-between items-center md:items-end lg:items-end h-full flex-end w-full px-10 md:px-60 h-full">
      <!-- Navigation Links Section -->
      <div class="flex flex-col md:flex-col items-start w-full sm:max-w-[720px]">
        <div v-for="(item, index) in navigation.data.links_menu" :key="index"
          class="text-white font-display w-[720px] uppercase text-lg md:text-md overflow-hidden relative py-20 md:py-10 last:border-b-[1px] last:border-white last:border-opacity-20 last:pb-30"
          @click="toggle">
          <div ref="navItems">
            <PrismicLink class="flex items-center border-t-[1px] border-white border-opacity-20 cursor-pointer w-full"
              :field="item.url_link">
              <span class="font-light mt-40">0{{ index + 1 }}</span>
              <span class="text-highlight sm:text-titleSection_mb md:text-titleSection_mb pl-20 pt-30">
                {{ slugToString(item.label_menu) }}
              </span>
            </PrismicLink>
          </div>
        </div>
      </div>

      <!-- Prismic Links Section -->
      <div class="flex flex-col md:flex-col space-y-20 z-20 w-full flex-end max-w-[360px]">
        <PrismicLink :field="navigation.data.pact_link" class=" ">
          <div
            class="w-full md:w-[360px] h-[140px] py-20 md:py-8 pl-20 xs:pr-20 xs:py-20 sm:py-20 sm:pr-10 md:pr-10 bg-box-bg flex flex-row cursor-pointer justify-between">
            <p
              class="text-secondary uppercase w-[150px] pt-40 pl-40 md:pt-20 md:pl-10 font-bold sm:w-[110px] md:w-[140px] sm:leading-20 md:leading-10 z-30">
              {{ navigation.data.pact_title }}
            </p>
            <img class="w-[53px] h-[53px] self-end mb-5" src="/public/img/arrow-right-menu.svg">
          </div>
        </PrismicLink>
        <PrismicLink :field="navigation.data.sof_link">
          <div
            class="w-full md:w-[360px] h-[140px] py-20 md:py-8 pl-20 xs:pr-20 xs:py-20 sm:py-20 sm:pr-10 md:pr-10 bg-box-bg flex flex-row cursor-pointer justify-between">
            <p
              class="text-secondary uppercase w-[150px] pt-40 pl-40 md:pt-20 md:pl-10 font-bold sm:w-[110px] md:w-[140px] sm:leading-20 md:leading-10 z-30">
              {{ navigation.data.sof_title }}
            </p>
            <img class="w-[53px] h-[53px] self-end mb-5" src="/public/img/arrow-right-menu.svg">
          </div>
        </PrismicLink>
      </div>
    </div>
  </div>

  <div class="flex flex-row gap-20" v-if="$route.path !== '/'">
    <button ref="toggleNav"
      class="w-[50px] h-[50px] flex flex-col border border-[var(--burger-color)] rounded-full items-center justify-center z-20 toggle-nav"
      :class="{ active: isActive }" @click="toggle">
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] mx-auto origin-left transition-transform duration-700 ease-expo-out">
      </div>
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] my-[4px] mx-auto origin-left transition-transform duration-700 ease-expo-out">
      </div>
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] scale-x-50 origin-left transition-transform duration-700 ease-expo-out">
      </div>
    </button>
  </div>
</template>

<style scoped>
.no-scroll {
  max-height: 70vh;
  overflow: hidden;
  scrollbar-width: none;
}

.no-scroll ::-webkit-scrollbar {
  display: none;
}

.nav {
  clip-path: inset(0% 0% 100% 0%);
}

.bg-radial-gradient {
  background-image: url("/public/img/menu-bg.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bg-box-bg {
  background-image: url("/public/img/menu-box.svg");
  background-position: center;
  background-repeat: no-repeat;
}
</style>