<template>
    <pre>{{ jsondata }}</pre>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init'
import { collection, getDocs } from 'firebase/firestore';


export default {
    setup() {
        const jsondata = ref({});

        const fetchAllBooks = async () => {
            try {
                const q = collection(db, 'books');
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                console.log(querySnapshot)

                querySnapshot.forEach((doc) => {
                    booksArray.push({  ...doc.data() });
                });
                jsondata.value = { books: booksArray }

            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        onMounted(() => {
            fetchAllBooks();
        });

        return {
            jsondata
        };
    }
};
</script>