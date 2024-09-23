<script setup>
import "@prismicio/client";
defineProps(getSliceComponentProps(["slice"]));
</script>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Navigation],
      items: [],
      sections: [],
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    this.scroll();
  },
  methods: {
    setRef(el) {
      if (el) this.sections.push(el);
    },
    scroll() {
      this.sections.forEach((el) => {
        const titles = gsap.utils.toArray("[data-title-hero]", el);

        if (titles) {
          titles.forEach((title, index) => {
            const duration = parseInt(title.dataset.duration) || 1.25;
            const scrub = false || title.dataset.scrub;

            gsap.fromTo(
              titles,
              duration,
              {
                yPercent: 150,
                opacity: 0,
              },
              {
                ease: "expo.out",
                yPercent: 0,
                opacity: 1,
                stagger: 0.3,
                scrollTrigger: {
                  trigger: el,
                  // scrub: scrub,
                  start: "top 0%",
                  markers: false,
                },
              }
            );
          });
        }
      });
    },
  },
};
</script>

<template>
  <section :ref="setRef" class="bg-primary px-40 py-[200px] text-white" data-section="overview" data-nav="light">
    <div class="">
      <div class="md:w-[961px] m-[auto] relative z-10 mb-[40px] md:mb-[-30px]">
        <h2 data-title-hero class="w-full uppercase text-titleSection_mb md:text-titleSection">
          {{ slice.primary.title }}
        </h2>
        <h2 data-title-hero class="w-full uppercase text-titleSection_mb md:text-titleSection md:ml-[180px] z-40">
          {{ slice.primary.title_2 }}
        </h2>
      </div>

      <Swiper :slides-per-view="1" :space-between="0" :loop="true" :navigation="{
        prevEl: '.custom-prev',
        nextEl: '.custom-next',
      }" :modules="modules" class="relative overflow-hidden min-h-[60rem]">
        <SwiperSlide v-for="(item, idx) in slice.primary.announcements" :key="idx" ref="items" class="w-full h-full">
          <div class="w-full h-full flex flex-col md:flex-row items-center bg-[#195587]">
            <PrismicImage v-if="item.display_image" :field="item.image"
              class="w-full h-full aspect-square md:aspect-auto md:w-1/2 object-cover md:min-h-[620px]" />
            <PrismicLink class="w-full h-full" v-else-if="item.display_image === false && item.source"
              :field="item.source" target="_blank">
              <img class="w-full h-full object-cover" :src="item.source.thumbnail_url" />
            </PrismicLink>
            <div class=" flex flex-col px-60 h-[360px] md:h-[620px] justify-between py-60 md:pt-[120px]">
              <div class="mb-[20px]">
                <p class="uppercase font-bold pb-40 text-highlight">
                  {{ item.subtitle }}
                </p>
                <PrismicRichText class="text-landing_mb leading-[1.48]" :field="item.paragraph" />
              </div>
              <div class="flex pt-80 justify-between">
                <PrismicLink :field="item.button_link" target="_blank">
                  <button
                    class="min-h-[52px] font-bold text-base_xsm tracking-wider	border border-white border-opacity-20 z-[100] rounded-full uppercase text-white text-xsm pl-60 pr-60 md:pl-30 md:pr-30 py-20">
                    {{ item.announcement_button_text }}
                  </button>
                </PrismicLink>

                <div class="md:absolute right-[40px] z-40 flex gap-[20px] justify-center md:justify-end">
                  <div class="custom-prev cursor-pointer">
                    <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M29 19.6858L21.4286 27.2572L29 34.8286" stroke="#FFFFFF" stroke-width="2"
                        stroke-miterlimit="13.33" stroke-linecap="square" />
                      <circle opacity="0.5" cx="26.5" cy="26.5" r="26" transform="matrix(-1 0 0 1 53 0)"
                        stroke="#FFFFFF" />
                    </svg>
                  </div>
                  <div class="custom-next cursor-pointer">
                    <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 19.6858L31.5714 27.2572L24 34.8286" stroke="#FFFFFF" stroke-width="2"
                        stroke-miterlimit="13.33" stroke-linecap="square" />
                      <circle opacity="0.5" cx="26.5" cy="26.5" r="26" stroke="#FFFFFF" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
.swiper-wrapper {
  max-height: 1620px !important;
}
</style>