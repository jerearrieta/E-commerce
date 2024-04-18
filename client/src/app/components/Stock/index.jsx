"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import InventoryIcon from "@mui/icons-material/Inventory";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./stock.module.css";

const Stock = () => {
  const [stockOpen, setStockOpen] = useState(false);
  const [stockDb, setStockDb] = useState([]);
  const [editId, setEditId] = useState("");
  const [editNombre, setEditNombre] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editPrecio, setEditPrecio] = useState("");

  useEffect(() => {
    const getStock = async () => {
      try {
        const response = await axios.get("http://localhost:3001/productos");
        response.data.sort((a, b) => a.id - b.id);
        setStockDb(response.data);
      } catch (error) {
        console.error("Error al obtener el stock", error);
      }
    };
    getStock();
  }, []); 

  const handleEditClick = (id, nombre, amount, precio) => {
    setEditId(id);
    setEditNombre(nombre);
    setEditAmount(amount);
    setEditPrecio(precio);
  };

  const handleCancelClick = () => {
    setEditId("");
    setEditNombre("");
    setEditAmount("");
    setEditPrecio("");
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.put("http://localhost:3001/productos", {
        id,
        nombre: editNombre,
        amount: editAmount,
        precio: editPrecio,
      });
      
      setEditId("");
      setEditNombre("");
      setEditAmount("");
      setEditPrecio("");

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          setStockOpen(!stockOpen);
        }}
        className="cursor-pointer"
        style={{ position: "absolute", top: "33%", left: "5%" }}
      >
        <div className="fixed">
          {!stockOpen ? (
            <InventoryIcon sx={{ fontSize: 60 }} />
          ) : (
            <Inventory2OutlinedIcon sx={{ fontSize: 60 }} />
          )}
        </div>
      </div>

      {stockOpen && (
        <div
          className={styles.stock}
          style={{
            position: "fixed",
            top: "39%",
            left: "5%",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="mx-2 font-bold mt-5 mb-3 ml-4">Stock</h2>
          </div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 300, background: "black" }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Producto</TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    Precio
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    Cantidad
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockDb.map((stock, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{ color: "white" }}
                      component="th"
                      scope="row"
                    >
                      {editId === stock.id ? (
                        <input
                          className="text-black w-28"
                          value={editNombre}
                          onChange={(e) => setEditNombre(e.target.value)}
                        />
                      ) : (
                        stock.nombre
                      )}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      {editId === stock.id ? (
                        <input
                          className="text-black w-28"
                          value={editPrecio}
                          onChange={(e) => setEditPrecio(e.target.value)}
                        />
                      ) : (
                        stock.precio
                      )}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      {editId === stock.id ? (
                        <input
                          className="text-black w-28"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                        />
                      ) : (
                        stock.amount
                      )}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      {editId === stock.id ? (
                        <>
                          <CheckCircleIcon
                            onClick={() =>
                              handleSaveClick(
                                stock.id,
                                stock.nombre,
                                stock.amount,
                                stock.precio
                              )
                            }
                            className="cursor-pointer"
                          />
                          <CancelIcon
                            onClick={() =>
                              handleCancelClick(
                                stock.id,
                                stock.nombre,
                                stock.amount,
                                stock.precio
                              )
                            }
                            className="cursor-pointer"
                          />
                        </>
                      ) : (
                        <EditIcon
                          onClick={() =>
                            handleEditClick(
                              stock.id,
                              stock.nombre,
                              stock.amount,
                              stock.precio
                            )
                          }
                          className="cursor-pointer"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Stock;
