<script>
import axios from 'axios';
export default {
    name: 'add-user',
    data() {
        return {
            user: {
                fname: "",
                lname: "",
                gender: ""
            },
            formSubmitted: false
        };
    },
    mounted(){
        this.getDetails(this.$route.params.id)
    },
    methods: {
        getDetails: function(id){
            axios.get(`http://localhost:80/${id}`)
             .then(response => this.user = response.data)
                .catch(error => {
                    this.errorMessage = error.message;
                    console.error("There was an error!", error);
                });
        },
        submitForm: function () {
            
            axios.put("http://localhost:80/edit", this.user)
                .then(response =>
                { this.user = response.data;
                    this.formSubmitted = true})
                .catch(error => {
                    this.errorMessage = error.message;
                    this.formSubmitted = false;
                    console.error("There was an error!", error);
                });
        }
    },
};

</script>

<template>
    <div class="card mt-5 mx-auto " style="width: 18rem;">
        <form @submit.prevent="submitForm" v-if="!formSubmitted" class="card-body text-center">
            <div class="mt-2">First Name
            <input v-model="user.fname" type="text" placeholder="Enter your first name" /><br></div>
            <div class="mt-2">Last Name
            <input v-model="user.lname" type="text" placeholder="Enter your last name" /></div><br>
            <!-- <span>Gender</span><br> -->
            <!-- <input type="radio" v-model="gender" value="Male" />
                    <label>Male</label>
                    <input type="radio" v-model="gender" value="Female" />
                    <label>Female</label><br> -->
            <input class="btn btn-primary " type="submit" value="Submit">
        </form>
        <div v-if="formSubmitted">
           Successfully Edited
        </div>
    </div>
</template>