<template>
    <div>
        <h1>User Information / Credentials</h1>

        <form action="">
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username"><br>

            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password"><br>

            <label for="isAustralian">Australian Resident?</label><br>
            <input type="checkbox" id="isAustralian" name="isAustralian"><br>

            <label for="reason">Reason For Joining:</label><br>
            <input type="text" id="username" name="username"><br>

            <label for="gender">Gender</label><br>
            <select id="gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>
        </form>
    </div>
</template>

<script setup>

</script>

<style scoped></style>