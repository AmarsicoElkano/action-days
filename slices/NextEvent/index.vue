<script setup>
import "@prismicio/client";
defineProps(getSliceComponentProps(["slice"]));
</script>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

export default {
  data() {
    return {
      activeIndex: null,
      sections: []
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
        const titles = gsap.utils.toArray("[data-title-header]", el);
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
  <section :ref="setRef" class="relative w-screen h-screen" data-nav="light">
    <PrismicImage v-if="slice.primary.background_image" :field="slice.primary.background_image"
      class="absolute top-0 z-0 w-full h-full object-cover" />
    <div class="absolute w-full h-full bg-primary opacity-80" />

    <div
      class="px-[16px] md:px-[120px] relative flex flex-col items-center justify-center w-full h-full gap-[40px] md:gap-[0]">
      <div class="w-full">
        <h2 data-title-header class="uppercase text-titleSection_mb md:text-titleSection text-secondary">
          {{ slice.primary.title_1 }}
        </h2>
        <h2 data-title-header class="uppercase text-titleSection_mb md:text-titleSection text-secondary ml-[60px]">
          {{ slice.primary.title_2 }}
        </h2>
      </div>
      <div class="flex flex-col-reverse md:flex-row gap-[40px] md:gap-[0]">
        <div class="md:w-1/2">
          <div class="md:mt-[135px]">
            <PrismicLink class="text-secondary uppercase flex gap-[40px] items-center"
              :field="slice.primary.button_link">
              {{ slice.primary.button_text }}
              <svg width="41" height="32" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.0019 2L39.2304 16.2286L25.0019 30.4571" stroke="white" stroke-width="2"
                  stroke-miterlimit="13.33" stroke-linecap="square" />
                <path d="M39.0009 16L1.00095 16" stroke="white" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
              </svg>
            </PrismicLink>
          </div>
        </div>
        <div class="md:w-1/2">
          <p data-text class="text-primary text-secondary">
            {{ slice.primary.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>