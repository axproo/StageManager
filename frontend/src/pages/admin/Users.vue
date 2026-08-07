<script setup>

import { ref, computed } from "vue"


import {
  AppButton,
  AppTable,
  AppModal,
  AppBadge,
  AppInput,
  AppSelect
} from "@/components/ui"



// Modal

const showModal = ref(false)

const isEdit = ref(false)



// Recherche

const search = ref("")



// Pagination

const currentPage = ref(1)

const itemsPerPage = 5



// Formulaire

const form = ref({

id:null,

name:"",

email:"",

password:"",

role:"",

department:""

})




// Utilisateurs

const users = ref([


{
id:1,
name:"Christian Djomou",
email:"christian@axproo.com",
role:"Directeur",
department:"Cyber Sécurité"
},


{
id:2,
name:"Hajer Djomou",
email:"hajer@axproo.com",
role:"Responsable RH",
department:"Ressources Humaines"
}


])





// Colonnes tableau

const columns = [

{
label:"Nom",
key:"name"
},

{
label:"Email",
key:"email"
},

{
label:"Rôle",
key:"role"
},

{
label:"Département",
key:"department"
},

{
label:"Actions",
key:"actions"
}

]





// Recherche

const filteredUsers = computed(()=>{


return users.value.filter(user =>

user.name
.toLowerCase()
.includes(search.value.toLowerCase())

)


})





// Pagination

const paginatedUsers = computed(()=>{


const start =
(currentPage.value - 1)
*
itemsPerPage


return filteredUsers.value.slice(

start,

start + itemsPerPage

)


})





const totalPages = computed(()=>{


return Math.ceil(

filteredUsers.value.length / itemsPerPage

)


})





function openAdd(){


isEdit.value=false


form.value={

id:null,

name:"",

email:"",

password:"",

role:"",

department:""

}


showModal.value=true


}




function editUser(user){


isEdit.value=true


form.value={

...user,

password:""

}


showModal.value=true


}




function saveUser(){


if(

!form.value.name ||

!form.value.email ||

!form.value.role ||

!form.value.department

){

return

}





if(isEdit.value){


const index =
users.value.findIndex(

u=>u.id===form.value.id

)


users.value[index]={

...form.value

}


}

else{


users.value.push({

id:Date.now(),

name:form.value.name,

email:form.value.email,

role:form.value.role,

department:form.value.department

})


}



showModal.value=false


}





function deleteUser(id){


users.value =

users.value.filter(

u=>u.id!==id

)


}



</script>




<template>


<div>



<!-- HEADER -->


<div class="flex justify-between items-center mb-8">


<div>

<h1 class="text-3xl font-bold text-gray-800">

Gestion des utilisateurs

</h1>


<p class="text-gray-500">

Administration des comptes AXPROO

</p>


</div>



<AppButton

@click="openAdd"

>

+ Ajouter utilisateur

</AppButton>



</div>






<!-- Recherche -->


<AppInput

v-model="search"

placeholder="Rechercher..."

class="mb-5 md:w-96"

/>






<!-- TABLE -->


<AppTable

:columns="columns"

:rows="paginatedUsers"

>


<template #role="{row}">


<AppBadge

type="info"

:text="row.role"

/>


</template>




<template #actions="{row}">


<AppButton

size="sm"

@click="editUser(row)"

>

Modifier

</AppButton>



<AppButton

size="sm"

@click="deleteUser(row.id)"

>

Supprimer

</AppButton>



</template>



</AppTable>







<!-- Pagination -->


<div class="flex justify-center gap-3 mt-6">


<button

v-for="page in totalPages"

:key="page"

@click="currentPage=page"

class="
px-4
py-2
rounded-lg
bg-gray-200
"

>

{{page}}

</button>


</div>









<!-- MODAL -->


<AppModal

v-model="showModal"

>


<h2 class="text-2xl font-bold mb-5">


{{

isEdit

?

"Modifier utilisateur"

:

"Ajouter utilisateur"

}}


</h2>





<AppInput

v-model="form.name"

label="Nom"

placeholder="Nom"

/>



<AppInput

v-model="form.email"

label="Email"

placeholder="Email"

/>



<AppInput

v-model="form.password"

label="Mot de passe"

type="password"

placeholder="Mot de passe"

/>





<AppSelect

v-model="form.role"

label="Rôle"

:options="[

'Administrateur',

'Responsable RH',

'Encadreur'

]"

/>





<AppSelect

v-model="form.department"

label="Département"

:options="[

'Informatique',

'Cyber Sécurité'

]"

/>






<div class="flex justify-end gap-3 mt-5">


<AppButton

@click="showModal=false"

>

Annuler

</AppButton>



<AppButton

@click="saveUser"

>

Enregistrer

</AppButton>


</div>



</AppModal>





</div>


</template>