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
      gsap.registerPlugin(ScrollTrigger, SplitText,);

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

        })
      }
    },
	};
</script>

<template>
  <section
    id="agenda"
    :ref="setRef"
    class="bg-secondary text-primary pt-[200px] pb-[0px] md:py-[200px] px-[16px] md:px-[60px]"
    data-section="agenda"
    data-nav="dark"
  >
    <div class="w-full flex flex-col md:flex-row gap-[40px] md:gap-[60px]">
      <h2
        data-title
        class="w-full md:w-2/3 text-titleSection_mb md:text-titleSection uppercase"
      >
        {{ slice.primary.title }}
      </h2>
      <PrismicRichText
        class="w-full md:w-1/3 md:self-end"
        data-text
        :field="slice.primary.content"
      />
    </div>
  </section>
</template>