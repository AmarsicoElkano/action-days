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

    this.scroll();
  },
  methods: {
    setRef(el) {
      if (el) this.sections.push(el);
    },
    scroll() {
      this.sections.forEach((el) => {
        const items = gsap.utils.toArray("[data-item]", el);

        if (items) {
          items.forEach((item, index) => {
            const duration = parseInt(item.dataset.duration) || 1.25;
            const scrub = false || item.dataset.scrub;

            gsap.fromTo(
              item,
              duration,
              {
                yPercent: 150,
                opacity: 0,
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
  <section :ref="setRef" class="w-full h-auto bg-secondary pb-[0px] md:pb-[213px]" data-section="agenda"
    data-nav="dark">
    <div class="w-full bg-secondary min-h-screen px-[16px] md:px-[0px]">
      <div class="flex flex-col md:flex-row justify-center pt-[100px] relative">
        <PrismicImage :field="slice.primary.bg_symbol" class="absolute inset-0 w-full h-full z-0" />

        <div class="flex flex-col pb-[40px] md:pb-0px]">
          <p class="text-primary uppercase text-base w-[300px] font-bold">
            {{ slice.primary.title }}
          </p>
          <p class="text-primary text-sm w-[300px]">
            {{ slice.primary.date }}
          </p>
        </div>
        <div class="md:h-screen relative col-start-6 col-span-12">
          <div ref="masonry" class="masonry md:grid gap-[20px] relative">
            <div class="content text-primary text-download uppercase">
              <div class="py-20 md:p-20 md:grid grid-cols-2 md:w-[720px] gap-20">
                <div v-for="(el, idx) in slice.primary.card_group" :key="idx"
                  class="p-[24px] mb-[20px] md:p-20 bg-white w-full max-w-[330px] h-[22rem] flex flex-col"
                  :class="idx === 1 ? 'mt-20' : ''" data-item>
                  <PrismicLink :field="el?.link" class="group flex flex-col justify-between h-full">

                    <!-- Hover image -->
                    <PrismicImage :field="el?.hover_image" />

                    <span class="block text-[18px]">
                      {{ el.subtitle }}
                    </span>
                    <div class="">
                      <PrismicRichText :field="el.paragraph" :class="el.xl_font_size ? ' text-md' : ' text-base'" />
                    </div>
                  </PrismicLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>