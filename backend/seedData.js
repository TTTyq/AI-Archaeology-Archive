import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Artifact from './models/Artifact.js';

dotenv.config();

// 示例考古文物数据
const sampleArtifacts = [
  {
    name: "古埃及法老面具",
    description: "一件精美的黄金面具，可能属于古埃及第十八王朝的某位法老。面具上刻有象形文字和神圣的符号。",
    category: "art",
    position: { x: 10, y: 5, z: -8 },
    excavationSite: "埃及卢克索帝王谷",
    estimatedAge: -1350,
    culture: "古埃及",
    material: "黄金、青金石",
    dimensions: { length: 25, width: 20, height: 15, weight: 2500 },
    condition: "excellent",
    color: "#FFD700",
    size: 1.5,
    tags: ["法老", "黄金", "宗教", "王室"],
    aiAnalysis: {
      confidence: 0.95,
      classification: "皇室文物",
      features: ["象形文字", "黄金工艺", "宗教符号"]
    }
  },
  {
    name: "汉代青铜鼎",
    description: "西汉时期的青铜鼎，三足两耳，器身饰有云雷纹和饕餮纹，是古代祭祀和烹饪的重要器具。",
    category: "pottery",
    position: { x: -15, y: 8, z: 12 },
    excavationSite: "中国西安",
    estimatedAge: -150,
    culture: "汉朝",
    material: "青铜",
    dimensions: { length: 30, width: 30, height: 25, weight: 5000 },
    condition: "good",
    color: "#8B7355",
    size: 1.8,
    tags: ["青铜器", "祭祀", "汉代", "鼎"],
    aiAnalysis: {
      confidence: 0.88,
      classification: "礼器",
      features: ["云雷纹", "饕餮纹", "三足两耳"]
    }
  },
  {
    name: "玛雅翡翠面具",
    description: "古典期玛雅文明的翡翠面具，可能用于宗教仪式或埋葬仪式，展现了玛雅人精湛的玉石工艺。",
    category: "religious",
    position: { x: 20, y: -10, z: 5 },
    excavationSite: "墨西哥帕伦克",
    estimatedAge: 650,
    culture: "玛雅文明",
    material: "翡翠、黑曜石",
    dimensions: { length: 22, width: 18, height: 8, weight: 800 },
    condition: "fair",
    color: "#50C878",
    size: 1.3,
    tags: ["翡翠", "面具", "宗教", "玛雅"],
    aiAnalysis: {
      confidence: 0.82,
      classification: "宗教文物",
      features: ["翡翠工艺", "面部装饰", "宗教符号"]
    }
  },
  {
    name: "维京战士头盔",
    description: "8世纪维京时代的铁制头盔，带有护鼻片和装饰性的铜质镶嵌，体现了北欧战士文化。",
    category: "weapons",
    position: { x: -8, y: 15, z: -20 },
    excavationSite: "挪威奥斯陆",
    estimatedAge: 750,
    culture: "维京文明",
    material: "铁、铜",
    dimensions: { length: 25, width: 20, height: 18, weight: 1200 },
    condition: "good",
    color: "#708090",
    size: 1.2,
    tags: ["头盔", "战士", "维京", "铁器"],
    aiAnalysis: {
      confidence: 0.91,
      classification: "军事装备",
      features: ["护鼻片", "铜质装饰", "战斗磨损"]
    }
  },
  {
    name: "古希腊陶瓶",
    description: "公元前5世纪的红绘陶瓶，描绘了奥林匹斯诸神的故事，是古希腊艺术的典型代表。",
    category: "pottery",
    position: { x: 5, y: -5, z: 18 },
    excavationSite: "希腊雅典",
    estimatedAge: -450,
    culture: "古希腊",
    material: "陶土、颜料",
    dimensions: { length: 15, width: 15, height: 35, weight: 2000 },
    condition: "excellent",
    color: "#CD853F",
    size: 1.4,
    tags: ["陶器", "红绘", "神话", "艺术"],
    aiAnalysis: {
      confidence: 0.93,
      classification: "艺术品",
      features: ["红绘技法", "神话场景", "几何装饰"]
    }
  },
  {
    name: "印加黄金太阳盘",
    description: "印加帝国时期的黄金太阳盘，用于太阳神崇拜仪式，表面刻有复杂的天文图案。",
    category: "religious",
    position: { x: -25, y: 0, z: -15 },
    excavationSite: "秘鲁库斯科",
    estimatedAge: 1400,
    culture: "印加文明",
    material: "黄金",
    dimensions: { length: 40, width: 40, height: 3, weight: 3000 },
    condition: "excellent",
    color: "#FFD700",
    size: 2.0,
    tags: ["黄金", "太阳神", "印加", "天文"],
    aiAnalysis: {
      confidence: 0.89,
      classification: "宗教文物",
      features: ["太阳图案", "天文符号", "黄金工艺"]
    }
  },
  {
    name: "日本武士刀",
    description: "江户时代的武士刀，刀身采用传统的折叠锻造工艺，刀柄包裹鲨鱼皮并缠绕丝线。",
    category: "weapons",
    position: { x: 12, y: 20, z: 8 },
    excavationSite: "日本京都",
    estimatedAge: 1650,
    culture: "日本江户时代",
    material: "钢铁、鲨鱼皮、丝线",
    dimensions: { length: 100, width: 3, height: 2, weight: 1000 },
    condition: "good",
    color: "#C0C0C0",
    size: 1.6,
    tags: ["武士刀", "日本", "武器", "工艺"],
    aiAnalysis: {
      confidence: 0.96,
      classification: "武器",
      features: ["折叠锻造", "鲨鱼皮柄", "传统工艺"]
    }
  },
  {
    name: "阿兹特克羽毛头饰",
    description: "阿兹特克贵族的羽毛头饰，使用了珍贵的格查尔鸟羽毛，象征着权力和神圣地位。",
    category: "jewelry",
    position: { x: 0, y: -18, z: -10 },
    excavationSite: "墨西哥特诺奇蒂特兰",
    estimatedAge: 1450,
    culture: "阿兹特克文明",
    material: "羽毛、黄金、玉石",
    dimensions: { length: 80, width: 60, height: 40, weight: 500 },
    condition: "fair",
    color: "#228B22",
    size: 1.7,
    tags: ["羽毛", "头饰", "贵族", "阿兹特克"],
    aiAnalysis: {
      confidence: 0.85,
      classification: "装饰品",
      features: ["格查尔羽毛", "黄金装饰", "权力象征"]
    }
  }
];

// 连接数据库并插入数据
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-archaeology-archive');
    console.log('Connected to MongoDB');

    // 清空现有数据
    await Artifact.deleteMany({});
    console.log('Cleared existing artifacts');

    // 插入示例数据
    const artifacts = await Artifact.insertMany(sampleArtifacts);
    console.log(`Inserted ${artifacts.length} sample artifacts`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
