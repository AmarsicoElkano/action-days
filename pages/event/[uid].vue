<script setup>
import { components } from "~/slices";
const { client } = usePrismic();
const route = useRoute();

//GET ALL EVENTS

const slug = route.params.uid;
console.log("slug", slug);

const { data: page } = useAsyncData(`[slug]`, () => 
  client.getByUID("page", slug)
);
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
          const subtitles = gsap.utils.toArray("[data-subtitle]", el);
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

          if (subtitles) {
            subtitles.forEach((title, index) => {
							const duration = parseInt(title.dataset.duration) || 1.25;
							const scrub = false || title.dataset.scrub;

							const split = new SplitText(title, {
								type: "lines, words",
								linesClass: "overflow-hidden",
							});

							gsap.fromTo(split.words, duration,
              {
                opacity: 0
              },  
              {
								ease: "expo.out",
                opacity: 1,
                delay: 0.5,
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
  <div>
    <!-- hero -->
    <section
      :ref="setRef"
      class="relative w-screen h-screen"
      data-nav="light"
      data-section="overview"
    >
      <PrismicImage
        v-if="page?.data.hero_image"
        :field="page?.data.hero_image"
        class="absolute top-0 z-0 w-full h-full object-cover"
      />
      <div class="absolute left-[16px] md:left-[0] bottom-[32px] md:bottom-0 md:relative text-secondary md:pt-[150px]">
        <p
          data-subtitle
          class="md:pl-[170px] text-detail"
        >
          {{ page?.data.label_event }}
        </p>
        <h1
          data-title
          class="text-headline_small_mb md:text-headline uppercase md:pl-[120px]"
        >
          {{ page?.data.title_one }}
        </h1>
        <h1
          data-title
          class="text-headline_small_mb md:text-headline uppercase pl-[60px] md:pl-[210px]"
        >
          {{ page?.data.title_two }}
        </h1>
        <h1
          v-if="page?.data.title_three"
          data-title
          class="text-headline_small_mb md:text-headline uppercase pl-[30px] md:pl-[170px]"
        >
          {{ page?.data.title_three }}
        </h1>
      </div>
    </section>

    <!-- secondary navigation -->
    <SecondaryNavigationEvents />

    <!-- info -->
    <section
      id="overview"
      :ref="setRef"
      data-nav="light"
      data-section="overview"
      class="bg-primary py-[80px] px-[16px] md:px-[120px] text-secondary"
    >
      <div class="flex flex-col md:flex-row justify-between w-full pb-[40px] md:pb-[80px]">
        <div class="md:w-[30%] flex flex-col gap-[40px]">
          <div data-text>
            <p class="uppercase font-bold mb-[14px]">
              Agency
            </p>
            <p class="text-sm uppercase">
              {{ page?.data.agency }}
            </p>
          </div>
          <div data-text>
            <p class="uppercase font-bold mb-[14px]">
              Focal Point
            </p>
            <PrismicRichText
              class="text-sm uppercase"
              :field="page?.data.focal_point"
            />
          </div>
          <div data-text>
            <p class="uppercase font-bold mb-[14px]">
              Where
            </p>
            <p class="text-sm uppercase">
              {{ page?.data.location }}
            </p>
          </div>
          <div data-text>
            <p class="uppercase font-bold mb-[14px]">
              When
            </p>
            <p class="text-sm uppercase">
              {{ page?.data.date }}
            </p>
          </div>
        </div>
        <div class="md:w-[70%] max-w-[750px]">
          <p class="pt-80">
            <PrismicRichText
              data-text
              :field="page?.data.overview_primary_text"
            />
          </p>
        </div>
      </div>
      <div>
        <div
          class="md:ml-[50%] md:max-w-[545px] md:w-[50%]"
          data-text
        >
          <PrismicRichText
            :field="page?.data.overview_secondary_text"
            class="pb-[54px]"
          />
          <button class="text-xsm h-[40px] border border-[var(--burger-color)] rounded-full uppercase text-white text-sm pl-30 pr-30">
            Register to the event
          </button>
        </div>
      </div>
    </section>

    <SliceZone
      wrapper="main"
      :slices="page?.data.slices ?? []"
      :components="components"
    />
  </div>
</template>