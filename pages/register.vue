<script setup lang="ts">
const prismic = usePrismic();

import { components } from '~/slices';

//GET Registration page
const { data: register } = useAsyncData("[registration_page]", () =>
  prismic.client.getSingle("registration_page"),
);

useHead({
  title: register.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: register.value?.data.meta_description,
    },
  ],
});
</script>


<template>
  {{ register }}
</template>