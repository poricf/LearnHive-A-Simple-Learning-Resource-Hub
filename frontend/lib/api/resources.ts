import { Resource, CreateResourceDTO, ResourceFilters } from '@/types/resource';

const API_URL = 'http://127.0.0.1:8000/api';

export const resourceApi = {
  // Get all resources with optional filters
  getResources: async (filters?: ResourceFilters): Promise<Resource[]> => {
    const queryParams = new URLSearchParams();
    if (filters?.category) queryParams.append('category', filters.category.toString());
    if (filters?.type) queryParams.append('type', filters.type.toString());

    const response = await fetch(`${API_URL}/resources?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }

    return response.json();
  },

  // Get a single resource by ID
  getResource: async (id: number): Promise<Resource> => {
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resource');
    }

    return response.json();
  },

  // Create a new resource
  createResource: async (data: CreateResourceDTO): Promise<Resource> => {
    const response = await fetch(`${API_URL}/resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create resource');
    }

    return response.json();
  },

  // Update an existing resource
  updateResource: async (id: number, data: Partial<CreateResourceDTO>): Promise<Resource> => {
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update resource');
    }

    return response.json();
  },

  // Delete a resource
  deleteResource: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete resource');
    }
  },
}; 