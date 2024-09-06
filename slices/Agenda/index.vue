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
    <div class="w-full h-full bg-secondary min-h-screen px-[16px] md:px-[0px] relative">
      <div class="flex flex-col md:flex-row justify-center mx-auto pt-[200px] w-full relative">
        <PrismicImage :field="slice.primary.bg_symbol" class="absolute inset-0 w-full h-full z-0" />

        <div class="flex flex-col pb-[40px] md:pb-0px]">
          <p class="text-primary uppercase text-base w-[300px] font-bold">
            {{ slice.primary.title }}
          </p>
          <p class="text-primary text-sm w-[300px]">
            {{ slice.primary.date }}
          </p>
        </div>
        <div class="md:min-h-screen md:mb-[300px] relative col-start-6 col-span-12 ">
          <div ref="masonry" class="masonry flex justify-center md:grid gap-[20px] relative  mx-auto">
            <div class="content text-primary text-download uppercase">
              <div class="py-[120px] md:p-20  md:grid md:grid-cols-2 md:w-[720px] gap-20 " style="place-self: center;">
                <div v-for="(el, idx) in slice.primary.card_group" :key="idx"
                  class="p-[24px] min-w-[328px] max-w-[420px] mb-[20px] md:mb-0 md:p-20 bg-white w-full max-w-full md:max-w-[330px] h-auto md:h-[22rem] flex flex-col relative box-agenda justify-center"
                  :class="[
                    el?.xl_font_size
                      ? 'min-h-[300px] md:min-h-[420px]'
                      : 'min-h-[164px] md:min-h-[343px]'
                  ]" data-item>
                  <PrismicLink :field="el?.link" class="group flex flex-col justify-between h-full">
                    <!-- Hover image -->
                    <PrismicImage v-if="el?.hover_image" :field="el?.hover_image"
                      class="image-hover-agenda absolute w-full h-full object-cover object-center top-0 left-0 z-[-1]" />

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
<style>
.box-agenda:hover .image-hover-agenda {
  opacity: 1;
}

.box-agenda:hover {
  color: white;
}

.image-hover-agenda {
  opacity: 0;
  transition: ease-in 0.5s;
}
</style>