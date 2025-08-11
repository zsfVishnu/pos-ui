import { MenuResponse } from '@/types/menu';

export async function getMenu(): Promise<MenuResponse> {
  // const response = await fetch('http://localhost:8080/menu');
  const response = await fetch('/api/menu');
  
  if (!response.ok) {
    throw new Error('Failed to fetch menu');
  }
  
  const data = await response.json();
  
  // Debug logging to see the actual API response structure
  console.log('API Response:', data);
  console.log('API Response structure:', JSON.stringify(data, null, 2));
  
  return data;
}
