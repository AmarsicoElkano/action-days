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
      gsap.registerPlugin(ScrollTrigger, SplitText,);

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
  <section
    id="faqs"
    :ref="setRef"
    class="bg-primary w-full min-h-screen w-full py-[140px] px-[16px] md:px-[60px]"
    data-section="faqs"
    data-nav="light"
  >
    <div class="max-w-[1300px] flex flex-col md:flex-row justify-between m-[auto]">
      <h1
        data-title
        class="md:max-w-[435px] w-1/3 text-titleSection_mb md:text-titleSection text-secondary text-uppercase"
      >
        FAQs
      </h1>
      <div class="md:w-2/3">
        <div
          v-for=" (item, idx) in slice.primary.faqs"
          :key="idx"
          data-item
        >
          <div class="relative mb-3 py-[40px] border-b border-solid border-secondary">
            <div class="mb-0">
              <div
                class="relative flex justify-between items-center py-8 uppercase text-left transition-all ease-in cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-secondary"
                @click="toggleFAQ(idx)"
              >
                <span class="pr-80"> {{ item.title_faq }}</span>
                <img
                  ref="minusSign-{idx}"
                  src="/public/img/minus.svg"
                  class="minusSign absolute right-0 ml-80 "
                  :class="{'hidden': activeIndex !== idx, 'block': activeIndex === idx}"
                >
                <img
                  ref="plusSign"
                  src="/public/img/plus.svg"
                  class="plusSign absolute right-0 ml-80"
                  :class="{'block': activeIndex !== idx, 'hidden': activeIndex === idx}"
                >
              </div>
            </div>
            <div
              class="text-secondary transition-all duration-300 ease-in-out overflow-hidden"
              :class="{ 'max-h-0': activeIndex !== idx, 'max-h-96': activeIndex === idx }"
            >
              <div class="p-4 text-sm leading-normal text-blue-gray-500">
                <PrismicRichText
                  class="faqResponse"
                  :field="item.description_faq"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
