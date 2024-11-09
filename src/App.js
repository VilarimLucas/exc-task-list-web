import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import { FaTasks } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';

import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faPlus, faList, faCheckCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

const API_URL = 'http://localhost:4020/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [filter, setFilter] = useState('all'); // Adiciona estado para o filtro

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      alert('Por favor, digite uma tarefa');
      return;
    }
    try {
      const response = await axios.post(API_URL, { description: newTask, isCompleted: false });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const handleEditTask = async (id) => {
    if (editTaskId === id) {
      try {
        await axios.put(`${API_URL}/${id}`, { description: editTaskName });
        setTasks(tasks.map((task) => (task.id === id ? { ...task, description: editTaskName } : task)));
        setEditTaskId(null);
        setEditTaskName('');
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
      }
    } else {
      setEditTaskId(id);
      setEditTaskName(tasks.find((task) => task.id === id).description);
    }
  };

  const handleToggleComplete = async (id, isCompleted) => {
    try {
      await axios.put(`${API_URL}/${id}`, { isCompleted: !isCompleted });
      setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !isCompleted } : task)));
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });



  useEffect(() => {
    fetchTasks();

    // Converte o ícone em uma imagem para o favicon
    const setFavicon = () => {
      const iconHTML = renderToString(<FaTasks color="white" size="32" />);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${iconHTML}</svg>`;
      const svgUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

      // Cria e adiciona o favicon ao <head>
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = svgUrl;
      document.head.appendChild(link);
    };

    setFavicon();
  }, []);

  return (
    <div className="h-100 bg-light rounded p-4 task-list">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h6 className="mb-0">LISTA DE TAREFAS</h6>

        <a
          href="#all"
          className={`filter-link  ${filter === 'all' ? 'filter-link-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <FontAwesomeIcon icon={faList} /> TODOS
        </a>

        <a
          href="#pending"
          className={`filter-link ${filter === 'pending' ? 'filter-link-active' : ''} text-danger`}
          onClick={() => setFilter('pending')}
        >
          <FontAwesomeIcon icon={faHourglassHalf} /> PENDENTES

        </a>

        <a
          href="#concluded"
          className={`filter-link ${filter === 'completed' ? 'filter-link-active' : ''} text-success`}
          onClick={() => setFilter('completed')}
        >
          <FontAwesomeIcon icon={faCheckCircle} /> CONCLUÍDOS
        </a>

      </div>
      <div className="d-flex mb-2">
        <Form.Control
          type="text"
          placeholder="Descreva a Tarefa (Máx. 24 Caracteres)"
          className="bg-light"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          maxLength={24} // Limita o input a 24 caracteres
        />
        <button
          type="button"
          className="btn btn-primary ms-2"
          onClick={handleAddTask}
          name="add-task-button"
        >
          <FontAwesomeIcon icon={faPlus} className="text-light" />
        </button>
      </div>

      {filteredTasks.map((task) => (
        <div key={task.id} className="d-flex align-items-center border-bottom py-2">
          <Form.Check.Input
            checked={task.isCompleted}
            onChange={() => handleToggleComplete(task.id, task.isCompleted)}
            disabled={editTaskId === task.id} // Desabilita o checkbox se a tarefa está em edição
            name="check-completed-button"
            aria-label="check-completed-button"
          />


          <div className="w-100 ms-3">
            <div className="d-flex w-100 align-items-center justify-content-between">
              <span>
                <div className="d-flex align-items-center">
                  {editTaskId === task.id ? (
                    <Form.Control
                      type="text"
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                      onBlur={() => handleEditTask(task.id)}
                      maxLength={24} // Limita o input a 24 caracteres
                    />
                  ) : (
                    <span className={task.isCompleted ? "task-completed" : "task-pending"} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                      {task.description}
                    </span>
                  )}
                  {!task.isCompleted && (
                    <button
                      className={`btn ms-2 btn-sm edit-task-button ${editTaskId === task.id ? 'btn-primary text-light w-50' : ''}`}
                      onClick={() => handleEditTask(task.id)}
                      name="edit-task-button"
                      style={{ transition: 'all 0.2s' }}
                      onMouseEnter={(e) => e.target.classList.add('hover')}
                      onMouseLeave={(e) => e.target.classList.remove('hover')}
                    >
                      <FontAwesomeIcon icon={editTaskId === task.id ? faCheckCircle : faEdit} />
                      {editTaskId === task.id ? ' Atualizar' : ''}
                    </button>

                  )}
                </div>
              </span>
              <button
                className="btn btn-sm"
                onClick={() => handleDeleteTask(task.id)}
                name="delete-task-button"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
