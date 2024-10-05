<template>
    <div class="conatiner mt-5">
        <h1 class="text-center">About Our Library</h1>
        <p class="text-center">Welcome to our digital library! We're dedicated to providing a vast collection of books
            and resources to our
            community.</p>

        <div class="text-center">
            <button type="submit" class="btn btn-primary me-2" @click="logout">Logout</button>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { useUserAuthStore } from '@/stores/UserAuthStore';

const userAuth = useUserAuthStore();

const logout = () => {
    userAuth.login(false)
    router.push('/login')
}
</script>

<style></style>