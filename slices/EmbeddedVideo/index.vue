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
    class="pt-[160px] px-[16px] md:px-[120px] pb-[100px]" data-nav="dark">
    <div>
      <h1 data-title class="text-titleSection_mb md:text-titleSection uppercase text-primary ml-[60px]">
        {{ slice.primary.title1 }}
      </h1>
      <h1 data-title class="text-titleSection_mb md:text-titleSection uppercase text-primary">
        {{ slice.primary.title2 }}
      </h1>
    </div>

    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2 pt-[40px] md:pt-[130px]">
        <p data-text class="text-primary mb-[40px] md:mb-[0px] md:pr-[120px]">
          {{ slice.primary.text }}
        </p>
      </div>

      <div data-item class="md:w-1/2 aspect-video bg-primary  rounded-xl">
        <PrismicLink :field="slice.primary.source" target="_blank">
          <img class=" rounded-xl" :src="slice.primary.source.thumbnail_url" />
        </PrismicLink>
      </div>
    </div>
  </section>
</template>