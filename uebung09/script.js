new Vue({
    el: '#app',
    data: {
        // Liste der Produkte
        products: [
            { id: 1, name: 'Hemd', artikelnummer: 10, image: './images/hemd.jpg', price: 15.99 },
            { id: 2, name: 'Hose', artikelnummer: 20, image: './images/hose.jpg', price: 29.99 },
            { id: 3, name: 'Tasche', artikelnummer: 30 , image: './images/tasche.jpg', price: 49.99 }
        ],
        newProduct: { name: '', artikelnummer: '', image: '', price: 0 },
        editProductData: null, // Das Produkt, das bearbeitet wird
        search: '',
        errorMessage: '',
        editErrorMessage: '',
        showEditForm: false // Steuerung der Anzeige des Editierformulars
    },
    computed: {
        filteredProducts() {
            const search = this.search.trim().toLowerCase();//groß- kleinschreibung ignorieren
            return this.products.filter(product => {
                const name = product.name.toLowerCase();
                const artikelnummer = product.artikelnummer.toString();
                const priceString = product.price.toString();
                return name.includes(search) || artikelnummer.includes(search) || priceString.includes(search);
            });
        }
    },
    methods: {
        addProduct() {
            if (this.newProduct.price <= 0) {
                this.errorMessage = 'Der Preis muss größer als 0 sein.';
                return;
            }
            const newProduct = { ...this.newProduct, id: Date.now() };
            this.products.push(newProduct);
            this.newProduct = { name: '', artikelnummer: '', image: '', price: 0 }; //Eingabe maske zurücksetzen
            this.errorMessage = '';
        },
        deleteProduct(product) {
            this.products = this.products.filter(p => p.id !== product.id);
        },
        editProduct(product) {
            this.editProductData = { ...product }; // Kopie des Produkts erstellen
            this.showEditForm = true; // Formular anzeigen
        },
        updateProduct() {
            if (this.editProductData.price <= 0) {
                this.editErrorMessage = 'Der Preis muss größer als 0 sein.';
                return;
            }
            // Produkt in der Liste aktualisieren
            const index = this.products.findIndex(p => p.id === this.editProductData.id);
            if (index !== -1) { //produkt gefunden
                //splie: Array-Methode, die Elemente in einem Array hinzufügt, entfernt oder ersetzt.
                //array.splice(startIndex, deleteCount, ...newItems);
                this.products.splice(index, 1, { ...this.editProductData });
            }
            this.editProductData = null; // Zurücksetzen
            this.editErrorMessage = '';
            this.showEditForm = false; // Formular schließen
        },
        cancelEdit() {
            this.editProductData = null;
            this.showEditForm = false;
        }
    }
});