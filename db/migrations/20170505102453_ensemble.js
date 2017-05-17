// always rollback the migrations before making edits to the schema

// knex migrate:latest
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', (t) => {
      t.increments()
      t.string('first')
      t.string('last')
      t.string('email').notNullable()
      t.string('password').notNullable()
      t.string('street')
      t.string('city')
      t.string('state')
      t.string('zip')
      t.string('instrument')
      t.string('picUrl')
    })
    .createTable('gigs', (t) => {
      t.increments()
      t.integer('owner_id').unsigned().references('users.id')
      t.string('name').notNullable()
      t.string('description').notNullable()
      t.integer('seatNum').notNullable()
      t.string('date').notNullable()
      t.string('status')
    })
    .createTable('seats', (t) => {
      t.increments()
      t.integer('user_id').unsigned().references('users.id')
      t.integer('gig_id').unsigned().references('gigs.id')
      t.string('instrument')
      t.string('status')
    })
}

// knex migrate:rollback
exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('seats')
    .dropTable('gigs')
    .dropTable('users')
}
