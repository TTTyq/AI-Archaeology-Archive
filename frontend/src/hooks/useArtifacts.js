import { useState, useEffect } from 'react';
import { artifactAPI } from '../services/api';

export function useArtifacts() {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // 获取考古文物数据
  const fetchArtifacts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await artifactAPI.getAll(params);
      setArtifacts(response.artifacts || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch artifacts:', err);
    } finally {
      setLoading(false);
    }
  };

  // 获取统计信息
  const fetchStats = async () => {
    try {
      const response = await artifactAPI.getStats();
      setStats(response);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // 创建新文物
  const createArtifact = async (artifactData) => {
    try {
      const newArtifact = await artifactAPI.create(artifactData);
      setArtifacts(prev => [...prev, newArtifact]);
      return newArtifact;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 更新文物
  const updateArtifact = async (id, artifactData) => {
    try {
      const updatedArtifact = await artifactAPI.update(id, artifactData);
      setArtifacts(prev => 
        prev.map(artifact => 
          artifact._id === id ? updatedArtifact : artifact
        )
      );
      return updatedArtifact;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 删除文物
  const deleteArtifact = async (id) => {
    try {
      await artifactAPI.delete(id);
      setArtifacts(prev => prev.filter(artifact => artifact._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchArtifacts();
    fetchStats();
  }, []);

  return {
    artifacts,
    loading,
    error,
    stats,
    fetchArtifacts,
    fetchStats,
    createArtifact,
    updateArtifact,
    deleteArtifact,
    refetch: fetchArtifacts
  };
}
