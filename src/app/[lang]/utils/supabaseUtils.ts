import supabase from './supabase';

// Get table names automatically from Supabase client type
type Database = typeof supabase extends {
  from: (table: infer T) => any;
}
  ? T
  : never;

// Now TableName will automatically include all tables from your database
export type TableName = Database;

export async function getItems(tableName: TableName) {
  const { data, error } = await supabase.from(tableName).select('id, title');

  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return null;
  }

  return data;
}

export async function getItemById(tableName: TableName, id: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .match({ id })
    .single();

  if (error) {
    console.error(`Error fetching ${tableName} with id ${id}:`, error);
    return null;
  }

  return data;
}

export async function getItemIds(tableName: TableName) {
  const { data, error } = await supabase.from(tableName).select('id');

  if (error) {
    console.error(`Error fetching ${tableName} ids:`, error);
    return null;
  }

  return data;
}
