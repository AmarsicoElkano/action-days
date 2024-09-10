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
      activeIndex: null,
      sections: [],
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    this.scroll()
  },
  methods: {
    toggleFAQ(idx) {
      if (this.activeIndex === idx) {
        this.activeIndex = null
      } else {
        this.activeIndex = idx
      }
    },
    setRef(el) {
      if (el) this.sections.push(el);
    },
    scroll() {
      this.sections.forEach((el) => {
        const titles = gsap.utils.toArray("[data-title]", el);
        const texts = gsap.utils.toArray("[data-text]", el);
        const items = gsap.utils.toArray("[data-item]", el);

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

      })
    }
  },
};
</script>
<template>
  <section id="livesession" :ref="setRef" data-section="livesession"
    class="h-screen pt-[160px] px-[16px] md:pl-[120px] md:pr-0 pb-[100px]" data-nav="dark">
    <div>
      <h1 data-title class="text-titleSection_mb md:text-titleSection uppercase text-primary md:ml-[60px]">
        {{ slice.primary.title1 }}
      </h1>
      <h1 data-title class="text-titleSection_mb md:text-titleSection uppercase text-primary">
        {{ slice.primary.title2 }}
      </h1>
    </div>
    <div class="md:w-1/2 pt-[40px] md:pt-[130px]">
      <p data-text class="text-primary mb-[40px] md:mb-[0px] md:w-[420px]">
        {{ slice.primary.text }}
      </p>
    </div>

    <div class="md:relative ">

      <div
        class="md:absolute md:right-0  flex flex-col-reverse md:flex-row md:justify-end pb-[60px] md:pb-0 md:mt-[-200px]">
        <div
          class="flex flex-row justify-center w-full relative gap-[24px] md:w-auto md:absolute md:right-[80px] md:gap-15"
          v-if="slice.primary.sources.length > 1">
          <div class="custom-prev cursor-pointer">
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29 19.6858L21.4286 27.2572L29 34.8286" stroke="#004987" stroke-width="2"
                stroke-miterlimit="13.33" stroke-linecap="square" />
              <circle opacity="0.5" cx="26.5" cy="26.5" r="26" transform="matrix(-1 0 0 1 53 0)" stroke="#004987" />
            </svg>
          </div>
          <div class="custom-next cursor-pointer">
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 19.6858L31.5714 27.2572L24 34.8286" stroke="#004987" stroke-width="2"
                stroke-miterlimit="13.33" stroke-linecap="square" />
              <circle opacity="0.5" cx="26.5" cy="26.5" r="26" stroke="#004987" />
            </svg>
          </div>
        </div>

        <div data-item class="mt-100 aspect-video rounded-xl">

          <div v-if="slice.primary.sources.length > 1" class="swiper-container">
            <Swiper :slides-per-view="1" :space-between="0" :loop="false" :navigation="{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }" :modules="modules" class="relative ">
              <SwiperSlide v-for="(item, idx) in slice.primary.sources" :key="idx" ref="items"
                class="w-full h-full rounded-xl">
                <PrismicLink :field="item.source" target="_blank">
                  <p>{{ item.title }}</p>
                  <img class="rounded-3xl md:rounded-xl" :src="item.source.thumbnail_url" />
                </PrismicLink>
              </SwiperSlide>
            </Swiper>
          </div>
          <div data-item class="max-w-[600px] md:mt-[-100px] aspect-video rounded-xl"
            v-else-if="slice.primary.sources.length === 1">
            {{ console.log(slice.primary) }}
            <PrismicLink :field="slice.primary.sources[0]" target="_blank">
              <img class="rounded-3xl md:rounded-xl" :src="slice.primary.sources[0].source.thumbnail_url" />
            </PrismicLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.swiper {
  overflow-x: hidden;
  padding-right: 100px;
  max-width: 690px !important;
}

.swiper-slide {
  border-radius: 10px;
}

.swiper-wrapper {
  max-width: 620px !important;
  position: relative;
  gap: 35px;
}
</style>