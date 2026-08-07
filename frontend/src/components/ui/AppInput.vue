<script setup lang="ts">

const model = defineModel()

defineProps({

  label: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  placeholder: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  required: {
    type: Boolean,
    default: false,
  },

  variant: {
    type: String,
    default: 'default',
  },


  // Nouveau : état erreur

  error: {
    type: Boolean,
    default: false,
  },


  // Nouveau : état valide

  success: {
    type: Boolean,
    default: false,
  },


  // Nouveau : message erreur

  errorMessage: {
    type: String,
    default: '',
  },


})


</script>

<template>

<div class="w-full">

<!-- Label -->

<label
v-if="label"
class="block mb-2 text-sm font-medium"
:class="
variant === 'glass'
? 'text-white'
: 'text-gray-700'
"

>

{{ label }}

</label>

<div class="relative">

<!-- Input -->

<input

v-model="model"

:type="type"

:placeholder="placeholder"

:disabled="disabled"

:required="required"

class="
w-full
px-4
py-3
rounded-xl
outline-none
transition
pr-10
"

:class="[

/* Mode glass */

variant === 'glass'

?

`bg-white/10
text-white
placeholder:text-white/60
backdrop-blur-md
focus:ring-2
focus:ring-cyan-300`

:

`bg-white
text-gray-900
placeholder:text-gray-400
focus:ring-2
focus:ring-blue-500`,

/* Etats validation */

error

?

'border-2 border-red-500 focus:ring-red-400'

:

success

?

'border-2 border-green-500 focus:ring-green-400'

:

variant === 'glass'

?

'border border-cyan-300/40'

:

'border border-gray-300',

disabled

?

'cursor-not-allowed opacity-60'

:

''

]"

/>

<!-- Icône succès -->

<span

v-if="success"

class="
absolute
right-3
top-1/2
-translate-y-1/2
text-green-400
font-bold
"

>

✔

</span>

</div>

<!-- Message erreur -->

<p

v-if="error && errorMessage"

class="
mt-1
text-sm
text-red-400
"

>

{{ errorMessage }}

</p>

</div>

</template>
