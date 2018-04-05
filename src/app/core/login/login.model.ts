
export class Token {
  access_token: string = '';
  userName: string = '';
  Name: string = '';
  expires_in: number = 0;
  User: User = new User();
}

export class User {
  Id: number = 0;

  AccountExpired: boolean = false;

  AccountLocked: boolean = false;

  AuthAttempts: number = 0;

  Password: string = '';

  PasswordExpired: boolean = false;

  RoleId: number = 0;

  UserName: string = '';

  UserTypeId: number = 0;

  PracticeName: string = '';

  PracticeId: number = 0;

  LinkedTableId: number = 0;

  VerificationToken: string = '';

  RoleName: string = '';

  FirstName: string = '';

  MiddleName: string = '';

  LastName: string = '';

  Email: string = '';

  IsActive: boolean = false;

  LabId: number = 0;

  Permissions: Array<RolePermission> = [];

  Roles: Array<number> = [];
}

export class Login {
  UserName: string = '';
  Password: string = '';
}

export class RolePermission {
  Id: number = 0;
  RoleId: number = 0;

  CanView: boolean = false;

  CanEdit: boolean = false;

  CanAdd: boolean = false;

  CanDelete: boolean = false;

  RowLevelAccess: string = '';

  ModuleCD: string = '';
}
