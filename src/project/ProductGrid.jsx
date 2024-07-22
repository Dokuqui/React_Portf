import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import productsData from "./products.json";
// import { v4 as uuidv4 } from 'uuid';

const initialProducts =
  JSON.parse(localStorage.getItem("products")) || productsData;

const ProductGrid = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editProduct, setEditProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsDialogOpen(true);
    setIsNewProduct(false);
  };

  const handleSave = () => {
    if (
      editProduct.reference.trim() === "" ||
      editProduct.price < 0 ||
      products.some(
        (product) =>
          product.reference === editProduct.reference &&
          product.id !== editProduct.id
      )
    ) {
      alert(
        "Invalid input! Ensure reference is unique and price is non-negative."
      );
      return;
    }
    const updatedProducts = products.map((product) =>
      product.id === editProduct.id ? editProduct : product
    );
    setProducts(updatedProducts);
    setIsDialogOpen(false);
  };

  const handleAddClick = () => {
    const nextId = Math.max(...products.map((p) => p.id)) + 1;
    setEditProduct({
      id: nextId,
      name: "",
      reference: "",
      price: 0.0,
      rating: 0,
    });
    setIsDialogOpen(true);
    setIsNewProduct(true);
  };

  const handleAddNew = () => {
    if (
      editProduct.reference.trim() === "" ||
      editProduct.price < 0 ||
      products.some((product) => product.reference === editProduct.reference)
    ) {
      alert(
        "Invalid input! Ensure reference is unique and price is non-negative."
      );
      return;
    }
    setProducts([...products, editProduct]);
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setEditProduct({ ...editProduct, [name]: parseFloat(value).toFixed(2) });
    } else {
      setEditProduct({ ...editProduct, [name]: value });
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerAlign: "center",
      headerClassName: "data-grid--header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      editable: true,
      headerAlign: "center",
      headerClassName: "data-grid--header",
    },
    {
      field: "reference",
      headerName: "Reference",
      width: 200,
      editable: true,
      headerAlign: "center",
      headerClassName: "data-grid--header",
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
      headerAlign: "center",
      type: "number",
      headerClassName: "data-grid--header",
      renderCell: (params) => {
        const value = Number(params.value);
        return isNaN(value) ? "€0.00" : `€${value.toFixed(2)}`;
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 250,
      headerAlign: "center",
      headerClassName: "data-grid--header",
      renderCell: (params) => (
        <Box>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              color={index < params.value ? "primary" : "disabled"}
            />
          ))}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      headerClassName: "data-grid--header",
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleResetLocalStorage = () => {
    localStorage.removeItem("products");
    setProducts(productsData);
  };

  return (
    <Box marginTop="20px">
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Product
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleResetLocalStorage}
          style={{ marginLeft: "10px" }}
        >
          Reset Local Storage
        </Button>
      </Box>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        autoHeight
        sx={{
          boxShadow: 2,
          border: 1,
          borderColor: "#ddd",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center",
          },
        }}
      />
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          {editProduct?.id && !isNewProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editProduct?.name || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="reference"
            label="Reference"
            type="text"
            fullWidth
            value={editProduct?.reference || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price (€)"
            type="number"
            fullWidth
            value={editProduct?.price || "0.00"}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="rating"
            label="Rating"
            type="number"
            fullWidth
            value={editProduct?.rating || 0}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={isNewProduct ? handleAddNew : handleSave}
            startIcon={<SaveIcon />}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductGrid;
