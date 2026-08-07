<script setup>

import { ref } from "vue"


import {
  AppCard,
  AppCheckbox
} from "@/components/ui"




const permissions = ref([

"Gestion utilisateurs",

"Gestion rôles",

"Gestion stagiaires",

"Gestion présences",

"Gestion rapports",

"Gestion départements",

"Gestion tâches"

])





const roles = ref([

{
 id:1,
 name:"Admin",
 permissions:[
   "Gestion utilisateurs",
   "Gestion rôles",
   "Gestion stagiaires",
   "Gestion présences",
   "Gestion rapports"
 ]
},


{
 id:2,
 name:"RH",
 permissions:[
   "Gestion stagiaires",
   "Gestion présences"
 ]
},


{
 id:3,
 name:"Encadreur",
 permissions:[
   "Gestion tâches",
   "Gestion rapports"
 ]
},


{
 id:4,
 name:"Stagiaire",
 permissions:[
   "Gestion tâches"
 ]
}

])





function togglePermission(role, permission){


const index = role.permissions.indexOf(permission)



if(index === -1){

role.permissions.push(permission)

}

else{

role.permissions.splice(index,1)

}


}



</script>





<template>


<div>




<h1

class="
text-3xl
font-bold
text-slate-800
mb-8
"

>

Gestion des permissions

</h1>







<div

v-for="role in roles"

:key="role.id"

class="mb-6"

>




<AppCard>



<h2

class="
text-xl
font-bold
mb-5
text-blue-700
"

>

{{ role.name }}

</h2>







<div

class="
grid
grid-cols-1
md:grid-cols-2
gap-4
"

>




<AppCheckbox

v-for="permission in permissions"

:key="permission"

:label="permission"

:model-value="role.permissions.includes(permission)"

@update:model-value="togglePermission(role, permission)"

/>





</div>






</AppCard>






</div>





</div>


</template>