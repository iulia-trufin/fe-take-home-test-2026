import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

import { Listing } from "../types";
import { join } from "path";

type Data = Listing[];

export const devdb = () => {
  const db = new LowSync<Listing[]>(
    new JSONFileSync(join(process.cwd() + "/data/db.json")),
    [] as Data,
  );

  return db;
};
