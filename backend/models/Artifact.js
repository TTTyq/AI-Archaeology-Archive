import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema({
  // 基本信息
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['pottery', 'tools', 'jewelry', 'weapons', 'art', 'religious', 'daily-use', 'unknown']
  },
  
  // 3D星图位置信息
  position: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    z: {
      type: Number,
      required: true
    }
  },
  
  // 考古信息
  discoveryDate: {
    type: Date,
    default: Date.now
  },
  excavationSite: {
    type: String,
    required: true
  },
  estimatedAge: {
    type: Number, // 年份，负数表示公元前
    required: true
  },
  culture: {
    type: String,
    required: true
  },
  
  // 物理属性
  material: {
    type: String,
    required: true
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number
  },
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'fragments'],
    default: 'good'
  },
  
  // 视觉属性（用于3D显示）
  color: {
    type: String,
    default: '#FFD700' // 默认金色
  },
  size: {
    type: Number,
    default: 1.0,
    min: 0.1,
    max: 5.0
  },
  
  // 元数据
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    url: String,
    caption: String
  }],
  
  // AI分析数据
  aiAnalysis: {
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    classification: String,
    features: [String]
  }
}, {
  timestamps: true
});

// 索引
artifactSchema.index({ position: '2dsphere' });
artifactSchema.index({ category: 1 });
artifactSchema.index({ culture: 1 });
artifactSchema.index({ estimatedAge: 1 });

// 虚拟字段：年代描述
artifactSchema.virtual('ageDescription').get(function() {
  const age = Math.abs(this.estimatedAge);
  const era = this.estimatedAge < 0 ? 'BCE' : 'CE';
  return `${age} ${era}`;
});

// 确保虚拟字段被序列化
artifactSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Artifact', artifactSchema);
