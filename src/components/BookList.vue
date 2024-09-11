<template>
    <div>
        <h1>Books with ISBN > 1000</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
            </li>
        </ul>
    </div>

    <div>
        <h1>All Books</h1>
        <ul>
            <li v-for="book in allBooks" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init'
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

export default {
    setup() {
        const books = ref([]);
        const allBooks = ref([]);

        const fetchAllBooks = async () => {
            try {
                const q = collection(db, 'books');
                const querySnapshot = await getDocs(collection(db, "books"));
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.id)
                    console.log(doc.data())
                    booksArray.push({ id: doc.id, ...doc.data() });
                    // console.log(booksArray)
                });
                console.log(booksArray)
                console.log(allBooks.value)
                allBooks.value = booksArray;
                console.log(allBooks.value)

            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        const fetchBooks = async () => {
            try {
                const q = query(collection(db, 'books'), where('isbn', '>', 1000));
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                });

                books.value = booksArray;

            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        onMounted(() => {
            fetchBooks();
            fetchAllBooks();
        });

        return {
            books, allBooks
        };
    }
};
</script>