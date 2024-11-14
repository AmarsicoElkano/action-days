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
  <section id="agenda" :ref="setRef" class="py-[160px] bg-secondary text-primary px-[16px] md:px-[60px]" data-nav="dark"
    data-section="agenda">
    <h2 data-title class="uppercase text-titleSection_mb md:text-titleSection mb-[20px]">
      {{ slice.primary.title }}
    </h2>

    <div class="overflow-hidden overflow-x-scroll">
      <table class="w-full">
        <thead class="">
          <tr class="uppercase text-sm font-normal text-left">
            <th data-item class="min-w-[170px] py-[40px] pl-[20px]">
              {{ slice.primary.time_title }}
            </th>
            <th data-item class="min-w-[170px] py-[40px] pl-[20px]">
              {{ slice.primary.events_title }}
            </th>
            <th data-item class="min-w-[170px] py-[40px] pl-[20px]">
              {{ slice.primary.speakers_title }}
            </th>
            <th v-if="slice.primary.has_rooms" data-item class="min-w-[170px] py-[40px] pl-[20px]">
              {{ slice.primary.room_title }}
            </th>
          </tr>
        </thead>
        <tbody class="border text-base_mb" v-if="slice.primary.agenda_items.length > 0">
          <tr v-for="(item, idx) in slice.primary.agenda_items" :key="idx"
            data-item>
            <td class="p-[20px] max-w-[170px]">
              <p>{{ item.time }}</p>
            </td>
            <td class="p-[20px] md:w-[40%]">
              <PrismicRichText :field="item.events" :class="$style.textFormated" />
            </td>
            <td class="p-[20px] md:w-[50%]">
              <PrismicRichText :field="item.speakers" :class="$style.textFormated" />
            </td>
            <td v-if="slice.primary.has_rooms" class="p-[20px]">
              <p>{{ item.room }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<style module>
.textFormated a{text-decoration: underline}
</style>