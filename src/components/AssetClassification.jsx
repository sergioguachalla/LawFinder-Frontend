import React, { useEffect } from 'react';
import { useAssetStore } from '../store/assetStore';
import { format } from 'date-fns';
import Navbar from './Navbar';
import '../styles/Asset.css';  

const AssetClassification = () => {
  const {
    assets, confidentialityLevels, status, currentPage, totalPages,
    confidentialityId, setConfidentialityId, getAssets, getConfidentialityLevels, nextPage, previousPage, clearFilters
  } = useAssetStore();

  useEffect(() => {
    getConfidentialityLevels();
  }, [getConfidentialityLevels]);

  useEffect(() => {
    getAssets();
  }, [getAssets, confidentialityId, currentPage]);

  return (
    <>
      <Navbar />
      <div className="asset-classification-container">
        <h1 className="asset-classification-title">Clasificación de Activos</h1>

        <div className="asset-classification-filter-container">
          <div>
            <label htmlFor="confidentialityId">Clasificación: </label>
            <select id="confidentialityId" value={confidentialityId} onChange={(e) => setConfidentialityId(e.target.value)}>
              <option value="">Todos</option>
              {confidentialityLevels && confidentialityLevels.map(level => (
                <option key={level.confidentialityId} value={level.confidentialityId}>{level.description}</option>
                ))}
            </select>

            <button className="asset-classification-clear-button" onClick={clearFilters}>Borrar Filtros</button>
          </div>
        </div>

        <div className="asset-classification-assets-container">
          {status === 'loading' && <p>Loading...</p>}
          {status === 'success' && (
            <>
              <table className="asset-classification-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del Caso</th>
                    <th>Descripción</th>
                    <th>Crimen</th>
                    <th>Fecha de Inicio</th>
                    <th>Clasificación</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map(asset => (
                    <tr key={asset.caseId}>
                      <td>{asset.caseId}</td>
                      <td>{asset.caseName}</td>
                      <td>{asset.caseDescription}</td>
                      <td>{asset.crime}</td>
                      <td>{format(new Date(asset.startDate), 'dd/MM/yyyy')}</td>
                      <td>
                      {asset.confidentiality === "Publica" && (
                        <div className="classification-info">
                            <div className="green-circle"></div>
                            <span>Publica</span>
                        </div>
                       )}
                       {asset.confidentiality === "Uso Interno o Privada" && (
                        <div className="classification-info">
                            <div className="orange-circle"></div>
                            <span>Uso Interno o Privada</span>
                        </div>
                       )}
                       {asset.confidentiality === "Confidencial" && (
                        <div className="classification-info">
                            <div className="red-circle"></div>
                            <span>Confidencial</span>
                        </div>
                       )}
                    </td>

                    </tr>
                  ))}
                </tbody>
                
              </table>
              <div className="asset-classification-pagination">
                <button onClick={previousPage} disabled={currentPage === 0}>Previous</button>
                <span>{currentPage + 1}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button>
              </div>
            </>
          )}
          {status === 'empty' && <p>No se encontraron activos</p>}
          {status === 'error' && <p>Error fetching assets</p>}
        </div>
      </div>
    </>
  );
};

export default AssetClassification;
