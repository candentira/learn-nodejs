/*
CREATE TYPE permission_types AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_SHARE');

create table groups (
    id uuid PRIMARY KEY,
    name VARCHAR(255),
    permissions permission_types
);

create table user_group (
    id uuid PRIMARY KEY,
    user_id uuid,
    group_id uuid
);

-- CREATE TABLE IF NOT EXISTS "UserGroups" (
--   "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
--   "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
--   "UserId" INTEGER REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
--   "GroupId" INTEGER REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
--   PRIMARY KEY ("UserId","GroupId")
-- );

-- create table "UserGroups" (
--   "UserId" uuid REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
--   "GroupId" uuid REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
--   PRIMARY KEY ("UserId","GroupId")
-- );

-- DROP TABLE "UserGroups"

-- SELECT "UserId", "GroupId" FROM "UserGroups" AS "UserGroups" 
-- WHERE "UserGroups"."UserId" = 'f04b38c4-2c8f-498a-821a-e34fe82ee784' 
-- AND "UserGroups"."GroupId" IN ('4fe4fe4a-dd00-4c89-9ced-72981b183c99');
*/
