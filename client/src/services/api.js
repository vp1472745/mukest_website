import axios from 'axios';
import { initialMockData } from './mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mukest-website.onrender.com/api';
const USE_MOCK = import.meta.env.VITE_API_USE_MOCK === 'true';

// Helper to initialize local storage mock DB
const getMockDB = () => {
  const dbStr = localStorage.getItem('lenscraft_mock_db');
  if (!dbStr) {
    localStorage.setItem('lenscraft_mock_db', JSON.stringify(initialMockData));
    return initialMockData;
  }
  try {
    const db = JSON.parse(dbStr);
    const hasFilmCat = db.category && db.category.some(cat => cat.title === 'Film');
    if (!hasFilmCat && initialMockData.category.some(cat => cat.title === 'Film')) {
      const filmCat = initialMockData.category.find(cat => cat.title === 'Film');
      if (filmCat && db.category) {
        db.category.push(filmCat);
      }
      const filmItems = initialMockData.gallery.filter(item => item.category === 'Film');
      if (db.gallery) {
        filmItems.forEach(item => {
          if (!db.gallery.some(g => g._id === item._id)) {
            db.gallery.push(item);
          }
        });
      }
      localStorage.setItem('lenscraft_mock_db', JSON.stringify(db));
    }
    return db;
  } catch (e) {
    localStorage.setItem('lenscraft_mock_db', JSON.stringify(initialMockData));
    return initialMockData;
  }
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

// Mock file reader helper - uses URL.createObjectURL to bypass localStorage quota limits
const readFileAsDataURL = (file) => {
  try {
    return Promise.resolve(URL.createObjectURL(file));
  } catch (err) {
    return Promise.resolve('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800');
  }
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
        db[sectionName] = db[sectionName] || [];

        if (isMultipart) {
          const files = data.getAll('files').length > 0 ? data.getAll('files') : data.getAll('file');
          
          if (sectionName === 'gallery') {
            const newItem = { _id: `mock_gallery_${Date.now()}`, active: true, images: [] };
            for (const file of files) {
              const base64Url = await readFileAsDataURL(file);
              newItem.images.push({
                secure_url: base64Url,
                public_id: `mock_pub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
              });
            }
            if (newItem.images.length > 0) {
              newItem.imageUrl = newItem.images[0].secure_url;
              newItem.public_id = newItem.images[0].public_id;
            }
            
            // Assign other fields
            const entries = Array.from(data.entries());
            for (const [key, val] of entries) {
              if (!(val instanceof File)) {
                newItem[key] = val;
              }
            }
            
            if (newItem.displayOrder) newItem.displayOrder = Number(newItem.displayOrder);
            db[sectionName].push(newItem);
            saveMockDB(db);
            return { data: { success: true, data: newItem } };
          } else {
            // Bulk create for other sections if multiple files are uploaded
            const baseFields = { active: true };
            const entries = Array.from(data.entries());
            for (const [key, val] of entries) {
              if (!(val instanceof File)) {
                baseFields[key] = val;
              }
            }

            const createdItems = [];
            if (files.length > 0) {
              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const base64Url = await readFileAsDataURL(file);
                const newItem = {
                  ...baseFields,
                  _id: `mock_${sectionName}_${Date.now()}_${i}`,
                  public_id: `mock_pub_${Date.now()}_${i}`
                };
                newItem[sectionName === 'hero' || sectionName === 'process' ? 'mediaUrl' : 'imageUrl'] = base64Url;
                
                if (sectionName === 'hero') {
                  newItem.resourceType = file.type.startsWith('video/') ? 'video' : 'image';
                }
                
                // Adjust order numbers
                if (newItem.sliderOrder) newItem.sliderOrder = Number(newItem.sliderOrder) + i;
                if (newItem.displayOrder) newItem.displayOrder = Number(newItem.displayOrder) + i;
                if (newItem.stepNumber) newItem.stepNumber = Number(newItem.stepNumber) + i;

                db[sectionName].push(newItem);
                createdItems.push(newItem);
              }
              saveMockDB(db);
              return { data: { success: true, data: createdItems.length === 1 ? createdItems[0] : createdItems } };
            } else {
              // No files, just create with base fields
              const newItem = {
                ...baseFields,
                _id: `mock_${sectionName}_${Date.now()}`
              };
              db[sectionName].push(newItem);
              saveMockDB(db);
              return { data: { success: true, data: newItem } };
            }
          }
        } else {
          const newItem = { _id: `mock_${sectionName}_${Date.now()}`, active: true };
          Object.assign(newItem, data);
          if (newItem.sliderOrder) newItem.sliderOrder = Number(newItem.sliderOrder);
          if (newItem.displayOrder) newItem.displayOrder = Number(newItem.displayOrder);
          if (newItem.stepNumber) newItem.stepNumber = Number(newItem.stepNumber);
          db[sectionName].push(newItem);
          saveMockDB(db);
          return { data: { success: true, data: newItem } };
        }
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
          const files = data.getAll('files').length > 0 ? data.getAll('files') : data.getAll('file');
          
          if (sectionName === 'gallery') {
            if (files.length > 0) {
              const newImages = [];
              for (const file of files) {
                const base64Url = await readFileAsDataURL(file);
                newImages.push({
                  secure_url: base64Url,
                  public_id: `mock_pub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
                });
              }
              updatedItem.images = newImages;
              updatedItem.imageUrl = newImages[0].secure_url;
              updatedItem.public_id = newImages[0].public_id;
            }
            
            // Assign other fields
            const entries = Array.from(data.entries());
            for (const [key, val] of entries) {
              if (!(val instanceof File)) {
                updatedItem[key] = val;
              }
            }
          } else {
            if (files.length > 0) {
              const base64Url = await readFileAsDataURL(files[0]);
              updatedItem[sectionName === 'hero' || sectionName === 'process' ? 'mediaUrl' : 'imageUrl'] = base64Url;
              updatedItem.public_id = `mock_pub_${Date.now()}`;
              if (sectionName === 'hero') {
                updatedItem.resourceType = files[0].type.startsWith('video/') ? 'video' : 'image';
              }
            }
            
            // Assign other fields
            const entries = Array.from(data.entries());
            for (const [key, val] of entries) {
              if (!(val instanceof File)) {
                updatedItem[key] = val;
              }
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
  },
  db: {
    seed: async () => {
      if (USE_MOCK) {
        saveMockDB(initialMockData);
        return { data: { success: true, message: 'Mock database reset successfully' } };
      } else {
        return await axios.post(`${BASE_URL}/seed`, {}, getAxiosConfig());
      }
    }
  }
};
