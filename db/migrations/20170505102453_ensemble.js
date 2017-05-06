// always rollback the migrations before making edits to the schema

// knex migrate:latest
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', (t) => {
      t.increments()
      t.string('first').notNullable()
      t.string('last').notNullable()
      t.string('email').notNullable()
      t.string('street').notNullable()
      t.string('city').notNullable()
      t.string('state').notNullable()
      t.string('zip').notNullable()
      t.string('instrument').notNullable()
    })
    .createTable('gigs', (t) => {
      t.increments()
      t.integer('owner_id').unsigned().references('users.id')
      t.string('name').notNullable()
      t.string('description').notNullable()
      t.integer('seatNum').notNullable()
      t.integer('date').notNullable()
      t.string('status')
    })
    .createTable('seats', (t) => {
      t.increments()
      t.integer('user_id').unsigned().references('users.id')
      t.integer('gig_id').unsigned().references('gigs.id')
      t.string('instrument').notNullable()
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
