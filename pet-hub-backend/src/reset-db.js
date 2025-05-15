const knex = require('knex')(require('./knexfile').development);

(async () => {
  try {
    await knex.migrate.rollback(null, true); // Revierte todo
    await knex.migrate.latest();             // Vuelve a crear todo
    console.log('🔄 Base de datos reiniciada correctamente');
  } catch (error) {
    console.error('❌ Error al reiniciar:', error);
  } finally {
    await knex.destroy();
  }
})();
