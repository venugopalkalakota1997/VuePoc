<script>
import axios from 'axios';
export default {
    name: 'get-users',
    data() {
        return {
            user: {
                fname: "",
                lname: "",
                gender: ""
            },
            items: null,
            modal: null,
            respose: '',
            showModal: false
        }
    },

    mounted() {
        axios
            .get('http://localhost:80/all')
            .then(response => (this.items = response.data))
    },
    methods: {
        edituser() {
            this.modalOpen = !this.modalOpen;
        },
        deleteuser(id) {
            axios.delete(`http://localhost:80/delete/${id}`).then(response => (
                this.respose = response.data,
                axios
                    .get('http://localhost:80/all')
                    .then(response => (this.items = response.data))
            ))
        }
    }
}
</script>
<template>
    <div id="app">
        <h1 class="text-center">User List</h1>
        <div class="row mx-auto">
            <div class="col-sm-4" v-for="(item, index) in items" :key="index">
                <div class="card mt-5">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.fname }} {{ item.lname }}</h5>
                    </div>
                    <div class="card-footer text-center">
                        <RouterLink :to="{ path: '/edit/' + item.id }" class="btn btn-primary float-start" @click="edituser()">Edit
                        </RouterLink> &nbsp;
                        <button class="btn btn-danger float-end" @click="deleteuser(item.id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

        <!-- <table class="table table-bordered mt-5 w-75 mx-auto"  >
            <thead class="thead-dark">
                <tr class="row">
                <th class="col">S no</th>
                <th class="col">First Name</th>
                <th class="col">Last name</th>
                <th class="col">Action</th></tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index" class="row">
                    <td class="col">{{ index + 1 }}</td>
                    <td class="col">{{ item.fname }}</td>
                    <td class="col">{{ item.lname }}</td>
                    <td class="col"><RouterLink :to="{path: '/edit/'+item.id}" class="btn btn-primary" @click="edituser()">Edit</RouterLink>   &nbsp; 
                    <button class="btn btn-danger" @click="deleteuser(item.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    -->