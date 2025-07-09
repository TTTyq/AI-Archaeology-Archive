import React from 'react';

export default function ArtifactPanel({ artifact, onClose }) {
  if (!artifact) return null;

  const formatDimensions = (dimensions) => {
    if (!dimensions) return 'N/A';
    const { length, width, height, weight } = dimensions;
    const parts = [];
    if (length) parts.push(`长: ${length}cm`);
    if (width) parts.push(`宽: ${width}cm`);
    if (height) parts.push(`高: ${height}cm`);
    if (weight) parts.push(`重: ${weight}g`);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  const getConditionText = (condition) => {
    const conditionMap = {
      excellent: '优秀',
      good: '良好',
      fair: '一般',
      poor: '较差',
      fragments: '碎片'
    };
    return conditionMap[condition] || condition;
  };

  const getCategoryText = (category) => {
    const categoryMap = {
      pottery: '陶器',
      tools: '工具',
      jewelry: '珠宝',
      weapons: '武器',
      art: '艺术品',
      religious: '宗教用品',
      'daily-use': '日用品',
      unknown: '未知'
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="artifact-panel">
      <div className="panel-header">
        <h2>{artifact.name}</h2>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
      
      <div className="panel-content">
        <div className="artifact-info">
          <div className="info-section">
            <h3>基本信息</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">类别:</span>
                <span className="value">{getCategoryText(artifact.category)}</span>
              </div>
              <div className="info-item">
                <span className="label">文化:</span>
                <span className="value">{artifact.culture}</span>
              </div>
              <div className="info-item">
                <span className="label">年代:</span>
                <span className="value">{artifact.ageDescription}</span>
              </div>
              <div className="info-item">
                <span className="label">发现地:</span>
                <span className="value">{artifact.excavationSite}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>描述</h3>
            <p className="description">{artifact.description}</p>
          </div>

          <div className="info-section">
            <h3>物理属性</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">材质:</span>
                <span className="value">{artifact.material}</span>
              </div>
              <div className="info-item">
                <span className="label">尺寸:</span>
                <span className="value">{formatDimensions(artifact.dimensions)}</span>
              </div>
              <div className="info-item">
                <span className="label">保存状态:</span>
                <span className="value">{getConditionText(artifact.condition)}</span>
              </div>
              <div className="info-item">
                <span className="label">发现日期:</span>
                <span className="value">
                  {new Date(artifact.discoveryDate).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>
          </div>

          {artifact.tags && artifact.tags.length > 0 && (
            <div className="info-section">
              <h3>标签</h3>
              <div className="tags">
                {artifact.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {artifact.aiAnalysis && (
            <div className="info-section">
              <h3>AI分析</h3>
              <div className="info-grid">
                {artifact.aiAnalysis.confidence && (
                  <div className="info-item">
                    <span className="label">置信度:</span>
                    <span className="value">
                      {(artifact.aiAnalysis.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
                {artifact.aiAnalysis.classification && (
                  <div className="info-item">
                    <span className="label">分类:</span>
                    <span className="value">{artifact.aiAnalysis.classification}</span>
                  </div>
                )}
              </div>
              {artifact.aiAnalysis.features && artifact.aiAnalysis.features.length > 0 && (
                <div className="features">
                  <span className="label">特征:</span>
                  <span className="value">{artifact.aiAnalysis.features.join(', ')}</span>
                </div>
              )}
            </div>
          )}

          <div className="info-section">
            <h3>3D位置</h3>
            <div className="position-info">
              <span>X: {artifact.position.x.toFixed(2)}</span>
              <span>Y: {artifact.position.y.toFixed(2)}</span>
              <span>Z: {artifact.position.z.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
