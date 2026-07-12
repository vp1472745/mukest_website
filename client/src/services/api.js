import axios from 'axios';
import { initialMockData } from './mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const USE_MOCK = import.meta.env.VITE_API_USE_MOCK === 'true';

// Helper to initialize local storage mock DB
const getMockDB = () => {
  const db = localStorage.getItem('lenscraft_mock_db');
  if (!db) {
    localStorage.setItem('lenscraft_mock_db', JSON.stringify(initialMockData));
    return initialMockData;
  }
  return JSON.parse(db);
};

const saveMockDB = (data) => {
  localStorage.setItem('lenscraft_mock_db', JSON.stringify(data));
};

// Set authorization token header dynamically for live mode
const getAxiosConfig = () => {
  const token = localStorage.getItem('lenscraft_admin_token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
};

// Mock file-to-base64 reader helper
const readFileAsDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      if (USE_MOCK) {
        if (email === 'admin@gmail.com' && password === 'Admin@123') {
          const db = getMockDB();
          localStorage.setItem('lenscraft_admin_token', db.auth.token);
          return { data: { success: true, data: { user: db.auth.user, token: db.auth.token } } };
        }
        throw new Error('Invalid email or password');
      } else {
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        if (response.data?.data?.token) {
          localStorage.setItem('lenscraft_admin_token', response.data.data.token);
        }
        return response;
      }
    },
    logout: () => {
      localStorage.removeItem('lenscraft_admin_token');
    },
    getProfile: async () => {
      if (USE_MOCK) {
        const db = getMockDB();
        return { data: { success: true, data: db.auth.user } };
      } else {
        return await axios.get(`${BASE_URL}/auth/profile`, getAxiosConfig());
      }
    },
    updateProfile: async (data) => {
      if (USE_MOCK) {
        const db = getMockDB();
        db.auth.user.email = data.email || db.auth.user.email;
        saveMockDB(db);
        return { data: { success: true, data: db.auth.user } };
      } else {
        return await axios.put(`${BASE_URL}/auth/profile`, data, getAxiosConfig());
      }
    }
  },

  // Generic sections CRUD operations handler
  section: {
    getAll: async (sectionName) => {
      if (USE_MOCK) {
        const db = getMockDB();
        const list = db[sectionName] || [];
        return { data: { success: true, data: list } };
      } else {
        return await axios.get(`${BASE_URL}/${sectionName}`, getAxiosConfig());
      }
    },

    getById: async (sectionName, id) => {
      if (USE_MOCK) {
        const db = getMockDB();
        const item = (db[sectionName] || []).find(x => x._id === id);
        return { data: { success: true, data: item } };
      } else {
        return await axios.get(`${BASE_URL}/${sectionName}/${id}`, getAxiosConfig());
      }
    },

    create: async (sectionName, data, isMultipart = false) => {
      if (USE_MOCK) {
        const db = getMockDB();
        const newItem = { _id: `mock_${sectionName}_${Date.now()}`, active: true };

        if (isMultipart) {
          // Parse FormData keys into object
          const entries = Array.from(data.entries());
          for (const [key, val] of entries) {
            if (val instanceof File) {
              newItem[key === 'file' ? 'mediaUrl' : 'imageUrl'] = await readFileAsDataURL(val);
              newItem.public_id = `mock_pub_${Date.now()}`;
            } else {
              newItem[key] = val;
            }
          }
        } else {
          Object.assign(newItem, data);
        }

        // Adjust displayOrder/sliderOrder or values to numbers
        if (newItem.sliderOrder) newItem.sliderOrder = Number(newItem.sliderOrder);
        if (newItem.displayOrder) newItem.displayOrder = Number(newItem.displayOrder);
        if (newItem.stepNumber) newItem.stepNumber = Number(newItem.stepNumber);

        db[sectionName] = db[sectionName] || [];
        db[sectionName].push(newItem);
        saveMockDB(db);
        return { data: { success: true, data: newItem } };
      } else {
        const config = getAxiosConfig();
        if (isMultipart) {
          config.headers['Content-Type'] = 'multipart/form-data';
        }
        return await axios.post(`${BASE_URL}/${sectionName}`, data, config);
      }
    },

    update: async (sectionName, id, data, isMultipart = false) => {
      if (USE_MOCK) {
        const db = getMockDB();
        db[sectionName] = db[sectionName] || [];
        const index = db[sectionName].findIndex(x => x._id === id);
        if (index === -1) throw new Error(`${sectionName} item not found`);

        const updatedItem = { ...db[sectionName][index] };

        if (isMultipart) {
          const entries = Array.from(data.entries());
          for (const [key, val] of entries) {
            if (val instanceof File) {
              updatedItem[key === 'file' ? 'mediaUrl' : 'imageUrl'] = await readFileAsDataURL(val);
              updatedItem.public_id = `mock_pub_${Date.now()}`;
            } else {
              updatedItem[key] = val;
            }
          }
        } else {
          Object.assign(updatedItem, data);
        }

        if (updatedItem.sliderOrder) updatedItem.sliderOrder = Number(updatedItem.sliderOrder);
        if (updatedItem.displayOrder) updatedItem.displayOrder = Number(updatedItem.displayOrder);
        if (updatedItem.stepNumber) updatedItem.stepNumber = Number(updatedItem.stepNumber);

        db[sectionName][index] = updatedItem;
        saveMockDB(db);
        return { data: { success: true, data: updatedItem } };
      } else {
        const config = getAxiosConfig();
        if (isMultipart) {
          config.headers['Content-Type'] = 'multipart/form-data';
        }
        return await axios.put(`${BASE_URL}/${sectionName}/${id}`, data, config);
      }
    },

    delete: async (sectionName, id) => {
      if (USE_MOCK) {
        const db = getMockDB();
        db[sectionName] = (db[sectionName] || []).filter(x => x._id !== id);
        saveMockDB(db);
        return { data: { success: true, data: null } };
      } else {
        return await axios.delete(`${BASE_URL}/${sectionName}/${id}`, getAxiosConfig());
      }
    }
  },

  // About and Contact single-document sections special handler
  singleSection: {
    get: async (sectionName) => {
      if (USE_MOCK) {
        const db = getMockDB();
        return { data: { success: true, data: db[sectionName] } };
      } else {
        return await axios.get(`${BASE_URL}/${sectionName}`, getAxiosConfig());
      }
    },
    update: async (sectionName, data, isMultipart = false) => {
      if (USE_MOCK) {
        const db = getMockDB();
        const current = db[sectionName] || {};
        const updated = { ...current };

        if (isMultipart) {
          const entries = Array.from(data.entries());
          for (const [key, val] of entries) {
            if (val instanceof File) {
              updated[`${key}Url`] = await readFileAsDataURL(val);
              updated[`${key}_public_id`] = `mock_pub_${Date.now()}`;
            } else {
              updated[key] = val;
            }
          }
        } else {
          Object.assign(updated, data);
        }

        db[sectionName] = updated;
        saveMockDB(db);
        return { data: { success: true, data: updated } };
      } else {
        const config = getAxiosConfig();
        if (isMultipart) {
          config.headers['Content-Type'] = 'multipart/form-data';
        }
        return await axios.put(`${BASE_URL}/${sectionName}`, data, config);
      }
    }
  }
};
