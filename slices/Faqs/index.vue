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
      uniqueCategories: [],
    };
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    document.fonts.ready.then(() => {
      this.$nextTick(() => {
        this.scroll();
      });
    });

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
      if (
        this.activeCategoryIndex === categoryIdx &&
        this.activeQuestionIndex === questionIdx
      ) {
        this.activeQuestionIndex = null;
      } else {
        this.activeCategoryIndex = categoryIdx;
        this.activeQuestionIndex = questionIdx;
      }
    },

    filterCategories(categories) {
      categories.forEach(
        ({ category_name, question_title, question_response }) => {
          const category = this.uniqueCategories.find(
            (cat) => cat.category_name === category_name
          );

          if (category) {
            category.questions.push({
              title: question_title,
              response: question_response,
            });
          } else {
            this.uniqueCategories.push({
              category_name,
              questions: [
                { title: question_title, response: question_response },
              ],
            });
          }
        }
      );

      return this.uniqueCategories;
    },

    setRef(el) {
      if (el) this.sections.push(el);
    },

    scroll() {
      const section = this.$el;
      const titles = gsap.utils.toArray("[data-title]", section);
      const items = gsap.utils.toArray("[data-item]", section);

      if (titles.length) {
        titles.forEach((title) => {
          const duration = parseFloat(title.dataset.duration) || 1.25;
          const scrub = title.dataset.scrub === "true";

          const split = new SplitText(title, {
            type: "lines, words",
            linesClass: "overflow-hidden",
          });

          gsap.fromTo(
            split.words,
            {
              yPercent: 150,
              opacity: 0,
            },
            {
              duration: duration,
              ease: "expo.out",
              yPercent: 0,
              opacity: 1,
              stagger: 0.075,
              scrollTrigger: {
                trigger: title,
                start: "top bottom-=25%",
              },
              onComplete: () => {
                split.revert();
              },
            }
          );
        });
      }

      if (items.length) {
        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            yPercent: 100,
          },
          {
            duration: 1,
            ease: "expo.out",
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.125,
            scrollTrigger: {
              trigger: "#faqs-qa",
              start: "top bottom-=25%",
            },
          }
        );
      }
    },
  },
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
            'font-bold btn-gradient-box w-full p-10 rounded-[50px]':
              activeCategoryIndex === categoryIdx,
            'border-white border-[1px] w-full p-10 rounded-[50px]':
              activeCategoryIndex !== categoryIdx,
          }" class="flex flex-row cursor-pointer h-[70px] items-center" @click="toggleCategory(categoryIdx)">
            <span class="uppercase text-landing_mb w-full"
              :class="{ 'font-bold': activeCategoryIndex === categoryIdx }">{{
                item.category_name
              }}</span>
          </button>
        </div>
      </div>

      <div id="faqs-qa" class="md:w-2/3 relative">
        <div v-for="(category, categoryIdx) in uniqueCategories" :key="categoryIdx">
          <div v-show="activeCategoryIndex === categoryIdx">
            <div data-title class="uppercase p-10 text-secondary text-base mb-20">
              {{ category.category_name }}
            </div>
            <div v-for="(question, questionIdx) in category.questions" :key="questionIdx" class="mb-3 py-[0px]"
              data-item>
              <div
                class="text-secondary transition-all duration-300 ease-in-out border-b border-white pb-0 border-opacity-30 border-secondary">
                <div
                  class="relative flex justify-between items-center py-14 md:py-20 uppercase text-left transition-all ease-in cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-secondary"
                  @click="toggleFAQ(categoryIdx, questionIdx)">
                  <span class="pr-80 font-bold p-10 text-highlight leading-[1.3]">{{
                    question.title
                  }}</span>
                  <img ref="minusSign-{questionIdx}" src="/public/img/minus.svg"
                    class="minusSign absolute right-0 ml-80" :class="{
                      hidden: activeQuestionIndex !== questionIdx,
                      block: activeQuestionIndex === questionIdx,
                    }" />
                  <img ref="plusSign" src="/public/img/plus.svg" class="plusSign absolute right-0 ml-80" :class="{
                    block: activeQuestionIndex !== questionIdx,
                    hidden: activeQuestionIndex === questionIdx,
                  }" />
                </div>
                <div class="text-secondary transition-all duration-300 ease-in-out overflow-hidden" :class="{
                  'max-h-0': activeQuestionIndex !== questionIdx,
                  'max-h-auto py-20': activeQuestionIndex === questionIdx,
                }">
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

.btn-gradient-box {
  position: relative;
}

.btn-gradient-box:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 1px;
  /* !importanté */
  border-radius: inherit;
  background: #004987;
  background-clip: padding-box;
  /* !importanté */
  border: solid 5px transparent;
  /* !importanté */
  border-radius: 50px;
  z-index: 1;
}

.btn-gradient-box span {
  z-index: 2;
}

.btn-gradient-box:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  border-radius: 50px;
  background: linear-gradient(260.06deg,
      #fbb04d -9.61%,
      rgba(11, 156, 217, 0.59) 116.66%);
}
</style>