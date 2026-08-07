<script setup>

import { ref } from "vue"
import RoleForm from '@/components/admin/RoleForm.vue'

import {
  AppTable,
  AppButton,
  AppBadge,
  AppModal,
  AppInput
} from "@/components/ui"



const roles = ref([

{
 id:1,
 name:"Admin",
 description:"Gestion complète du système",
 permissions:[
   "Utilisateurs",
   "Rôles",
   "Paramètres"
 ]
},


{
 id:2,
 name:"RH",
 description:"Gestion des stagiaires et présences",
 permissions:[
   "Stagiaires",
   "Présences"
 ]
},


{
 id:3,
 name:"Encadreur",
 description:"Suivi des stagiaires",
 permissions:[
   "Tâches",
   "Rapports"
 ]
},


{
 id:4,
 name:"Stagiaire",
 description:"Accès personnel",
 permissions:[
   "Profil",
   "Tâches"
 ]
}

])




// Modal

const showModal = ref(false)

const isEdit = ref(false)



const form = ref({

id:null,

name:"",

description:""

})




// Colonnes tableau

const columns = [

{
label:"Nom",
key:"name"
},

{
label:"Description",
key:"description"
},

{
label:"Permissions",
key:"permissions"
},

{
label:"Actions",
key:"actions"
}

]





function addRole(){


isEdit.value=false


form.value={

id:null,

name:"",

description:""

}


showModal.value=true


}





function editRole(role){


isEdit.value=true


form.value={

id:role.id,

name:role.name,

description:role.description

}


showModal.value=true


}





function saveRole(){



if(isEdit.value){


const index =
roles.value.findIndex(

r=>r.id===form.value.id

)



roles.value[index].name =
form.value.name


roles.value[index].description =
form.value.description



}


else{


roles.value.push({

id:Date.now(),

name:form.value.name,

description:form.value.description,

permissions:[]

})


}



showModal.value=false


}




</script>




<template>


<div>




<!-- HEADER -->


<div

class="
flex
justify-between
items-center
mb-8
"

>


<div>


<h1 class="text-3xl font-bold text-slate-800">

Gestion des rôles

</h1>


<p class="text-gray-500">

Administration des permissions utilisateurs

</p>


</div>




<AppButton

@click="addRole"

>

+ Ajouter un rôle

</AppButton>



</div>








<!-- TABLE -->


<AppTable

:columns="columns"

:rows="roles"

>




<!-- Permissions -->


<template #permissions="{row}">


<div class="flex flex-wrap gap-2">


<AppBadge

v-for="permission in row.permissions"

:key="permission"

type="info"

:text="permission"

/>


</div>


</template>






<!-- Actions -->


<template #actions="{row}">


<AppButton

size="sm"

@click="editRole(row)"

>

Modifier

</AppButton>



</template>




</AppTable>









<!-- MODAL -->


<AppModal

v-model="showModal"

>


<h2

class="
text-2xl
font-bold
mb-5
"

>


{{

isEdit

?

"Modifier rôle"

:

"Ajouter rôle"

}}


</h2>






<AppInput

v-model="form.name"

label="Nom du rôle"

placeholder="Nom"

/>






<AppInput

v-model="form.description"

label="Description"

placeholder="Description"

/>







<div

class="
flex
justify-end
gap-3
mt-6
"

>


<AppButton

@click="showModal=false"

>

Annuler

</AppButton>




<AppButton

@click="saveRole"

>

Enregistrer

</AppButton>



</div>



</AppModal>







</div>


</template>