export const getProducts = (req, res) => {
    res.json({
        message: "Products fetched successfully"
    });
};

export const getProductbyId = (req, res) => {
    const { id } = req.params;
    res.json({
        message: `Product with ID ${id} fetched successfully`
    });
};