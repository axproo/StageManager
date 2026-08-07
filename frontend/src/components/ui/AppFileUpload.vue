<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Importer un fichier',
  },

  accept: {
    type: String,
    default: '*',
  },

  multiple: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change'])

const handleFile = (event) => {
  const files = event.target.files

  if (props.multiple) {
    emit('change', Array.from(files))
  } else {
    emit('change', files[0])
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Label -->

    <label class="block mb-2 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Upload Zone -->

    <label
      class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition"
      :class="{
        'opacity-50 cursor-not-allowed': disabled,
      }"
    >
      <div class="text-3xl mb-2">📁</div>

      <p class="text-sm text-gray-500">Cliquez pour choisir un fichier</p>

      <input
        type="file"
        class="hidden"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleFile"
      />
    </label>
  </div>
</template>
