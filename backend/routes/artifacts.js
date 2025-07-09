import express from 'express';
import Artifact from '../models/Artifact.js';

const router = express.Router();

// 获取所有考古文物
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      culture, 
      minAge, 
      maxAge, 
      limit = 100, 
      page = 1 
    } = req.query;

    // 构建查询条件
    const query = {};
    if (category) query.category = category;
    if (culture) query.culture = new RegExp(culture, 'i');
    if (minAge || maxAge) {
      query.estimatedAge = {};
      if (minAge) query.estimatedAge.$gte = parseInt(minAge);
      if (maxAge) query.estimatedAge.$lte = parseInt(maxAge);
    }

    const artifacts = await Artifact.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Artifact.countDocuments(query);

    res.json({
      artifacts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: artifacts.length,
        totalItems: total
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取统计信息 - 必须在 /:id 路由之前
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Artifact.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          categories: { $addToSet: '$category' },
          cultures: { $addToSet: '$culture' },
          avgAge: { $avg: '$estimatedAge' },
          oldestAge: { $min: '$estimatedAge' },
          newestAge: { $max: '$estimatedAge' }
        }
      }
    ]);

    const categoryStats = await Artifact.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      overview: stats[0] || {},
      categoryBreakdown: categoryStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个考古文物
router.get('/:id', async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    if (!artifact) {
      return res.status(404).json({ error: 'Artifact not found' });
    }
    res.json(artifact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建新的考古文物
router.post('/', async (req, res) => {
  try {
    const artifact = new Artifact(req.body);
    await artifact.save();
    res.status(201).json(artifact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 更新考古文物
router.put('/:id', async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!artifact) {
      return res.status(404).json({ error: 'Artifact not found' });
    }
    res.json(artifact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 删除考古文物
router.delete('/:id', async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!artifact) {
      return res.status(404).json({ error: 'Artifact not found' });
    }
    res.json({ message: 'Artifact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
