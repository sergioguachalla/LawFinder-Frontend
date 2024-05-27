import React, { useEffect } from 'react';
import { useLogsStore } from '../store/securityLogsStore';
import { format } from 'date-fns';
import '../styles/ApplicationLogs.css';
import Navbar from './Navbar';

const SecurityLogs = () => {
  const {
    logs, categories, status, currentPage, totalPages,
    fromDate, toDate, categoryId,
    setFromDate, setToDate, setCategoryId,
    getLogs, getCategories, nextPage, previousPage, clearFilters
  } = useLogsStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    getLogs();
  }, [getLogs, fromDate, toDate, categoryId, currentPage]);

  const formatDate = (dateInput) => format(new Date(dateInput), 'yyyy-MM-dd');
  const currentDate = formatDate(new Date());

  return (
    <>
      <Navbar />
      <div className="log-app-container">
        <h1 className="log-app-title">Logs de Seguridad</h1>

        <div className="log-app-filter-container">
          <div>
            <label htmlFor="categoryId">Categoría: </label>
            <select id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Todas</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
              ))}
            </select>

            <label htmlFor="fromDate">Desde: </label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              max={currentDate}
            />

            <label htmlFor="toDate">Hasta: </label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
              max={currentDate}
            />

            <button className="log-app-clear-button" onClick={clearFilters}>Borrar Filtros</button>
          </div>
        </div>

        <div className="log-app-logs-container">
          {status === 'loading' && <p>Cargando...</p>}
          {status === 'success' && (
            <>
              <table className="log-app-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Fecha y Hora</th>
                    <th>Host</th>
                    <th>Evento</th>
                    <th>Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.logId}>
                      <td>{log.logId}</td>
                      <td>{log.username}</td>
                      <td>{format(new Date(log.logDate), 'dd-MM-yyyy HH:mm:ss')}</td>
                      <td>{log.host}</td>
                      <td>{log.description}</td>
                      <td>{log.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="log-app-pagination">
                <button onClick={previousPage} disabled={currentPage === 0}>Anterior</button>
                <span>{currentPage + 1}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Siguiente</button>
              </div>
            </>
          )}
          {status === 'empty' && <p>No se encontraron Logs</p>}
          {status === 'error' && <p>Error al obtener los logs</p>}
        </div>
      </div>
    </>
  );
};

export default SecurityLogs;
