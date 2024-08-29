<script setup>
import "@prismicio/client";
defineProps(getSliceComponentProps(["slice"]));
</script>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Pagination, Navigation],
      items: [],
      sections: [],
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, SplitText,);
    this.init();
    this.scroll();
  },
  methods: {
    setRef(el) {
      if (el) this.sections.push(el);
    },
    init() {
      this.addEvents();
    },
    addEvents() {
    },
    toggleFAQ() {
      console.log("hello")
    },
    scroll() {
      this.sections.forEach((el) => {
        const titles = gsap.utils.toArray("[data-title]", el);

        if (titles) {
          titles.forEach((title, index) => {
            const duration = parseInt(title.dataset.duration) || 1.25;
            const scrub = false || title.dataset.scrub;

            gsap.fromTo(titles, duration,
              {
                yPercent: 150,
                opacity: 0
              },
              {
                ease: "expo.out",
                yPercent: 0,
                opacity: 1,
                stagger: 0.2,
                scrollTrigger: {
                  trigger: el,
                  scrub: scrub,
                  start: "top 30%",
                  markers: false,
                },
              });
          });
        }
      })
    }
  },
};
</script>

<template>
  <section :ref="setRef" class="bg-primary px-40 py-[200px] text-white" data-section="overview" data-nav="light">
    <div>
      <div class="md:w-[961px] m-[auto] relative md:top-[50px] z-10 mb-[40px] md:mb-[0px]">
        <h2 data-title class="w-full uppercase text-titleSection_mb md:text-titleSection">
          {{ slice.primary.title }}
        </h2>
        <h2 data-title class="w-full uppercase text-titleSection_mb md:text-titleSection md:ml-[180px] z-40">
          {{ slice.primary.title_2 }}
        </h2>
      </div>


      <Swiper :slides-per-view="1" :space-between="0" :loop="true" :navigation="{
        prevEl: '.custom-prev',
        nextEl: '.custom-next'
      }" :modules="modules" class="relative overflow-hidden">
        <SwiperSlide v-for="(item, idx) in slice.primary.announcements" :key="idx" ref="items" class="">
          <div class="flex flex-col md:flex-row items-center bg-[#195587]">
            <PrismicImage :field="item.image" class="w-full aspect-square md:aspect-auto md:w-1/2" />
            <div class="px-[24px] py-[40px] md:py-[0px] md:px-[65px] w-full md:w-1/2">
              <div class="mb-[20px] md:mb-[160px]">
                <p class="uppercase font-bold pb-40 text-base">
                  {{ item.subtitle }}
                </p>
                <PrismicRichText :field="item.paragraph" />
              </div>
              <div class="flex pt-80">
                <button
                  class="font-bold text-sm border border-[var(--burger-color)] z-[100] rounded-full uppercase text-white text-sm pl-30 pr-30 py-10">
                  View the Programme
                </button>

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

<style>
.swiper-wrapper {
  max-height: 620px !important;
}
</style>