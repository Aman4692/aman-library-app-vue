<template>
    <br>
    <div>
        <h1>Books with ISBN > 1000</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
            </li>
        </ul>
    </div>

    <div>
        <h1>Update/Delete Books</h1>
        <ul>
            <li v-for="book in allBooks" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="editBook(book)">Edit</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>
    </div>

    <div v-if="selectedBook">
        <h2>{{ isEditing ? 'Edit Book' : 'Add New Book' }}</h2>
        <input v-model="form.name" placeholder="Book Name" />
        <input v-model="form.isbn" type="number" placeholder="ISBN" />
        <button @click="isEditing ? updateBook() : addBook()">
            {{ isEditing ? 'Update' : 'Add' }}
        </button>
        <button @click="clearSelection">Cancel</button>
    </div>
    <br><br>

    <div>
        <h1>Fetching Data using a combination of 'where','orderBy' and 'limit' functions</h1>
        <ul>
            <li v-for="book in filteredBooks" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init'
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc, setDoc, orderBy, limit } from 'firebase/firestore';

export default {
    setup() {
        const books = ref([]);
        const allBooks = ref([]);
        const selectedBook = ref(null);
        const form = ref({ name: '', isbn: '' });
        const isEditing = ref(false);
        const filteredBooks = ref([]);

        const filterBooks = async () => {
            try {
                const q = query(collection(db, 'books'), where('isbn', '>', 5000), orderBy('isbn'), limit(2))
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                });
                filteredBooks.value = booksArray;
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        }

        const fetchAllBooks = async () => {
            try {
                const q = collection(db, 'books');
                const querySnapshot = await getDocs(q);
                const booksArray = [];

                querySnapshot.forEach((doc) => {
                    // console.log(doc.id)
                    // console.log(doc.data())
                    booksArray.push({ id: doc.id, ...doc.data() });
                    // console.log(booksArray)
                });

                // console.log(booksArray)
                // console.log(allBooks.value)
                allBooks.value = booksArray;
                // console.log(allBooks.value)

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

        const editBook = (book) => {
            selectedBook.value = book;
            form.value = { name: book.name, isbn: book.isbn };
            isEditing.value = true;
        };

        const addBook = async () => {
            try {
                const newBookRef = doc(collection(db, 'books'));
                await setDoc(newBookRef, form.value);
                await fetchAllBooks(); // Refresh the list
                clearSelection();
            } catch (error) {
                console.error('Error adding book: ', error);
            }
        };

        const updateBook = async () => {
            try {
                const bookRef = doc(db, 'books', selectedBook.value.id);
                await updateDoc(bookRef, form.value);
                await fetchAllBooks(); // Refresh the list
                clearSelection();
            } catch (error) {
                console.error('Error updating book: ', error);
            }
        };

        const deleteBook = async (id) => {
            try {
                const bookRef = doc(db, 'books', id);
                await deleteDoc(bookRef);
                await fetchAllBooks(); // Refresh the list
            } catch (error) {
                console.error('Error deleting book: ', error);
            }
        };

        const clearSelection = () => {
            selectedBook.value = null;
            form.value = { name: '', isbn: '' };
            isEditing.value = false;
        };

        onMounted(() => {
            fetchBooks();
            fetchAllBooks();
            filterBooks();
        });

        return {
            books, allBooks, selectedBook, form, isEditing, editBook, addBook, updateBook, deleteBook, clearSelection, filteredBooks
        };
    }
};
</script>