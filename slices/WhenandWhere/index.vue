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
      sections: [],
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    this.scroll()
  },
  methods: {
    setRef(el) {
      if (el) this.sections.push(el);
    },
    scroll() {
      this.sections.forEach((el) => {
        const titles = gsap.utils.toArray("[data-title]", el);
        const texts = gsap.utils.toArray("[data-text]", el);
        const images = gsap.utils.toArray("[data-image]", el);

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
          texts.forEach((text, index) => {
            const scrub = false || text.dataset.scrub;
            gsap.fromTo(text,
              {
                opacity: 0,
                yPercent: 150
              },
              {
                opacity: 1,
                yPercent: 0,
                scrollTrigger: {
                  trigger: el,
                  scrub: scrub,
                  start: "top 30%",
                  markers: false,
                },
              }
            )
          })
        }

        if (images) {
          images.forEach((image, index) => {
            gsap.fromTo(image,
              {
                opacity: 0,
                yPercent: 150
              },
              {
                opacity: 1,
                yPercent: 0,
                scrollTrigger: {
                  trigger: el,
                  scrub: false,
                  start: "top 70%",
                  end: "bottom 100%",
                  markers: false,
                },
              }
            )
          })
        }

      })
    }
  },
};
</script>

<template>
  <section id="whenwhere" :ref="setRef" class="bg-primary w-full min-h-screen relative" data-section="when&where"
    data-nav="light">
    <div>
      <PrismicImage :field="slice.primary.bg_symbol" class="z-[10] absolute w-full h-full left-0" />
      <div class="flex flex-col md:flex-row gap-100 py-[140px] pl-40 pr-40">
        <PrismicImage :field="slice.primary.image" class="sm:w-[450px] pt-10" data-image />
        <div class="z-[20] flex flex-col gap-100 pt-40">
          <div v-for="(item, index) in slice.primary.questions" :key="index" class="text-secondary ">
            <h1 data-title class=" uppercase font-bold" style="font-size: 36px;">
              {{ item.question_title }}
            </h1>
            <p data-text class="pl-40 pt-40">
              {{ item.question_response }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>