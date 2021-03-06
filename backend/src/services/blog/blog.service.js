// Initializes the `blog` service on path `/blog`
const createService = require('feathers-mongoose');
const createModel = require('../../models/blog.model');
const hooks = require('./blog.hooks');
const filters = require('./blog.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'article',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/articles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('articles');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
