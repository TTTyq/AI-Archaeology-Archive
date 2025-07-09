import React, { useState } from 'react';
import StarMap from './components/StarMap';
import ArtifactPanel from './components/ArtifactPanel';
import { useArtifacts } from './hooks/useArtifacts';
import './App.css';

function App() {
  const { artifacts, loading, error, stats } = useArtifacts();
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const handleArtifactSelect = (artifact) => {
    setSelectedArtifact(artifact);
  };

  const handleClosePanel = () => {
    setSelectedArtifact(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>正在加载考古数据...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>连接错误</h2>
        <p>{error}</p>
        <p>请确保后端服务正在运行 (http://localhost:3001)</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏛️ AI考古学家Archive</h1>
        <div className="stats">
          {stats && (
            <>
              <span>文物总数: {stats.overview?.total || 0}</span>
              <span>文化类型: {stats.overview?.cultures?.length || 0}</span>
            </>
          )}
        </div>
      </header>

      <main className="app-main">
        <StarMap
          artifacts={artifacts}
          onArtifactSelect={handleArtifactSelect}
        />

        {selectedArtifact && (
          <ArtifactPanel
            artifact={selectedArtifact}
            onClose={handleClosePanel}
          />
        )}
      </main>
    </div>
  );
}

export default App;
