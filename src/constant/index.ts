// Usually GET from BE / DB

export interface PermissionProps {
  user: PermissionOptionsProps
  admin: PermissionOptionsProps
  superadmin: PermissionOptionsProps
}

export interface PermissionOptionsProps {
  User: PermissionDetailsProps
  Destination: PermissionDetailsProps
  Review: PermissionDetailsProps
}
interface PermissionDetailsProps {
  Create: boolean
  Read: boolean
  Update: boolean
  Delete: boolean
}

export const Permission: PermissionProps = {
  user: {
    User: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false
    },
    Destination: {
      Create: false,
      Read: true,
      Update: false,
      Delete: false
    },
    Review: {
      Create: true,
      Read: true,
      Update: true,
      Delete: false
    }
  },
  admin: {
    User: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false
    },
    Destination: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true
    },
    Review: {
      Create: true,
      Read: true,
      Update: true,
      Delete: false
    }
  },
  superadmin: {
    User: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true
    },
    Destination: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false
    },
    Review: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false
    }
  }
}

export const Roles: string[] = ['user', 'admin', 'superadmin']
