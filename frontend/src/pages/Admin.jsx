import React, { useState, useEffect } from 'react';
import {
  Lock,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Coffee,
  Calendar,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  Edit2,
  X,
} from 'lucide-react';
import {
  adminLogin,
  getAdminStats,
  getReservations,
  updateReservation,
  deleteReservation,
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getContactMessages,
} from '../services/api';
import './Admin.css';

export default function Admin() {
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('eb_admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Tab: 'reservations' | 'menu' | 'messages'
  const [activeTab, setActiveTab] = useState('reservations');

  // Stats & Data
  const [stats, setStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  // Add/Edit Menu Item Modal State
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'coffee',
    image: '',
    isFeatured: false,
    origin: '',
    brewMethod: '',
    tags: '',
  });

  // Action Notice Toast
  const [actionNotice, setActionNotice] = useState('');

  const triggerNotice = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3500);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      const res = await adminLogin(password);
      if (res?.success && res?.token) {
        sessionStorage.setItem('eb_admin_token', res.token);
        setAdminToken(res.token);
      } else {
        setLoginError(res?.message || 'Invalid administrative password.');
      }
    } catch (err) {
      setLoginError(err.message || 'Login request failed.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('eb_admin_token');
    setAdminToken('');
    setStats(null);
    setReservations([]);
  };

  // Load Admin Data
  const refreshAllData = async () => {
    if (!adminToken) return;
    setLoadingData(true);
    try {
      const [statsRes, resRes, menuRes, msgRes] = await Promise.all([
        getAdminStats(adminToken).catch(() => null),
        getReservations(statusFilter, adminToken).catch(() => null),
        getMenu().catch(() => null),
        getContactMessages(adminToken).catch(() => null),
      ]);

      if (statsRes?.data) setStats(statsRes.data);
      if (resRes?.data) setReservations(resRes.data);
      if (menuRes?.data) setMenuItems(menuRes.data);
      if (msgRes?.data) setMessages(msgRes.data);
    } catch (err) {
      console.error('Error refreshing admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      refreshAllData();
    }
  }, [adminToken, statusFilter]);

  // Reservation Actions
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateReservation(id, { status: newStatus }, adminToken);
      if (res?.success) {
        triggerNotice(`Reservation status changed to ${newStatus}.`);
        refreshAllData();
      }
    } catch (err) {
      alert(`Error updating reservation: ${err.message}`);
    }
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm('Are you sure you want to remove this reservation?')) return;
    try {
      const res = await deleteReservation(id, adminToken);
      if (res?.success) {
        triggerNotice('Reservation deleted successfully.');
        refreshAllData();
      }
    } catch (err) {
      alert(`Error deleting reservation: ${err.message}`);
    }
  };

  // Menu Actions
  const handleOpenAddMenu = () => {
    setEditingItem(null);
    setMenuForm({
      name: '',
      description: '',
      price: '',
      category: 'coffee',
      image: '',
      isFeatured: false,
      origin: '',
      brewMethod: '',
      tags: '',
    });
    setShowMenuModal(true);
  };

  const handleOpenEditMenu = (item) => {
    setEditingItem(item);
    setMenuForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isFeatured: Boolean(item.isFeatured),
      origin: item.origin || '',
      brewMethod: item.brewMethod || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
    });
    setShowMenuModal(true);
  };

  const handleSaveMenuItem = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...menuForm,
        price: Number(menuForm.price),
        tags: menuForm.tags ? menuForm.tags.split(',').map((t) => t.trim()) : [],
      };

      if (editingItem) {
        await updateMenuItem(editingItem._id, payload, adminToken);
        triggerNotice('Menu item updated successfully.');
      } else {
        await createMenuItem(payload, adminToken);
        triggerNotice('New menu item created.');
      }
      setShowMenuModal(false);
      refreshAllData();
    } catch (err) {
      alert(`Error saving menu item: ${err.message}`);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm('Delete this item from the active menu?')) return;
    try {
      await deleteMenuItem(id, adminToken);
      triggerNotice('Menu item removed.');
      refreshAllData();
    } catch (err) {
      alert(`Error deleting menu item: ${err.message}`);
    }
  };

  // If not authenticated, render login form
  if (!adminToken) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-login-wrapper">
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', color: 'var(--accent-copper)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Lock size={22} />
            </div>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>MANAGEMENT CONSOLE</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: '0.5rem 0 1rem', color: 'var(--text-main)' }}>
              Ember & Bean Admin
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Enter the administrative password to manage reservations, catalog items, and view inquiries.
            </p>

            {loginError && (
              <div style={{ padding: '0.75rem', backgroundColor: '#FDF2F2', border: '1px solid #F87171', color: '#991B1B', borderRadius: 4, fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-field" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                <label className="form-label" htmlFor="admin-pass">Secret Key / Password</label>
                <input
                  id="admin-pass"
                  type="password"
                  required
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {loggingIn ? 'Authenticating...' : 'Sign In to Portal'}
              </button>
            </form>

            <p style={{ fontSize: '0.76rem', color: 'var(--text-subtle)', marginTop: '1.5rem' }}>
              Default development password: <code style={{ color: 'var(--accent-copper)' }}>ember_bean_secret_admin_2026</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        {/* Header Bar */}
        <header className="admin-header">
          <div>
            <span className="eyebrow">PORTAL DASHBOARD</span>
            <h1 className="admin-title">Operations Console</h1>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <button
              onClick={refreshAllData}
              className="btn btn-outline"
              style={{ padding: '0.6rem 1rem' }}
              title="Refresh Data"
            >
              <RefreshCw size={16} className={loadingData ? 'spin' : ''} />
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ padding: '0.6rem 1.2rem', gap: '0.5rem' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {actionNotice && (
          <div style={{ padding: '0.85rem 1.25rem', backgroundColor: '#DEF7EC', border: '1px solid #84E1BC', color: '#03543F', borderRadius: 4, marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CheckCircle size={18} />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Top KPI Cards */}
        <div className="admin-stats-grid">
          <div className="stat-kpi-card">
            <span className="stat-label">Total Reservations</span>
            <span className="stat-val">{stats?.totalReservations ?? reservations.length}</span>
          </div>
          <div className="stat-kpi-card">
            <span className="stat-label">Pending Action</span>
            <span className="stat-val" style={{ color: '#D97706' }}>
              {stats?.pendingReservations ?? reservations.filter((r) => r.status === 'pending').length}
            </span>
          </div>
          <div className="stat-kpi-card">
            <span className="stat-label">Confirmed Bookings</span>
            <span className="stat-val" style={{ color: '#059669' }}>
              {stats?.confirmedReservations ?? reservations.filter((r) => r.status === 'confirmed').length}
            </span>
          </div>
          <div className="stat-kpi-card">
            <span className="stat-label">Active Menu Items</span>
            <span className="stat-val">{stats?.totalMenuItems ?? menuItems.length}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs-bar">
          <button
            className={`admin-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            Reservations ({reservations.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu Items ({menuItems.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Customer Messages ({messages.length})
          </button>
        </div>

        {/* TAB 1: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)' }}>
                Guest Reservations
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Status Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref / Guest</th>
                    <th>Contact</th>
                    <th>Date & Time</th>
                    <th>Party</th>
                    <th>Status</th>
                    <th>Requests</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem' }}>
                        No reservations found matching current filter.
                      </td>
                    </tr>
                  ) : (
                    reservations.map((res) => (
                      <tr key={res._id}>
                        <td>
                          <strong>{res.name}</strong>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                            {res.bookingReference || res._id}
                          </div>
                        </td>
                        <td>
                          <div>{res.email}</div>
                          <div style={{ fontSize: '0.78rem' }}>{res.phone}</div>
                        </td>
                        <td>
                          <div>{res.date}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--accent-copper)' }}>{res.time}</div>
                        </td>
                        <td>{res.guests} Guests</td>
                        <td>
                          <span className={`status-badge ${res.status}`}>
                            {res.status}
                          </span>
                        </td>
                        <td style={{ maxWidth: 220, fontSize: '0.82rem' }}>
                          {res.message || '—'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {res.status !== 'confirmed' && (
                              <button
                                onClick={() => handleStatusChange(res._id, 'confirmed')}
                                className="table-btn"
                                title="Confirm Booking"
                              >
                                Confirm
                              </button>
                            )}
                            {res.status !== 'cancelled' && (
                              <button
                                onClick={() => handleStatusChange(res._id, 'cancelled')}
                                className="table-btn"
                                title="Cancel Booking"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReservation(res._id)}
                              className="table-btn delete"
                              title="Delete Record"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MENU ITEMS */}
        {activeTab === 'menu' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)' }}>
                Catalog Offerings ({menuItems.length})
              </h3>
              <button onClick={handleOpenAddMenu} className="btn btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
                <Plus size={16} /> Add New Menu Item
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Featured</th>
                    <th>Origin / Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: 44, height: 44, borderRadius: 4, objectFit: 'cover' }}
                          />
                          <div>
                            <strong>{item.name}</strong>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ textTransform: 'capitalize' }}>{item.category}</span>
                      </td>
                      <td>
                        <strong>₹{item.price}</strong>
                      </td>
                      <td>
                        {item.isFeatured ? (
                          <span className="status-badge confirmed">Yes</span>
                        ) : (
                          <span style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>No</span>
                        )}
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8rem' }}>{item.origin || item.brewMethod || '—'}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleOpenEditMenu(item)}
                            className="table-btn"
                            title="Edit Item"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(item._id)}
                            className="table-btn delete"
                            title="Delete Item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              Inbound Customer Messages ({messages.length})
            </h3>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '2.5rem' }}>
                        No messages received yet.
                      </td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr key={msg._id}>
                        <td>
                          <strong>{msg.name}</strong>
                          <div style={{ fontSize: '0.78rem' }}>{msg.email}</div>
                          {msg.phone && <div style={{ fontSize: '0.74rem' }}>{msg.phone}</div>}
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--accent-copper)' }}>{msg.subject}</span>
                        </td>
                        <td style={{ maxWidth: 360, lineHeight: 1.5, fontSize: '0.86rem' }}>
                          {msg.message}
                        </td>
                        <td style={{ fontSize: '0.78rem' }}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADD / EDIT MENU ITEM MODAL */}
        {showMenuModal && (
          <div className="item-modal-backdrop" onClick={() => setShowMenuModal(false)}>
            <div
              className="item-modal-content"
              style={{ display: 'block', maxWidth: 640, padding: '2.2rem' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)' }}>
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                <button
                  onClick={() => setShowMenuModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveMenuItem}>
                <div className="form-group-grid">
                  <div className="form-field full">
                    <label className="form-label">Item Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Honey Cold Drip"
                      value={menuForm.name}
                      onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Category *</label>
                    <select
                      value={menuForm.category}
                      onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                      className="form-select"
                    >
                      <option value="coffee">Coffee</option>
                      <option value="non-coffee">Non-Coffee</option>
                      <option value="bakery">Bakery</option>
                      <option value="desserts">Desserts</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Price (in ₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 240"
                      value={menuForm.price}
                      onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full">
                    <label className="form-label">Image URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={menuForm.image}
                      onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full">
                    <label className="form-label">Description *</label>
                    <textarea
                      required
                      placeholder="Tasting notes, extraction description..."
                      value={menuForm.description}
                      onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Origin / Estate</label>
                    <input
                      type="text"
                      placeholder="e.g. Araku Valley"
                      value={menuForm.origin}
                      onChange={(e) => setMenuForm({ ...menuForm, origin: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Brew / Prep Method</label>
                    <input
                      type="text"
                      placeholder="e.g. Pour Over V60"
                      value={menuForm.brewMethod}
                      onChange={(e) => setMenuForm({ ...menuForm, brewMethod: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full">
                    <label className="form-label">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Single Origin, House Special, Vegan"
                      value={menuForm.tags}
                      onChange={(e) => setMenuForm({ ...menuForm, tags: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field full" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.65rem' }}>
                    <input
                      id="isFeaturedCheck"
                      type="checkbox"
                      checked={menuForm.isFeatured}
                      onChange={(e) => setMenuForm({ ...menuForm, isFeatured: e.target.checked })}
                      style={{ width: 18, height: 18, accentColor: 'var(--accent-copper)' }}
                    />
                    <label htmlFor="isFeaturedCheck" style={{ fontSize: '0.88rem', color: 'var(--text-main)', cursor: 'pointer' }}>
                      Feature on Home Page showcase
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowMenuModal(false)}
                    className="btn btn-outline"
                    style={{ padding: '0.6rem 1.4rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '0.6rem 1.8rem' }}
                  >
                    {editingItem ? 'Save Changes' : 'Create Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
