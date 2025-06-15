import vine from '@vinejs/vine'

export const PERMISSIONS = {
    // City
    'city:create': 'Create cities',
    'city:read': 'View cities',
    'city:update': 'Update cities',
    'city:delete': 'Delete cities',

    // Comment
    'comment:create': 'Create comments',
    'comment:read': 'View comments',
    'comment:update': 'Update comments',
    'comment:delete': 'Delete comments',

    // HistoryStatus
    'historyStatus:create': 'Create history statuses',
    'historyStatus:read': 'View history statuses',
    'historyStatus:update': 'Update history statuses',
    'historyStatus:delete': 'Delete history statuses',

    // Priority
    'priority:create': 'Create priorities',
    'priority:read': 'View priorities',
    'priority:update': 'Update priorities',
    'priority:delete': 'Delete priorities',

    // Project
    'project:create': 'Create projects',
    'project:read': 'View projects',
    'project:update': 'Update projects',
    'project:delete': 'Delete projects',

    // Role
    'role:create': 'Create roles',
    'role:read': 'View roles',
    'role:update': 'Update roles',
    'role:delete': 'Delete roles',

    // RoleUser (assigning/removing roles to users)
    'roleUser:create': 'Assign roles to users',
    'roleUser:read': 'View user roles',
    'roleUser:update': 'Update user roles',
    'roleUser:delete': 'Remove roles from users',

    // Status
    'status:create': 'Create statuses',
    'status:read': 'View statuses',
    'status:update': 'Update statuses',
    'status:delete': 'Delete statuses',

    // Task
    'task:create': 'Create tasks',
    'task:read': 'View tasks',
    'task:update': 'Update tasks',
    'task:delete': 'Delete tasks',

    // TypeDocument
    'typeDocument:create': 'Create document types',
    'typeDocument:read': 'View document types',
    'typeDocument:update': 'Update document types',
    'typeDocument:delete': 'Delete document types',

    // User
    'user:create': 'Create users',
    'user:read': 'View users',
    'user:update': 'Update users',
    'user:delete': 'Delete users',
}

export const permissionsSchema = vine.object(
    Object.keys(PERMISSIONS).reduce((acc, key) => {
        acc[key] = vine.boolean().optional()
        return acc
    }, {} as Record<string, any>)
)
