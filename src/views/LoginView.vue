<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">Library Registration Form</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" @blur="() => validateName(true)"
                                @input="() => validateName(false)" v-model="FormData.username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>

                        <div class="col-md-6 col-sm-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password"
                                @blur="() => validatePassword(true)" @input="() => validatePassword(false)"
                                v-model="FormData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { useUserAuthStore } from '@/stores/UserAuthStore';
import { useUserDetailsStore } from '@/stores/UserDetailsStore';
import { ref } from 'vue';


const FormData = ref({
    username: '',
    password: ''
});

const submittedCards = ref([]);
const userAuth = useUserAuthStore();
const userDetails = useUserDetailsStore();

const submitForm = () => {
    validateName(true);
    validatePassword(true);
    console.log('abccccccccc')
    if (!errors.value.username && !errors.value.password) {
        if (!errors.value.username && !errors.value.password) {
            for (let i = 0; i < userDetails.getAllUsers.length; i++) {
                console.log('in loginnnnn')
                if (userDetails.getAllUsers[i].userEmail === FormData.value.username) {
                    console.log('email id is matched')
                    if (userDetails.getAllUsers[i].userPassword === FormData.value.password) {
                        console.log('aaajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                        // console.log(userAuth)
                        console.log(userAuth.isUserLoggedIn)
                        userAuth.loginUser({
                            isLoggedIn: true,
                            authLevel: userDetails.getAllUsers[i].userRole
                        })
                        console.log(userAuth.isUserLoggedIn)
                        console.log(userAuth.authenticationLevel)
                        console.log('User Details:', userDetails.getAllUsers[i])
                        router.push('/about')
                    }
                    else {
                        alert("Wrong Credentials. Please recheck credentials")
                    }
                }
            }
        }
    }
};



const errors = ref({
    username: null,
    password: null
})

const validateName = (blur) => {
    if (FormData.value.username !== 'abc') {
        if (blur) errors.value.username = "Name must be at least 3 characters";
    }
    else {
        errors.value.username = null;
    }
};

const validatePassword = (blur) => {
    const password = FormData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password < minLength) {
        if (blur) errors.value.password = 'Password must be atleast 8 characters long.';
    }
    else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter";
    } else if (!hasLowerCase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character";
    }
    else {
        errors.value.password = null;
    }
};


</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}

.list-group-item {
    padding: 10px;
}
</style>