import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
import addUser from '../components/addUser.vue'
import getUsers from '../components/getUsers.vue'
import editUser from '../components/editUser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/add',
    name: 'add',
    beforeEnter : guardMyroute,
    component:addUser
  },
  {
      path: '/all',
      name: 'getUsers',
      beforeEnter : guardMyroute,
      component:getUsers
    },
    {
      path: "/edit/:id",
      name: "edit-details",
      beforeEnter : guardMyroute,
      component: editUser
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
 console.log(localStorage.getItem('keycloakToken'))
 if(localStorage.getItem('keycloakToken') )
  isAuthenticated = true;
 else
  isAuthenticated= false;
if(isAuthenticated) {
  next(); 
 } else{
   alert("Please login first")
  next('/'); 
 }
}

export default router