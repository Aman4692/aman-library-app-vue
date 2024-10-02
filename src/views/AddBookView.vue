<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required>
            </div>

            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required>
            </div>

            <button type="submit">Add Book</button>
        </form>
    </div>
    <div>
        <h1>Book Name in Uppercase : {{ updateName }}</h1>
    </div>

    <BookList></BookList>
</template>

<script setup>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase/init';
import BookList from '../components/BookList.vue';
import axios from 'axios';

const isbn = ref('');
const name = ref('');
var updateName = ref('');

const addBook = async () => {
    try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
            alert('ISBN must be a valid number');
            return;
        }

        const response = axios.post('https://capitalisedata-2zzotarxnq-uc.a.run.app', { text: name.value })

        console.log(await response)
        updateName.value = (await response).data.updatedText

        await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: updateName.value
        });
        isbn.value = '';
        name.value = '';
        alert('Book added successfully');
    } catch (error) {
        console.error('Error adding book', error);
    }
};
</script>