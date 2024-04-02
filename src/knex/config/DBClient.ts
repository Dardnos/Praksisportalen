import Knex from 'knex';
import KnexConfig from "@/../knexfile";
import "server-only";

const evn = process.env.NODE_ENV || 'development';
const DBclient = Knex(KnexConfig[evn]);

export default DBclient;