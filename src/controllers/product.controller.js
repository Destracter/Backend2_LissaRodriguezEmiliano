import { ProductRepository } from '../repositories/product.repository.js';
import { ProductDTO } from '../dtos/product.dto.js';

const productRepo = new ProductRepository();

export const getProducts = async (req, res) => {
  const products = await productRepo.findAll();
  res.json(products.map(p => new ProductDTO(p)));
};

export const createProduct = async (req, res) => {
  const product = await productRepo.create(req.body);
  res.status(201).json(new ProductDTO(product));
};

export const updateProduct = async (req, res) => {
  const product = await productRepo.update(req.params.id, req.body);
  res.json(new ProductDTO(product));
};

export const deleteProduct = async (req, res) => {
  await productRepo.delete(req.params.id);
  res.json({ message: 'Producto eliminado' });
};