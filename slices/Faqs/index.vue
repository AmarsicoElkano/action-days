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
      activeCategoryIndex: 0,
      activeQuestionIndex: 0,
      sections: [],
      categories: this.slice.primary.faqs,
      uniqueCategories: []
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, SplitText,);

    this.scroll()
    if (this.categories !== "" || this.categories !== undefined) {
      this.filterCategories(this.categories);
    }
  },
  methods: {
    toggleCategory(categoryIdx) {
      if (this.activeCategoryIndex === categoryIdx) {
        this.activeCategoryIndex = null;
      } else {
        this.activeCategoryIndex = categoryIdx;
        this.activeQuestionIndex = null;
      }
    },

    toggleFAQ(categoryIdx, questionIdx) {
      if (this.activeCategoryIndex === categoryIdx && this.activeQuestionIndex === questionIdx) {
        this.activeQuestionIndex = null;
      } else {
        this.activeCategoryIndex = categoryIdx;
        this.activeQuestionIndex = questionIdx;
      }
    },
    filterCategories(categories) {
      categories.forEach(({ category_name, question_title, question_response }) => {
        const category = this.uniqueCategories.find(category => category.category_name === category_name);

        if (category) {
          category.questions.push({ title: question_title, response: question_response });
        } else {
          this.uniqueCategories.push({
            category_name,
            questions: [{ title: question_title, response: question_response }]
          });
        }
      });

      console.log("unique categories", this.uniqueCategories);
      return this.uniqueCategories;
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
  <!-- <section id="faqs" :ref="setRef" class="bg-primary w-full min-h-screen w-full py-[140px] px-[16px] md:px-[60px]"
    data-section="faqs" data-nav="light">
    <div class="max-w-[1300px] flex flex-col md:flex-row justify-between m-[auto]">
      <h1 data-title
        class="md:max-w-[435px] w-1/3 text-titleSection_mb md:text-titleSection text-secondary text-uppercase">
        FAQs
      </h1>
      <div class="md:w-2/3">
        <div v-for=" (item, idx) in slice.primary.faqs" :key="idx" data-item>
          <div class="relative mb-3 py-[40px] border-b border-solid border-secondary">
            <div class="mb-0">
              <span class="pr-80"> {{ item.category_name }}</span>
              <div
                class="relative flex justify-between items-center py-8 uppercase text-left transition-all ease-in cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-secondary"
                @click="toggleFAQ(idx)">
                <span class="pr-80"> {{ item.question_title }}</span>
                <img ref="minusSign-{idx}" src="/public/img/minus.svg" class="minusSign absolute right-0 ml-80 "
                  :class="{ 'hidden': activeIndex !== idx, 'block': activeIndex === idx }">
                <img ref="plusSign" src="/public/img/plus.svg" class="plusSign absolute right-0 ml-80"
                  :class="{ 'block': activeIndex !== idx, 'hidden': activeIndex === idx }">
              </div>
            </div>
            <div class="text-secondary transition-all duration-300 ease-in-out overflow-hidden"
              :class="{ 'max-h-0': activeIndex !== idx, 'max-h-96': activeIndex === idx }">
              <div class="p-4 text-sm leading-normal text-blue-gray-500">
                <PrismicRichText class="faqResponse" :field="item.question_response" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->
  <section id="faqs" :ref="setRef" class="bg-primary w-full min-h-screen py-[100px] px-[16px] md:px-[60px]"
    data-section="faqs" data-nav="light">
    <h1 data-title class="text-titleSection_mb md:text-titleSection text-secondary text-uppercase">
      FAQs
    </h1>
    <div class="max-w-[1300px] flex flex-col  md:flex-row justify-around m-[auto] pt-80  gap-80">
      <div class="md:w-1/4 text-secondary relative mb-3 py-20">
        <div v-for="(item, categoryIdx) in uniqueCategories" :key="categoryIdx"
          class="border-b  border-opacity-30  border-solid border-secondary py-[20px]">
          <div class="flex flex-row justify-between cursor-pointer" @click="toggleCategory(categoryIdx)">
            <span class="uppercase text-highlight font-bold">{{ item.category_name }}</span>
            <span class="uppercase text-base font-bold"> ({{ item.questions.length }})</span>
          </div>
          <div v-if="activeCategoryIndex === categoryIdx">
            <div v-for="(question, questionIdx) in item.questions" :key="questionIdx" data-item>
              <div
                class="py-15 text-base transition-all ease-in cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-secondary"
                @click="toggleFAQ(categoryIdx, questionIdx)">
                {{ question.title.split(" ").splice(0, 6).join(" ") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-2/3 relative">
        <div v-for="(category, categoryIdx) in uniqueCategories" :key="categoryIdx">
          <div v-for="(question, questionIdx) in category.questions" :key="questionIdx" class="absolute mb-3 py-[30px]"
            v-show="activeCategoryIndex === categoryIdx && activeQuestionIndex === questionIdx">
            <div class="text-secondary transition-all duration-300 ease-in-out">
              <div class="py-8 text-left">
                <div class="flex flex-col">
                  <span class="uppercase font-bold">{{ category.category_name }}</span>
                  <span class="py-20 uppercase font-bold text-highlight">{{ question.title }}</span>
                  <div class="py-10 text-sm leading-normal text-blue-gray-500">
                    <PrismicRichText class="faqResponse" :field="question.response" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>