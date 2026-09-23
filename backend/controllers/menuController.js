import MenuItem from '../models/MenuItem.js';
import { getDbStatus } from '../config/db.js';
import { seedMenuItems } from '../seed/seedData.js';

// In-memory fallback cache when database is in disconnected/setup mode
let inMemoryMenu = [...seedMenuItems.map((item, index) => ({
  ...item,
  _id: `mock-menu-${index + 1}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}))];

/**
 * @desc Get all menu items with category/featured filter & search
 * @route GET /api/menu
 */
export const getMenuItems = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const filter = {};
      if (category && category !== 'all') {
        filter.category = category.toLowerCase().trim();
      }
      if (featured === 'true') {
        filter.isFeatured = true;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      const items = await MenuItem.find(filter).sort({ isFeatured: -1, category: 1, name: 1 });
      return res.status(200).json({
        success: true,
        count: items.length,
        source: 'mongodb',
        data: items,
      });
    }

    // Fallback in-memory store
    let filtered = [...inMemoryMenu];
    if (category && category !== 'all') {
      filtered = filtered.filter((i) => i.category.toLowerCase() === category.toLowerCase());
    }
    if (featured === 'true') {
      filtered = filtered.filter((i) => i.isFeatured === true);
    }
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.name.toLowerCase().includes(term) ||
          i.description.toLowerCase().includes(term) ||
          (i.tags && i.tags.some((t) => t.toLowerCase().includes(term)))
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      source: 'fallback-cache',
      notice: 'Operating with local seed catalog. Connect MongoDB Atlas in backend/.env for persistent cloud storage.',
      data: filtered,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get single menu item by ID
 * @route GET /api/menu/:id
 */
export const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const item = await MenuItem.findById(id);
      if (!item) {
        return res.status(404).json({ success: false, message: `Menu item with id ${id} not found` });
      }
      return res.status(200).json({ success: true, data: item });
    }

    const item = inMemoryMenu.find((i) => i._id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: `Menu item with id ${id} not found` });
    }
    return res.status(200).json({ success: true, source: 'fallback-cache', data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Create new menu item
 * @route POST /api/menu
 */
export const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category, image, isFeatured, tags, brewMethod, origin, calories } = req.body;

    if (!name || !description || price === undefined || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, price, category, and image are required.',
      });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const newItem = await MenuItem.create({
        name,
        description,
        price: Number(price),
        category: category.toLowerCase().trim(),
        image,
        isFeatured: Boolean(isFeatured),
        tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [],
        brewMethod,
        origin,
        calories: calories ? Number(calories) : null,
      });

      return res.status(201).json({
        success: true,
        message: 'Menu item created successfully in MongoDB',
        data: newItem,
      });
    }

    // In-memory addition
    const mockItem = {
      _id: `mock-menu-${Date.now()}`,
      name,
      description,
      price: Number(price),
      category: category.toLowerCase().trim(),
      image,
      isFeatured: Boolean(isFeatured),
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()) : [],
      brewMethod,
      origin,
      calories: calories ? Number(calories) : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryMenu.unshift(mockItem);

    return res.status(201).json({
      success: true,
      message: 'Menu item created successfully (in-memory mode)',
      data: mockItem,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update menu item
 * @route PUT /api/menu/:id
 */
export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const updated = await MenuItem.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      return res.status(200).json({ success: true, message: 'Menu item updated', data: updated });
    }

    const index = inMemoryMenu.findIndex((i) => i._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    inMemoryMenu[index] = {
      ...inMemoryMenu[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      message: 'Menu item updated (in-memory mode)',
      data: inMemoryMenu[index],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete menu item
 * @route DELETE /api/menu/:id
 */
export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const deleted = await MenuItem.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      return res.status(200).json({ success: true, message: 'Menu item removed', data: deleted });
    }

    const index = inMemoryMenu.findIndex((i) => i._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    const [deletedItem] = inMemoryMenu.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: 'Menu item removed (in-memory mode)',
      data: deletedItem,
    });
  } catch (error) {
    next(error);
  }
};
