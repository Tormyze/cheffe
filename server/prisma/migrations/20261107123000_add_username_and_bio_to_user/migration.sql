ALTER TABLE "User" ADD COLUMN "username" TEXT;
ALTER TABLE "User" ADD COLUMN "bio" TEXT NOT NULL DEFAULT '';

DO $$
DECLARE
  existing_user RECORD;
  base_username TEXT;
  candidate_username TEXT;
  suffix INTEGER;
BEGIN
  FOR existing_user IN SELECT "id", "name" FROM "User" WHERE "username" IS NULL LOOP
    base_username := lower(regexp_replace(split_part(existing_user."name", ' ', 1), '[^a-z0-9_]', '', 'g'));
    base_username := left(base_username, 20);

    IF base_username = '' THEN
      base_username := 'user_' || left(replace(existing_user."id", '-', ''), 15);
    END IF;

    candidate_username := left(base_username, 20);
    suffix := 1;
    WHILE EXISTS (SELECT 1 FROM "User" WHERE "username" = candidate_username) LOOP
      candidate_username := left(base_username, 20 - length('_' || suffix::TEXT)) || '_' || suffix::TEXT;
      suffix := suffix + 1;
    END LOOP;

    UPDATE "User" SET "username" = candidate_username WHERE "id" = existing_user."id";
  END LOOP;
END $$;

ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
