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

    this.scroll();
  },
  methods: {
    toggleFAQ(idx) {
      if (this.activeIndex === idx) {
        this.activeIndex = null;
      } else {
        this.activeIndex = idx;
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

            gsap.fromTo(
              split.words,
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
                onComplete: () => {
                  split.revert();
                },
              }
            );
          });
        }

        if (texts) {
          gsap.fromTo(
            texts,
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
          );
        }

        if (items) {
          gsap.fromTo(
            items,
            1.25,
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
              },
            }
          );
        }
      });
    },
  },
};
</script>

<template>
  <section
    id="documents"
    :ref="setRef"
    class="w-full min-h-screen py-[140px] px-[16px] md:px-[60px]"
    :class="
      slice.primary.light_background_color ? 'bg-secondary' : 'bg-primary'
    "
    :data-nav="slice.primary.light_background_color ? 'dark' : 'light'"
    data-section="documents"
  >
    <div class="max-w-[1300px] m-[auto]">
      <div
        class="flex flex-col md:flex-row md:items-end w-full mb-[40px] md:mb-[135px]"
        :class="
          slice.primary.light_background_color
            ? 'text-primary'
            : 'text-secondary'
        "
      >
        <div class="md:w-1/2 pb-[40px] md:pb-[0px]">
          <h1
            data-title
            class="max-w-[539px] text-titleSection_mb md:text-titleSection uppercase"
          >
            {{ slice.primary.title }}
          </h1>
        </div>
        <div class="md:w-1/2">
          <p data-text class="max-w-[360px]">
            {{ slice.primary.paragraph }}
          </p>
        </div>
      </div>

      <div
        class="flex flex-wrap md:flex-nowrap gap-20 justify-center md:justify-end"
        :class="{ 'flex-wrap gap-20': slice.primary.documents.length > 2 }"
      >
        <div
          v-for="(item, index) in slice.primary.documents"
          :key="index"
          :class="{
            'flex flex-row gap-20 mb-[40px]':
              slice.primary.documents.length > 2,
            'w-full md:w-fit': slice.primary.documents.length <= 2,
          }"
          class="mb-[40px] md:mb-[0px]"
          data-item
        >
          <PrismicLink :field="item.download_url" class="group w-full">
            <figure class="relative w-full">
              <figcaption
                class="absolute z-10 max-w-full md:max-w-[297px] h-full p-[32px] md:px-20 md:py-30 text-primary flex flex-col justify-between"
              >
                <p class="text-base_mb">
                  {{ item.subtitle }}
                </p>
                <h3
                  class="text-download uppercase text-md xs:text-highlight sm:text-highlight sm:md:text-base"
                >
                  {{ item.title }}
                </h3>
              </figcaption>
              <PrismicImage
                class="z-0 w-full max-w-full md:max-w-[297px] h-[380px] md:h-auto md:min-h-[343px] md:w-auto"
                :field="item.banner_image"
              />
            </figure>
            <div
              class="flex items-center justify-between mt-20 max-w-full md:max-w-[297px]"
            >
              <h4
                class="uppercase tracking-[0.08em] text-xsm"
                :class="
                  slice.primary.light_background_color
                    ? 'text-primary'
                    : 'text-secondary'
                "
              >
                {{ item.download_text }}
              </h4>
              <div
                class="w-[35px] h-[35px] flex flex-col border border-[var(--primary-color)] cursor-pointer rounded-full items-center justify-center relative before:absolute before:w-full before:h-full before:bg-primary before:inset-0 before:rounded-full before:scale-0 before:transition-transform group-hover:before:scale-90 before:duration-300 active:before:scale-100"
              >
                <div class="flex relative overflow-hidden">
                  <div
                    class="w-[15px] h-[15px] max-w-[15px] max-h-[15px]relative delay-150 group-hover:delay-0 transition-transform duration-200 expo-out group-hover:translate-y-full"
                  >
                    <svg
                      class="min-w-[10px] min-h-[10px]"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 9.22754L8.37892 15.9028L1.75784 9.22754"
                        :stroke="
                          slice.primary.light_background_color
                            ? 'var(--primary-color)'
                            : 'var(--secondary-color)'
                        "
                        stroke-width="2"
                        stroke-miterlimit="13.33"
                        stroke-linecap="square"
                      />
                      <path
                        d="M8.38281 14.9028L8.38281 1"
                        :stroke="
                          slice.primary.light_background_color
                            ? 'var(--primary-color)'
                            : 'var(--secondary-color)'
                        "
                        stroke-width="2"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    class="w-[15px] h-[15px] max-w-[15px] max-h-[15px] absolute -top-full delay-0 group-hover:delay-150 transition-transform duration-200 expo-out group-hover:translate-y-full"
                  >
                    <svg
                      class="min-w-[10px] min-h-[10px]"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 9.22754L8.37892 15.9028L1.75784 9.22754"
                        stroke="var(--white)"
                        stroke-width="2"
                        stroke-miterlimit="13.33"
                        stroke-linecap="square"
                      />
                      <path
                        d="M8.38281 14.9028L8.38281 1"
                        stroke="var(--white)"
                        stroke-width="2"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </PrismicLink>
        </div>
      </div>
    </div>
  </section>
</template>
