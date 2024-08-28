<script setup>
import Logo from "./Logo.vue";


const { client } = usePrismic();

const { data: footer } = await useAsyncData("footer", () =>
  client.getSingle("footer")
);
</script>

<template>
  <footer class="w-full bg-white text-primary text-sm">
    <div class="py-100 px-[16px] md:px-[60px]">
      <div class="flex items-center justify-between">
        <Logo />
        <div>
          <ul v-for="item in footer.data.links" class="flex flex-row justify-end mt-20">
            <li>
              <PrismicLink :field="item.linkedin">
                <figure class="w-[25px] h-[25px] flex items-center justify-center">
                  <img src="/img/linkedin.svg" />
                </figure>
              </PrismicLink>
            </li>
            <li class="ml-30">
              <PrismicLink :field="item.facebook">
                <figure class="w-[25px] h-[25px] flex items-center justify-center">
                  <img src="/img/facebook.svg" />
                </figure>
              </PrismicLink>
            </li>
            <li class="ml-30">
              <PrismicLink :field="item.twitter">
                <figure class="w-[25px] h-[25px] flex items-center justify-center">
                  <img src="/img/x.svg" />
                </figure>
              </PrismicLink>
            </li>
            <li class="ml-30">
              <PrismicLink :field="item.instagram">
                <figure class="w-[25px] h-[25px] flex items-center justify-center">
                  <img src="/img/instagram.svg" />
                </figure>
              </PrismicLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>