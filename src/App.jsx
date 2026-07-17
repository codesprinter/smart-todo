import { useState, useEffect } from 'react'
import { Plus, Search, Trash2, Edit2, Check, X, Sparkles, ClipboardList } from 'lucide-react'

function App() {
  // Initialize state from LocalStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('aether-todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse todos from localStorage", e);
      }
    }
    return [
      { id: '1', text: 'Welcome to SmartTodo!', completed: false, createdAt: new Date().toISOString() },
      { id: '2', text: 'Click the checkbox to complete a task.', completed: true, createdAt: new Date().toISOString() },
      { id: '3', text: 'Try double clicking a task text to edit.', completed: false, createdAt: new Date().toISOString() }
    ];
  });

  const [newTodoText, setNewTodoText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('aether-todos', JSON.stringify(todos));
  }, [todos]);

  // Handlers
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos(prev => [newTodo, ...prev]);
    setNewTodoText('');
  };

  const handleToggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleStartEditing = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  const handleSaveEditing = (id) => {
    if (!editingText.trim()) {
      handleDeleteTodo(id);
      setEditingTodoId(null);
      return;
    }
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: editingText.trim() } : todo
    ));
    setEditingTodoId(null);
  };

  const handleCancelEditing = () => {
    setEditingTodoId(null);
    setEditingText('');
  };

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  // Filtered & Searched lists
  const filteredTodos = todos.filter(todo => {
    const matchesFilter =
      filter === 'all' ? true :
        filter === 'active' ? !todo.completed :
          todo.completed;

    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Analytics
  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="app-wrapper">
      {/* Background glow effects */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <header className="app-header">
        <div className="header-container">
          <div className="logo-group">
            <Sparkles className="logo-icon" size={24} />
            <span className="logo-text">AetherTodo</span>
          </div>
          <a href="https://github.com/codesprinter/smart-todo" target="_blank" rel="noreferrer" className="github-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub Repository</span>
          </a>
        </div>
      </header>

      <main className="main-content">
        <div className="todo-container glass-panel">
          {/* Header Title */}
          <div className="todo-header">
            <h2>Your List</h2>
            <p>Manage your daily challenges and tasks efficiently.</p>
          </div>

          {/* Stats Bar */}
          <div className="todo-stats">
            <div className="stat-card animate-fade">
              <span className="stat-value">{totalCount}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-card animate-fade">
              <span className="stat-value">{activeCount}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card animate-fade">
              <span className="stat-value completed">{completedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>

          {/* Progress bar */}
          {totalCount > 0 && (
            <div className="progress-container">
              <div className="progress-label">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="todo-form">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              className="todo-input"
            />
            <button type="submit" className="add-btn">
              <Plus size={18} />
              <span>Add</span>
            </button>
          </form>

          {/* Filter & Search Bar */}
          <div className="todo-toolbar">
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="clear-search">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="filter-group">
              {['all', 'active', 'completed'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilter(type)}
                  className={`filter-btn ${filter === type ? 'active' : ''}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Todo List */}
          <div className="todo-list">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`todo-item ${todo.completed ? 'completed' : ''} ${editingTodoId === todo.id ? 'editing' : ''}`}
                >
                  <div className="item-left">
                    <button
                      type="button"
                      onClick={() => handleToggleTodo(todo.id)}
                      className={`checkbox-btn ${todo.completed ? 'checked' : ''}`}
                      aria-label="Toggle Complete"
                    >
                      {todo.completed && <Check size={14} />}
                    </button>

                    {editingTodoId === todo.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => handleSaveEditing(todo.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEditing(todo.id);
                          if (e.key === 'Escape') handleCancelEditing();
                        }}
                        autoFocus
                        className="edit-input"
                      />
                    ) : (
                      <span className="todo-text" onDoubleClick={() => handleStartEditing(todo.id, todo.text)}>
                        {todo.text}
                      </span>
                    )}
                  </div>

                  <div className="item-actions">
                    {editingTodoId === todo.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSaveEditing(todo.id)}
                          className="action-btn save-btn"
                          title="Save Changes"
                        >
                          <Check size={16} style={{ color: 'var(--success)' }} />
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEditing}
                          className="action-btn cancel-btn"
                          title="Cancel Editing"
                        >
                          <X size={16} style={{ color: 'var(--danger)' }} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleStartEditing(todo.id, todo.text)}
                          className="action-btn edit-btn"
                          title="Edit Task"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="action-btn delete-btn"
                          title="Delete Task"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <ClipboardList className="empty-icon" size={48} />
                <h3>No tasks found</h3>
                <p>
                  {searchQuery
                    ? "Try adjusting your search queries."
                    : filter === 'completed'
                      ? "Get to work! No completed tasks found."
                      : filter === 'active'
                        ? "All caught up! No active tasks found."
                        : "Add tasks above to begin organizing your work!"}
                </p>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {todos.length > 0 && (
            <div className="todo-footer-controls">
              <span className="items-left">{activeCount} items remaining</span>
              {completedCount > 0 && (
                <button type="button" onClick={handleClearCompleted} className="clear-completed-btn">
                  Clear Completed ({completedCount})
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 AetherTodo. Built with React JS, Vite, & Local Storage.</p>
      </footer>
    </div>
  )
}

export default App
