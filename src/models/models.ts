export interface RolAttr {
  id?: number;
  name: string;
  description: string;
  department_id: number;
  createdAt?: string;
}

export interface RoleCreationAttr extends Omit<RolAttr, "id" | "createdAt"> {}

export interface OptionAttr {
  id?: string;
  name?: string;
  path?: string;
  icon?: string;
  parent_id?: string | null;
  createdAt?: string;
}
export interface OptionCreationAttr extends Omit<OptionAttr, "id" | "createdAt"> {}

export interface RolesUsers {
  user_id: number;
  role_id?: number;
  createdAt?: string;
}


export interface RolesOptions {
  role_id: number;
  option_id?: number;
  createdAt?: string;
}

export interface department {
  id?: number;
  code: number;
  name: number;
  createdAt?: string;
}