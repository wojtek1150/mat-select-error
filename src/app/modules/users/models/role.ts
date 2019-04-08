export interface Role {
  // @ts-ignore
  ['active']: boolean;

  [attributes: string]: string[]
}

export type Roles = {
  [rolename: string]: Role
}
