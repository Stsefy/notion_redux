import { BASE_URL } from "../constants";

async function get(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
async function post(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}
async function put(url, body) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}
async function remove(url) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function getEntities(segment, query) {
  try {
    const params = new URLSearchParams(query).toString();
    const entities = await get(`${BASE_URL}/${segment}?${params}`);
    return entities;
  } catch (error) {
    console.log('Failed to fetch: ', error);
    return [];
  }
};
export async function getEntity(segment, query) {
  try {
    const params = new URLSearchParams(query).toString();
    const entities = await get(`${BASE_URL}/${segment}?${params}`);
    return entities[0];
  } catch (error) {
    console.log('Failed to fetch: ', error);
    return null;
  }
};
export async function postEntity(segment, body) {
  try {
    const entity = await post(`${BASE_URL}/${segment}`, body);
    return entity;
  } catch (error) {
    console.log('Failed to fetch: ', error);
    return null;
  }
};
export async function putEntity(segment, body, id) {
  try {
    const entity = await put(`${BASE_URL}/${segment}/${id}`, body);
    return entity;
  } catch (error) {
    console.log('Failed to fetch: ', error);
    return null;
  }
};
export async function deleteEntity(segment, id) {
  try {
    const entity = await remove(`${BASE_URL}/${segment}/${id}`);
    return entity;
  } catch (error) {
    console.log('Failed to fetch: ', error);
    return null;
  }
};