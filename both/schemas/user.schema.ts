/***
  USER SCHEMA
***/

// Simple Schema
import SimpleSchema from 'simpl-schema';

/* Profile Schema */
  const profileSchema = new SimpleSchema({
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    nickname: {
      type: String,
      unique: true,
      regEx: /^[a-zA-Z0-9_-]*$/
    },
    school: {
      type: String
    },
    email: {
      type: String
    },
    picture: {
      type: String
    }
  });

/* Role Schema */
  const roleSchema = new SimpleSchema({
    course_id : {
      type: String
    },
    course_record : {
      type: String
    }
  });

  const rolesSchema = new SimpleSchema({
    global_admin: {
      type: Boolean
    },
    administrator: {
      type: Array,
      defaultValue: []
    },
    'administrator.$' : {
      type: roleSchema
    },
    instructor: {
      type: Array,
      defaultValue: []
    },
    'instructor.$': {
      type: roleSchema,
    },
    student: {
      type: Array,
      defaultValue: []
    },
    'student.$': {
      type: roleSchema,
    },
  });

/* User Schema */
  export const UserSchema : SimpleSchema = new SimpleSchema({
    services: {
      type: Object,
      optional: true,
      blackbox: true
    },
    profile: {
      type: profileSchema
    },
    roles: {
      type: rolesSchema
    }
  });
