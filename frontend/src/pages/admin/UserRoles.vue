<script setup>

import { ref } from "vue"


import {
  AppTable,
  AppBadge,
  AppSelect
} from "@/components/ui"




const users = ref([

{
 id:1,
 name:"Ahmed Ben Ali",
 email:"ahmed@gmail.com",
 role:"Admin"
},


{
 id:2,
 name:"Sarra Trabelsi",
 email:"sarra@gmail.com",
 role:"RH"
},


{
 id:3,
 name:"Mohamed Ali",
 email:"mohamed@gmail.com",
 role:"Encadreur"
},


{
 id:4,
 name:"Asma Chaouat",
 email:"asma@gmail.com",
 role:"Stagiaire"
}

])





const roles = ref([

"Admin",

"RH",

"Encadreur",

"Stagiaire"

])






const columns = [

{
 label:"Utilisateur",
 key:"name"
},


{
 label:"Email",
 key:"email"
},


{
 label:"Rôle actuel",
 key:"role"
},


{
 label:"Modifier",
 key:"change"
}

]






function changeRole(user,newRole){


user.role = newRole


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

Association utilisateurs - rôles

</h1>







<AppTable

:columns="columns"

:rows="users"

>





<!-- Badge rôle -->


<template #role="{row}">


<AppBadge

type="info"

:text="row.role"

/>


</template>







<!-- Modification rôle -->


<template #change="{row}">


<AppSelect

:model-value="row.role"

:options="roles"

@update:model-value="changeRole(row,$event)"

/>


</template>





</AppTable>







</div>


</template>