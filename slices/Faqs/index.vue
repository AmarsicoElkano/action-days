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
    gsap.registerPlugin(ScrollTrigger, SplitText);
    this.scroll();
    if (this.categories) {
      this.filterCategories(this.categories);

      if (this.uniqueCategories.length > 0) {
        this.activeCategoryIndex = 0;
        if (this.uniqueCategories[0].questions.length > 0) {
          this.activeQuestionIndex = 0;
        }
      }
    }
  },
  methods: {
    toggleCategory(categoryIdx) {
      if (this.activeCategoryIndex === categoryIdx) {
        this.activeCategoryIndex = null;
        this.activeQuestionIndex = null;
      } else {
        this.activeCategoryIndex = categoryIdx;
        this.activeQuestionIndex = 0;
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
        const category = this.uniqueCategories.find(cat => cat.category_name === category_name);

        if (category) {
          category.questions.push({ title: question_title, response: question_response });
        } else {
          this.uniqueCategories.push({
            category_name,
            questions: [{ title: question_title, response: question_response }]
          });
        }
      });

      console.log(this.uniqueCategories)

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
      });
    }
  }
};
</script>

<template>
  <section id="faqs" :ref="setRef" class="bg-primary w-full min-h-screen py-[100px] px-[16px] md:px-[60px]"
    data-section="faqs" data-nav="light">
    <h1 v-if="slice.primary.display_title" data-title
      class="text-titleSection_mb md:text-titleSection text-secondary text-uppercase">
      FAQs
    </h1>
    <div class="max-w-[1300px] flex flex-col md:flex-row justify-around m-[auto] pt-80 gap-80"
      :class="{ 'pt-0': !slice.primary.display_title }">
      <div class="md:w-1/4 text-secondary relative mb-3">
        <div v-for="(item, categoryIdx) in uniqueCategories" :key="categoryIdx" class="py-[20px] flex flex-row">
          <button v-if="uniqueCategories.length > 1" :class="{
            'border-white border-[1px] font-bold w-full p-10 rounded-[30px]': activeCategoryIndex === categoryIdx,
            'border-white border-[1px] w-full p-10 rounded-[30px]': activeCategoryIndex !== categoryIdx
          }" class="flex flex-row  cursor-pointer" @click="toggleCategory(categoryIdx)">
            <span class="uppercase text-highlight w-full">{{ item.category_name }}</span>
          </button>
        </div>
      </div>
      <div class="md:w-2/3 relative">
        <div v-for="(category, categoryIdx) in uniqueCategories" :key="categoryIdx">
          <div v-show="activeCategoryIndex === categoryIdx">
            <span class="uppercase p-10 text-secondary text-base">{{ category.category_name }}</span>
            <div v-for="(question, questionIdx) in category.questions" :key="questionIdx" class="mb-3 py-[10px]">
              <div
                class="text-secondary transition-all duration-300 ease-in-out border-b border-white pb-20 border-opacity-30 border-secondary">
                <div
                  class="relative flex justify-between items-center py-8 uppercase text-left transition-all ease-in cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-secondary"
                  @click="toggleFAQ(categoryIdx, questionIdx)">
                  <span class="pr-80 font-bold p-10 text-highlight">{{ question.title }}</span>
                  <img ref="minusSign-{questionIdx}" src="/public/img/minus.svg"
                    class="minusSign absolute right-0 ml-80"
                    :class="{ 'hidden': activeQuestionIndex !== questionIdx, 'block': activeQuestionIndex === questionIdx }">
                  <img ref="plusSign" src="/public/img/plus.svg" class="plusSign absolute right-0 ml-80"
                    :class="{ 'block': activeQuestionIndex !== questionIdx, 'hidden': activeQuestionIndex === questionIdx }">
                </div>
                <div class="text-secondary transition-all duration-300 ease-in-out overflow-hidden"
                  :class="{ 'max-h-0': activeQuestionIndex !== questionIdx, 'max-h-auto pb-10': activeQuestionIndex === questionIdx }">
                  <div class="p-10 pt-8 text-sm leading-normal text-blue-gray-500">
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

<style>
.gradient-border {
  width: 100%;
  border: 4px solid transparent;
  border-radius: 30px;
  background: linear-gradient(rgba(251, 176, 77, 1) 2%,
      rgba(0, 158, 219, 1) 88%);
  background-clip: border-box;
  background-color: transparent;
}

.gradient-border button {
  background-color: var(--primary-color);
  border: none;
  width: 100%;
  padding: 2rem 2rem;
  border-radius: inherit;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
</style>