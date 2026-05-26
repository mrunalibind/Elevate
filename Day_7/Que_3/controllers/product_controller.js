const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
];

export const getAllProducts = (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getProductById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createProduct = (req, res) => {
    try {
        const { name, price } = req.body;

        if(!name || typeof(name) !== "string" || !price || typeof(price) !== "number") {
            return res.status(400).json({ error: "Name and price are required" });
        }

        const newProduct = { id: products.length + 1, name, price };
        products.push(newProduct);
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
