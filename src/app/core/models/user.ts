export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  roles: any;

  constructor({ id = '', firstName = '', lastName = '', email = '', avatar = '', roles = {} } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.roles = roles;
  }

  get activeRoles(): string[] {
    return Object.keys(this.roles).filter(id => this.roles[id].active);
  }
}
