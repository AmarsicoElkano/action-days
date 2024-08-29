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
    gsap.registerPlugin(ScrollTrigger, SplitText);

    this.scroll()
    this.init();
  },
  methods: {
    init() {
      this.addEvents();
    },
    setRef(el) {
      if (el) this.sections.push(el);
    },
    scroll() {
      this.sections.forEach((el) => {
        const titles = gsap.utils.toArray("[data-title]", el);
        const texts = gsap.utils.toArray("[data-text]", el);
        const items = gsap.utils.toArray("[data-item]", el);
        const buttons = gsap.utils.toArray("[data-buttons]", el);

        if (titles) {
          titles.forEach((title, index) => {
            const duration = parseInt(title.dataset.duration) || 1.25;
            const scrub = false || title.dataset.scrub;

            const split = new SplitText(title, {
              type: "lines, words",
              linesClass: "overflow-hidden",
            });

            gsap.fromTo(split.words, duration,
              {
                yPercent: 150,
                opacity: 0
              },
              {
                ease: "expo.out",
                yPercent: 0,
                opacity: 1,
                stagger: 0.075,
                scrollTrigger: {
                  trigger: el,
                  scrub: scrub,
                  start: "top 30%",
                  markers: false,
                },
                onComplete: () => {
                  split.revert();
                },
              });
          });
        }

        if (texts) {
          gsap.fromTo(texts,
            {
              opacity: 0,
              yPercent: 100,
            },
            {
              opacity: 1,
              yPercent: 0,
              delay: 1,
              scrollTrigger: {
                trigger: el,
                scrub: false,
                start: "top 30%",
                markers: false,
              },
            }
          )
        }

        if (items) {
          gsap.fromTo(items, 1.25,
            {
              opacity: 0,
              yPercent: 100,
            },
            {
              ease: "expo.out",
              opacity: 1,
              yPercent: 0,
              delay: 0.5,
              stagger: 0.075,
              scrollTrigger: {
                trigger: el,
                scrub: false,
                start: "top 30%",
                markers: false,
              }
            });
        }

        if (buttons) {
          gsap.fromTo(buttons,
            {
              opacity: 0,
              yPercent: 100
            },
            {
              opacity: 1,
              yPercent: 0,
              stagger: 0.075,
              scrollTrigger: {
                trigger: el,
                scrub: false,
                start: "top 30%",
                markers: false,
              }
            }
          )
        }
      })
    },
    addEvents() {

    },
  },
};
</script>

<template>
  <section id="speakers" :ref="setRef" class="bg-primary text-secondary py-[120px]" data-nav="light"
    data-section="speakers">
    <div class="flex flex-col md:flex-row w-full px-[16px] md:px-[120px]">
      <h2 data-title class="w-1/2 text-titleSection_mb md:text-titleSection uppercase mb-[100px]">
        {{ slice.primary.title }}
      </h2>
      <div class="md:w-1/2 h-fit md:self-end">
        <PrismicRichText data-text class="md:w-[600px] " :field="slice.primary.paragraph" />
      </div>
    </div>

    <div class="ml-[16px] md:ml-[120px]">
      <Swiper :slides-per-view="'auto'" :space-between="20" :loop="true" :navigation="{
        prevEl: '.custom-prev',
        nextEl: '.custom-next'
      }" :modules="modules" class="relative">
        <!-- Custom Navigation Buttons -->
        <div data-buttons class="absolute block top-[0px] left-[0px] z-40 flex gap-[20px] mt-[26px] justify-end">
          <div class="custom-prev cursor-pointer">
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29 19.6858L21.4286 27.2572L29 34.8286" stroke="#FFFFFF" stroke-width="2"
                stroke-miterlimit="13.33" stroke-linecap="square" />
              <circle opacity="0.5" cx="26.5" cy="26.5" r="26" transform="matrix(-1 0 0 1 53 0)" stroke="#FFFFFF" />
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
        <SwiperSlide v-for="(item, idx) in slice.primary?.speakers" :key="idx" ref="items"
          class="w-[25%] mt-[100px] max-w-[297px]" data-item>
          <div class="flex flex-col">
            <PrismicImage :field="item.image" class="pb-20" />
            <div>
              <p class="font-bold pb-[5px]">
                {{ item?.speaker_name }}
              </p>
              <p class="text-sm">
                {{ item?.description }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>