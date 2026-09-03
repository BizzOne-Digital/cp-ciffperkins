const Product = require('../models/Product');
const { uploadFromBuffer, deleteAsset, hasCloudinaryConfig } = require('../config/cloudinary');

const slugify = (str) =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const resolveUploadedImage = async (file, folder) => {
  if (!file) return null;
  if (file.path) {
    return { url: file.path, publicId: file.filename };
  }
  if (file.buffer && hasCloudinaryConfig) {
    return uploadFromBuffer(file.buffer, folder);
  }
  return null;
};

// @desc  Get products (public: only active; admin: all with filters)
// @route GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { type, featured, active } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (featured !== undefined) filter.featured = featured === 'true';

    if (req.admin) {
      if (active !== undefined) filter.active = active === 'true';
    } else {
      filter.active = true;
    }

    const products = await Product.find(filter).sort({ displayOrder: 1, createdAt: -1 });

    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single product by slug or id
// @route GET /api/products/:idOrSlug
const getProductBySlugOrId = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    let product = null;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(idOrSlug);
    }
    if (!product) {
      product = await Product.findOne({ slug: idOrSlug });
    }

    if (!product || (!product.active && !req.admin)) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc  Create product
// @route POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.name || !body.type) {
      return res.status(400).json({ success: false, message: 'Name and type are required' });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.name);

    const uploadedImage = await resolveUploadedImage(req.file, 'cliff-perkins/products');
    const image = uploadedImage || (body.image ? { url: body.image, publicId: '' } : undefined);

    const product = await Product.create({
      name: body.name,
      slug,
      type: body.type,
      category: body.category,
      shortDescription: body.shortDescription,
      description: body.description,
      price: body.price,
      image,
      externalUrl: body.externalUrl,
      amazonUrl: body.amazonUrl,
      cdBabyUrl: body.cdBabyUrl,
      featured: body.featured === 'true' || body.featured === true,
      active: body.active !== undefined ? body.active === 'true' || body.active === true : true,
      displayOrder: body.displayOrder || 0,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc  Update product
// @route PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const body = req.body;

    if (body.name) product.name = body.name;
    if (body.slug) product.slug = slugify(body.slug);
    if (body.type) product.type = body.type;
    if (body.category !== undefined) product.category = body.category;
    if (body.shortDescription !== undefined) product.shortDescription = body.shortDescription;
    if (body.description !== undefined) product.description = body.description;
    if (body.price !== undefined) product.price = body.price;
    if (body.externalUrl !== undefined) product.externalUrl = body.externalUrl;
    if (body.amazonUrl !== undefined) product.amazonUrl = body.amazonUrl;
    if (body.cdBabyUrl !== undefined) product.cdBabyUrl = body.cdBabyUrl;
    if (body.featured !== undefined) product.featured = body.featured === 'true' || body.featured === true;
    if (body.active !== undefined) product.active = body.active === 'true' || body.active === true;
    if (body.displayOrder !== undefined) product.displayOrder = body.displayOrder;

    if (req.file) {
      const newImage = await resolveUploadedImage(req.file, 'cliff-perkins/products');
      if (newImage) {
        if (product.image && product.image.publicId) {
          await deleteAsset(product.image.publicId);
        }
        product.image = newImage;
      }
    } else if (body.image !== undefined && body.image !== product.image?.url) {
      if (product.image && product.image.publicId) {
        await deleteAsset(product.image.publicId);
      }
      product.image = body.image ? { url: body.image, publicId: '' } : { url: '', publicId: '' };
    }

    await product.save();

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete product
// @route DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.image && product.image.publicId) {
      await deleteAsset(product.image.publicId);
    }

    await product.deleteOne();

    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductBySlugOrId,
  createProduct,
  updateProduct,
  deleteProduct,
};
