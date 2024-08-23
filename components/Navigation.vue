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
  <div
    ref="nav"
    class="w-screen h-screen fixed inset-0 z-10 bg-primary flex items-center justify-center nav z-20"
  >
    <nav>
      <ul class="flex flex-col items-start">
        <li
          v-for="(item, index) in navigation.data.links_menu"
          :key="index"
          class="text-white font-display uppercase text-lg md:text-md overflow-hidden relative py-25 md:py-15"
          @click="toggle"
        >
          <div ref="navItems">
            <NuxtLink
              v-if="item.url_link?.uid === 'home'"
              :to="'/'"
              class=" flex items-center"
            >
              {{ slugToString(item.label_menu) }}
            </NuxtLink>
            <NuxtLink
              v-else-if="item.url_link?.uid !== 'home'"
              :to="'/event/' + item.url_link?.uid"
              class="flex items-left"
            >
              <span>0{{ index + 1 }} {{ slugToString(item.label_menu) }}</span>
            </NuxtLink>
          </div>
        </li>
      </ul>
      <div>
        <button
          class="border border-[var(--burger-color)] z-[100] rounded-full uppercase text-white text-sm pl-30 pr-30"
        >
          Register to the event
        </button>
        <div>
          <p>Pact for the future</p>
          <img src="/public/img/arrow-right.svg">
        </div>
      </div>
    </nav>
  </div>
  <div class="flex flex-row gap-20">
    <button
      ref="toggleNav"
      class="w-[50px] h-[50px] flex flex-col border border-[var(--burger-color)] rounded-full items-center justify-center z-20 toggle-nav"
      :class="{ active: isActive }"
      @click="toggle"
    >
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] mx-auto origin-left transition-transform duration-700 ease-expo-out"
      />
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] my-[4px] mx-auto origin-left transition-transform duration-700 ease-expo-out"
      />
      <div
        class="w-[20px] h-[2px] bg-[var(--burger-color)] scale-x-50 origin-left transition-transform duration-700 ease-expo-out"
      />
    </button>
  </div>
</template>

<style scoped>
.nav {
  clip-path: inset(0% 0% 100% 0%);
}
</style>