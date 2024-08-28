<script setup>
const { client } = usePrismic();

const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigation")
);


// const result = await client.getSingle("navigation");
// console.log(navigation);

// Object.entries(result.data.links_menu).forEach((e) => {
//   const route = e.url_link ? e.link.url : "/";
//   console.log(route);
// });

// console.log(result.data.links_menu)
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
    class="w-screen h-screen fixed inset-0 bg-primary bg-radial-gradient flex items-center justify-center nav z-20 ">
    <img class="absolute top-0 max-w-[900px] z-0" width="100%" height="auto" src="/public/img/menu-ellipse.svg" />
    <nav class="w-full pl-70 pr-40">
      <LogoWhite class="absolute left-0 top-20 px-[16px] md:px-[60px]" />

      <ul class="flex flex-col items-start absolute top-[10%] md:top-[35%]">
        <li v-for="(item, index) in navigation.data.links_menu" :key="index"
          class="text-white font-display uppercase text-lg md:text-md overflow-hidden relative py-20 md:py-10 last:border-b-[1px] last:border-white last:border-opacity-20 last:pb-30"
          @click="toggle">
          <div ref="navItems">
            <PrismicLink
              class="flex items-center border-t-[1px] border-white border-opacity-20 cursor-pointer sm:w-[320px] md:[650px] lg:w-[720px]"
              :field="item.url_link">
              <span class="font-light mt-40 ">0{{ index + 1 }}</span> <span
                class="text-titleSection_mb pl-20 pt-30 ">{{ slugToString(item.label_menu) }}</span>
            </PrismicLink>
          </div>
        </li>
      </ul>
    </nav>
    <div class="flex flex-col pr-70 z-20 absolute right-10 top-[50%] gap-10">
      <PrismicLink :field="navigation.data.pact_link" class="max-w-[360px]">
        <div class="w-[360px] h-[140px] py-8 pl-30 pt-20 pr-6 bg-box-bg flex flex-col cursor-pointer">
          <p class="text-secondary uppercase w-[110px] font-bold sm:leading-20 md:leading-10 z-30">
            {{ navigation.data.pact_title }}
          </p>
          <img class="w-[53px] h-[53px] self-end mt-auto mr-10 mb-10" src="/public/img/arrow-right-menu.svg">
        </div>
      </PrismicLink>
      <PrismicLink :field="navigation.data.sof_link">
        <div class="w-[360px] h-[140px] py-8 pl-30 pt-20 pr-6 bg-box-bg max-w-[360px] flex flex-col cursor-pointer">
          <p class="text-secondary uppercase w-[110px] font-bold sm:leading-20 md:leading-10 z-30">
            {{ navigation.data.sof_title }}
          </p>
          <img class="w-[53px] h-[53px] self-end mt-auto mr-10 mb-10" src="/public/img/arrow-right-menu.svg">
        </div>
      </PrismicLink>
    </div>

  </div>
  <div class="flex flex-row gap-20">

    <button ref="toggleNav"
      class="w-[50px] h-[50px] flex flex-col border border-[var(--burger-color)] rounded-full items-center justify-center z-20 toggle-nav"
      :class="{ active: isActive }" @click="toggle">
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] mx-auto origin-left transition-transform duration-700 ease-expo-out" />
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] my-[4px] mx-auto origin-left transition-transform duration-700 ease-expo-out" />
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] scale-x-50 origin-left transition-transform duration-700 ease-expo-out" />
    </button>
  </div>
</template>

<style scoped>
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