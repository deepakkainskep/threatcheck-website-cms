const API_BASE = import.meta.env.VITE_CMS_API_URL || 'http://localhost:5000';

const fetchApi = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE}/api/v1/public${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // CMS wraps response in { success: true, data: [...] }
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

export const apiService = {
  // Blogs
  getBlogs: () => fetchApi('/blogs'),
  getBlogBySlug: (slug) => fetchApi(`/blogs/${slug}`),

  // Case Studies
  getCaseStudies: () => fetchApi('/case-studies'),
  getCaseStudyBySlug: (slug) => fetchApi(`/case-studies/${slug}`),

  // Insights
  getInsights: () => fetchApi('/insights'),
  getInsightBySlug: (slug) => fetchApi(`/insights/${slug}`),

  // Resources
  getResources: () => fetchApi('/resources'),
  getResourceBySlug: (slug) => fetchApi(`/resources/${slug}`),

  // Frameworks
  getFrameworks: () => fetchApi('/frameworks'),

  // Integrations
  getIntegrations: () => fetchApi('/integrations'),
};
