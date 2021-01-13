import knex  from 'knex';

const connect = knex({
  client: 'mysql',
  connection: {
    host            : 'localhost',
    user            : 'root',
    password        : 'Bf12345678',
    database        : 'bd_marist_inv'
  }
});

export default connect;
 